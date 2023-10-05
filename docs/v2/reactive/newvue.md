# new Vue()发生了什么

## Vue构造函数

引入Vue后打印一下,发现Vue函数长这样

```js
ƒ Vue(options) {
      if (!(this instanceof Vue)) {
          warn$2('Vue is a constructor and should be called with the `new` keyword');
      }
      this._init(options);
  }
```

这里只有两步操作：

1. 判断你有没有使用`new`关键字调用，如果你直接调用Vue函数，他会报错说： “这是一个构造函数，请使用new关键字”。
2. 调用实例身上的 `_init` 方法，传入配置对象。

配置对象就是我们new Vue的时候传入的那个对象，比如:

```js
new Vue({
    el:"#app",
    render: h => h(App),
})
```

### new Vue之前

Vue函数中，` this._init(options)`中的**_init**从哪里来？

在chome里面调试源代码，找到这样的一个函数：

```js
 function initMixin$1(Vue) {
      Vue.prototype._init = function (options) {
          var vm = this;
			
         // 省略多行代码
          
      }
  }
```

原来，它是被一个叫`initMixin$1`的函数加在Vue原型上面的，那么这个`initMixin$1`必然是在new Vue() 之前执行的，可是我们明明没有调用它啊？

只有一种可能，他是在**引入Vue**的时候就执行了，果然，在源码中发现了这些代码：

```js
  //@ts-expect-error Vue has function type
  initMixin$1(Vue);
  //@ts-expect-error Vue has function type
  stateMixin(Vue);
  //@ts-expect-error Vue has function type
  eventsMixin(Vue);
  //@ts-expect-error Vue has function type
  lifecycleMixin(Vue);
  //@ts-expect-error Vue has function type
  renderMixin(Vue);
```

不仅如此，在引入Vue的时候还执行了很多代码，比如：

```js
Vue.set = set;
Vue.delete = del;
Vue.nextTick = nextTick;

Vue.prototype.$off = function (event, fn){ xxx }
Vue.prototype.$emit = function (event) { xxx }
Vue.prototype.$set = set;
Vue.prototype.$delete = del;
Vue.prototype.$watch = function(expOrFn, cb, options){ xxx }
Vue.prototype.$nextTick = function (fn){ xxx }

```

这些方法有些是直接添加在Vue上面，有的则是添加在Vue原型上面以便给组件实例使用。

::: warning

所以，**为什么Vue可以调用nextTick、component等方法，为什么组件可以通过this调用$emit、$nextTick、**

**$set方法？**

因为在new Vue之前，源码里面就已经把这些方法加到Vue的自己身上或者显式原型上了

:::

## _init初始化函数

在打断点执行执行 _init 的函数的时候，发现了这些代码：

![newVue](/images/newvue-init.png)

可以看到，**Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，调用beforeCreate钩子，初始化 data、props、computed、watcher ，调用create钩子。**

接下来逐个解读：

### 1. $options

```js
vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
```

代码其实很简单，就是把 vm 配置项全部加到 vm的 $options 上面，然后又把，把自己也添加到$options.vm上面，也就是**合并配置**。

### 2. initLifecycle

初始化生命周期方法主要做的事情是关联父子组件，给 vm 添加一些像`$parent`、`$children `,`$refs`之类的属性，和生命周期钩子无关。

### 3. initEvents

```js
export function initEvents (vm) {
  // 创建了一个保存事件的对象
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // 初始化父附加事件
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```

初始化事件先定义了两个变量，然后判断是否存在父组件的附加事件，这个具体是做什么的暂时还不知道，后面再看。

### 4. initRender

