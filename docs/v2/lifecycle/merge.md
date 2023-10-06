# 生命周期
## 表现
复习下这张图：
![生命周期](/images/lifecycle.png)

## 原理
为什么vue能实现这些生命周期的功能呢？

其原理很简单，在**特定的时候调用特定的钩子函数**就行了，调用钩子函数用的是这个`callHook`方法

```js
function callHook(vm, hook, args, setContext) {
    if (setContext === void 0) { setContext = true; }
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var prev = currentInstance;
    setContext && setCurrentInstance(vm);
    var handlers = vm.$options[hook];
    var info = "".concat(hook, " hook");
    if (handlers) {
        for (var i = 0, j = handlers.length; i < j; i++) {
            invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
        }
    }
    if (vm._hasHookEvent) {
        vm.$emit('hook:' + hook);
    }
    setContext && setCurrentInstance(prev);
    popTarget();
}
```

它的逻辑很简单，功能就是调用某个生命周期钩子注册的所有回调函数，并把 this 指定为 vm。

## 执行时机
### beforeCreate & created
beforeCreate 和 created 函数都是在实例化 Vue 的阶段，在 _init 方法中执行的
```js
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')
  // ...
}
```
* 可以看到`callHook(vm, 'beforeCreate')`是发生在`initState`之前的，initState 的作用是初始化 props、data、methods、watch、computed 等属性，之后我们会详细分析。那么显然 beforeCreate 的钩子函数中就不能获取到 props、data 中定义的值，也不能调用 methods 中定义的函数。

> 点击跳转[initState](/v2/reactive/newvue.html#_7-initstate)

* `callHook(vm, 'created')`发生在`initState`之后，这时就可以访问 props、data 等数据了
* 般来说，如果组件在加载的时候需要和后端有交互，放在这俩个钩子函数执行都可以，如果是需要访问 props、data 等数据的话，就需要使用 created 钩子函数。
* 在这俩个钩子函数执行的时候，并没有渲染 DOM，所以我们也不能够访问 DOM

### beforeMount & mounted

```js
// mountComponent 核心就是先实例化一个渲染Watcher
// 在它的回调函数中会调用 updateComponent 方法
// 两个核心方法 vm._render(生成虚拟Dom) 和 vm._update(映射到真实Dom)
export function mountComponent (vm, el, hydrating) {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    ...
  }
  callHook(vm, 'beforeMount')  // 调用 beforeMount 钩子

  let updateComponent
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
    // 将虚拟 Dom 映射到真实 Dom 的函数。
    // vm._update 之前会先调用 vm._render() 函数渲染 VNode
      ...
      const vnode = vm._render()
      ...
      vm._update(vnode, hydrating)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  new Watcher(vm, updateComponent, noop, {
    before () {
     // 先判断是否 mouted 完成 并且没有被 destroyed
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)

  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')  //调用 mounted 钩子
  }
  return vm
}

```
通过上面的代码，我们可以看出在执行vm._render()函数渲染VNode之前，执行了 beforeMount钩子函数，在执行完 vm._update()把VNode patch到真实Dom后，执行 mouted钩子。也就明白了为什么直到mounted阶段才名正言顺的拿到了Dom。

### beforeUpdate和updated
```js
 new Watcher(vm, updateComponent, noop, {
    before () {
     // 先判断是否 mouted 完成 并且没有被 destroyed
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')  // 调用 beforeUpdate 钩子
      }
    }
  }, true /* isRenderWatcher */)
 
 // src/core/observer/scheduler 
 function callUpdatedHooks (queue) {
   let i = queue.length
   while (i--) {
     const watcher = queue[i]
     const vm = watcher.vm
     if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
       // 只有满足当前 watcher 为 vm._watcher（也就是当前的渲染watcher）
       // 以及组件已经 mounted 并且没有被 destroyed 才会执行 updated 钩子函数。
       callHook(vm, 'updated')  // 调用 updated 钩子
       }
     }
   }

```
在new Watcher之前，就调用 beforeUpdate 钩子，watcher 执行完之后，调用 updated 钩子

> Vue是通过watcher来监听实例上的数据变化，进而控制渲染流程
> 
> 点击跳转：[3个watcher](/v2/reactive/watchers.html)

### beforeDestroy和destroyed
```js
 // 在 $destroy 的执行过程中，它会执行 vm.__patch__(vm._vnode, null)
  // 触发它子组件的销毁钩子函数，这样一层层的递归调用，
  // 所以 destroy 钩子函数执行顺序是先子后父，和 mounted 过程一样。
  Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')  // 调用 beforeDestroy 钩子
    vm._isBeingDestroyed = true
    // 一些销毁工作
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // 拆卸 watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    ...
    vm._isDestroyed = true
    // 调用当前 rendered tree 上的 destroy 钩子
    // 发现子组件，会先去销毁子组件
    vm.__patch__(vm._vnode, null)
    callHook(vm, 'destroyed')  // 调用 destroyed 钩子
    // 关闭所有实例侦听器。
    vm.$off()
    // 删除 __vue__ 引用
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // 释放循环引用
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }

```

通过 $destroy 触发组件的销毁，通过 vm.__patch__ 层层递归调用，从子向父销毁，和 mounted 一样

