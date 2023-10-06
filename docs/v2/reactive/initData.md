# initData
## initData()方法
Vue初始化会调用initData()方法:

```js
function initData (vm: Component) {
  let data = vm.$options.data // 用户传入的数据
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */) ----------------数据观测
}
```
> 注意，initData是在initState里面被调用的,同时被调用的还有：initProps、initMethods、initComputed、initWatch

这个函数大概做了这么几件事情：
1. 判断data是函数还是对象，进行不同的操作，如果是函数，就调用这个函数并把this指向vm,最后拿到data，放到vm._data上面
2. 判断vm上面是不是已经有同名的methods或者props了，如果有就警告名字已经被占用了
3. 没有同名的话，就调用 **proxy** 在vm上面添加所有data数据，并代理到 `_data`上面
> 点击跳转：[proxy](/v2/reactive/proxy)
4. 也就是说当我们访问 `this.xxx` 来得到data时，实际访问到的是 `this._data.xxx` 
5. 最后，调用`observe`对data进行数据劫持

## observe
```js
  function observe(value, shallow, ssrMockReactivity) {
      if (value && hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
          return value.__ob__;
      }
      if (shouldObserve &&
          (ssrMockReactivity || !isServerRendering()) &&
          (isArray(value) || isPlainObject(value)) &&
          Object.isExtensible(value) &&
          !value.__v_skip /* ReactiveFlags.SKIP */ &&
          !isRef(value) &&
          !(value instanceof VNode)) {
          return new Observer(value, shallow, ssrMockReactivity);
      }
  }
```
* 这里其实是做了一些判断，最终去new Observer,去看看Observer是什么：

```js
 var Observer = /** @class */ (function () {
      function Observer(value, shallow, mock) {
          if (shallow === void 0) { shallow = false; }
          if (mock === void 0) { mock = false; }
          this.value = value;
          this.shallow = shallow;
          this.mock = mock;
          // this.value = value
          this.dep = mock ? mockDep : new Dep();
          this.vmCount = 0;
          def(value, '__ob__', this);
          if (isArray(value)) {
              if (!mock) {
                  if (hasProto) {
                      value.__proto__ = arrayMethods;
                      /* eslint-enable no-proto */
                  }
                  else {
                      for (var i = 0, l = arrayKeys.length; i < l; i++) {
                          var key = arrayKeys[i];
                          def(value, key, arrayMethods[key]);
                      }
                  }
              }
              if (!shallow) {
                  this.observeArray(value);
              }
          }
          else {
              /**
               * Walk through all properties and convert them into
               * getter/setters. This method should only be called when
               * value type is Object.
               */
              var keys = Object.keys(value);
              for (var i = 0; i < keys.length; i++) {
                  var key = keys[i];
                  defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock);
              }
          }
      }
      /**
       * Observe a list of Array items.
       */
      Observer.prototype.observeArray = function (value) {
          for (var i = 0, l = value.length; i < l; i++) {
              observe(value[i], false, this.mock);
          }
      };
      return Observer;
  }());
```
* 这个Observer是一个立即执行函数，里面返回的Observer才是真正的Observer

看一下调用堆栈，防晕：

![调用堆栈](/images/initData-stack.png)

这个 Observer 会通过 isArray 判断 data 是数组还是对象：

### 1.是对象
如果data是对象，会for循环遍历data所有key，然后每次遍历都会调用`defineReactive`方法， 他会循环对象定义响应式变化。
> 点击跳转：[defineReactive](/v2/reactive/defineReactive)

### 2.是数组
在vue2的源码里面，很早就重写（或者说拦截）了数组的7个方法

```js
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = original.apply(this, args);
        var ob = this.__ob__;
        var inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted)
            ob.observeArray(inserted);
        // notify change
        if (process.env.NODE_ENV !== 'production') {
            ob.dep.notify({
                type: "array mutation" /* TriggerOpTypes.ARRAY_MUTATION */,
                target: this,
                key: method
            });
        }
        else {
            ob.dep.notify();
        }
        return result;
    });
});
```

步骤如下：
1. 定义一个变量 arrayProto，存放 Array 的原型
2. 定义一个变量 arrayMethods，通过 Object.create方法，继承 arrayProto
3. 当我们读取arrayMethods上面的那7个方法时，会被劫持，劫持后它就做了3件事情：
   1. 仍然调用原来的数组方法
   2. `dep.depend()`方法做依赖收集
   3. `dep.notify()`方法派发更新

所以：**如果`isArray`判断出来 data 是数组**，他不会去递归劫持数组的元素，因为特别耗费性能，而是把`arrayMethods` 添加到数组的 `__proto__` 上面，这样使用这些方法时，会收集依赖和派发更新;

也就是：

**对数组，她不会劫持每一个元素，只是劫持数组的7个可变方法（函数劫持）。**


![initData](/images/initData.png)