```js
export function initRender (vm) {
  vm._vnode = null // 子树的根节点
  vm._staticTrees = null // v-once 缓存树
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // 父树中的占位符节点
  const renderContext = parentVnode && parentVnode.context
  // 处理slot
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // 给当前实例绑定一个createElement方法
  // 这样我们就可以在其中获得适当的渲染上下文。
  // 参数列表: tag, data, children, normalizationType, alwaysNormalize
  // 内部版本由从模板编译的渲染函数使用
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // 公开版本，用于用户编写渲染函数时使用
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

   // $attrs 和 $listeners 用于更方便的创建高阶组件 HOC
  // 它们需要是响应性的，这样使用它们的HOC才会始终得到更新
  const parentData = parentVnode && parentVnode.data
  defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
  defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
}

```

初始化渲染方法也是先定义了几个变量，然后处理了一下插槽，接着定义了两个变量用于引用创建虚拟`dom`节点的`createElement`方法，最后，给实例添加了两个响应性的属性`$attrs`、`$listeners`，`defineReactive`方法的实现我们放到下一篇去看。

### 5. 触发beforeCreate

`callHook(vm, 'beforeCreate')`这一段代码触发了beforeCreate函数，没什么好看的。注意在执行钩子函数里面的代码之前，他会先阻止收集依赖。

### 6. 初始化依赖注入

```js
export function initProvide (vm) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}

```

很简单，给`vue`实例添加了一个`_provided`属性，用来存放`provide`对象。

### 7. 初始化状态

`initState`里面就包含着`vue`的核心，数据观察：

```js
export function initState(vm) {
  vm._watchers = []// 声明了一个存放watcher的数组
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */ )
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}

```

一眼就能看出，这里处理了`props`、`methods`、`data`、`computed`、`watch`，一个一个来看：

### 初始化props

```js
function initProps(vm, propsOptions) {
  // propsData：创建实例时传递 props。主要作用是方便测试，只用于 new 创建的实例中
  const propsData = vm.$options.propsData || {}
  // 存储props
  const props = vm._props = {}
  // 缓存prop的key，这样在后面更新prop时可以通过遍历数组，而不是枚举动态对象的属性
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // 根实例的props需要被观察
  if (!isRoot) {
    toggleObserving(false)
  }
  // 遍历所有prop
  for (const key in propsOptions) {
    keys.push(key)
    // 校验props，返回其默认值
    const value = validateProp(key, propsOptions, propsData, vm)
    defineReactive(props, key, value)
    // 在Vue.extend（）期间，静态prop已在组件的原型上代理。我们只需要在这里代理实例化时定义的prop
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}

```

这里的重点是 `proxy(vm, `_props`, key)`
> 点击跳转：[proxy](/v2/reactive/proxy)

### 初始化methods

```js
function initMethods(vm, methods) {
  for (const key in methods) {
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
```

`initMethods`方法很简单，遍历所有`methods`,先判断是否是函数，是的话先绑定一下它的`this`到实例上面，然后也是给它添加为到vm的某个属性。

这里和props不同的是，props是因为代理才导致我们可以直接通过this.xxx拿到，而methods则是直接添加到vm上的属性。

### 初始化data
这一段比较长，且涉及到响应式数据的原理
> 点击跳转：[initData](/v2/reactive/initData)

### 初始化计算属性

```js
function initComputed(vm, computed) {
  // 保存用于计算属性的watcher
  const watchers = vm._computedWatchers = Object.create(null)

  for (const key in computed) {
    // 计算属性支持两种写法：普通函数、对象形式：{ get: Function, set: Function }
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get

    // 创建一个内部的 watcher 
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      {
        lazy: true
      }
    )

    // 组件定义的计算属性已在组件原型上定义。我们只需要在这里定义实例化时定义的计算属性。
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}

```

以看到为每个计算属性都创建了一个`watcher`实例，`watcher`的作用我们后续再说，然后调用了`defineComputed`方法

xxx

### 初始化watch

```js
function initWatch(vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

```

把用户定义的所有监视属性，传入**createWatcher**方法，然后创建watcher实例

xxx

### 8. 挂载

最后，如果提供了`el`选项，那么会进行挂载：

```js
if (vm.$options.el) {
    vm.$mount(vm.$options.el)
}
```

挂载的内容

xxx