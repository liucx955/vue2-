# Dep、Watcher、Observer
Observer、Dep、Watcher三个构造函数的关联
* Observer类 负责数据劫持，访问数据时，调用dep.depend()进行依赖收集；数据变更时，调用dep.notify() 通知观察者更新视图。我们的数据就是被观察者
* Dep类 负责收集观察者 watcher，以及通知观察者 watcher 进行 update 更新操作, 每个dep实例和data中的属性是一一对应的。
* Watcher类 为观察者，负责订阅 dep，并在订阅时让 dep 同步收集当前 watcher。当接收到 dep 的通知时，执行 update 重新渲染视图

![01](/images/relative01.webp)

dep 和 watcher 是一个多对多的关系。每个组件都对应一个渲染 watcher，每个响应式属性都有一个 dep 收集器。一个组件可以包含多个属性（一个 watcher 对应多个 dep），一个属性可以被多个组件使用（一个 dep 对应多个 watcher）

![02](/images/relative02.webp)

## Dep
我们需要给每个属性都增加一个 dep 收集器，目的就是收集 watcher。当响应式数据发生变化时，更新收集的所有 watcher
1. 定义 subs 数组，当劫持到数据访问时，执行 dep.depend()，通知 watcher 订阅 dep，然后在 watcher内部执行dep.addSub()，通知 dep 收集 watcher
2. 当劫持到数据变更时，执行dep.notify() ，通知所有的观察者 watcher 进行 update 更新操作

> Dep有一个静态属性 target，全局唯一，Dep.target 是当前正在执行的 watcher 实例，这是一个非常巧妙的设计！因为在同一时间只能有一个全局的 watcher

注意：渲染/更新完毕后我们会立即清空 Dep.target，保证了只有在模版渲染/更新阶段的取值操作 才会进行依赖收集。之后我们手动进行数据访问时，不会触发依赖收集，因为此时 Dep.target 已经重置为 null
```js
var Dep = /** @class */ (function () {
    function Dep() {
     ...
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
   
    Dep.prototype.depend = function (info) {
        if (Dep.target) {
            Dep.target.addDep(this);
            if (process.env.NODE_ENV !== 'production' && info && Dep.target.onTrack) {
                Dep.target.onTrack(__assign({ effect: Dep.target }, info));
            }
        }
    };
    Dep.prototype.notify = function (info) {
        var subs = this.subs.filter(function (s) { return s; });
        if (process.env.NODE_ENV !== 'production' && !config.async) {
            subs.sort(function (a, b) { return a.id - b.id; });
        }
        for (var i = 0, l = subs.length; i < l; i++) {
            var sub = subs[i];
            if (process.env.NODE_ENV !== 'production' && info) {
                sub.onTrigger &&
                    sub.onTrigger(__assign({ effect: subs[i] }, info));
            }
            sub.update();
        }
    };
    return Dep;
}());

```
## Watcher
* 不同组件有不同的 watcher。每个组件除了只有一个 renderWatcher 外，其他watcher可以有多个。
* watcher 负责订阅 dep ，并在订阅的同时执行dep.addSub()，让 dep 也收集 watcher。
* 当接收到 dep 发布的消息时（通过 dep.notify()），通知所有的观察者 watcher 进行 update 更新操作
* update 会判断 watcher 的类型
  * lazy属性为true的，是computedWatcher
  * user属性为true的，是userWatcher
  * 其他的，都是renderWatcher

```js
// 初始化元素
export function mountComponent(vm, el) {
  vm.$el = el

  const updateComponent = () => {
    vm._update(vm._render())
  }

  // true用于标识是一个渲染watcher
  const watcher = new Watcher(vm, updateComponent, true)
}
```
当我们实例化渲染 watcher 的时候，在构造函数中会把回调赋给this.getter，并调用this.get()方法。
这时！！！我们会把当前的渲染 watcher 放到 Dep.target 上，并在执行完回调渲染视图后，立即清空 Dep.target，保证了只有在模版渲染/更新阶段的取值操作才会进行依赖收集
```js
var Watcher =  (function () {
    function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
        ...
        if (options) {
            this.deep = !!options.deep;
            this.user = !!options.user;
            this.lazy = !!options.lazy;
            this.sync = !!options.sync;
            this.before = options.before;
            if (process.env.NODE_ENV !== 'production') {
                this.onTrack = options.onTrack;
                this.onTrigger = options.onTrigger;
            }
        }
        else {
            this.deep = this.user = this.lazy = this.sync = false;
        }
    }
        ...
    Watcher.prototype.get = function () {
        pushTarget(this);
        var value;
        var vm = this.vm;
        value = this.getter.call(vm, vm);
        return value;
    };
    Watcher.prototype.addDep = function (dep) {
        var id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    };
 
    Watcher.prototype.update = function () {
        /* istanbul ignore else */
        if (this.lazy) {
            this.dirty = true;
        }
        else if (this.sync) {
            this.run();
        }
        else {
            queueWatcher(this);
        }
    };

    Watcher.prototype.depend = function () {
        var i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    };
    ...
    return Watcher;
}());
```

我们是如何触发依赖收集的呢？

在执行this.getter()回调时，我们会调用vm._render() ，在_s()方法中会去 vm 上取值，这时我们劫持到数据访问走到 getter，进而执行dep.depend()进行依赖收集

## Observer
我们只会在 Observer 类 和 defineReactive 函数中实例化 dep。在 getter 方法中执行dep.depend()依赖收集，在 setter 方法中执行dep.notity()派发更新通知


