# nextTick
Vue的DOM更新是异步的，异步更新的原因是为了性能优化，等待数据全部修改完后，集中一批更新DOM，再一次性地渲染。

Vue的nextTick方法设计的本意是为了解决DOM异步更新问题，提供一种机制让开发者可以在DOM更新完成后立即获取最新的DOM状态，并且可以用于满足实际应用中对DOM更新数据时机的后续逻辑处理。

Vue本身不推荐用户去操作DOM，

我们通常在修改数据之后，调用`this.$nextTick`去拿到页面的最新DOM，不然就会获取到旧的 DOM，这是什么原因呢？

## 场景分析
在vue中，我使用了一个数据
```html
 <div>{{count}}</div>
 <button @click="handleClick">click</button>

<script>
    data () {
        return {
            count: 0
        };
    },
    methods: {
        handleClick () {
            for(let i = 0; i < 10000; i++) {
                this.count++;
            }
        }
    }
</script>
```
如果我点击 button 按钮，count 会修改 10000 次，那么，页面上的DOM是不是也会修改10000次呢？

并不会。vue内部对其进行了优化，并不是数据改变就直接触发 watcher 的回调

## nextTick原理
简单概述一下：
* vue 实现响应式并不是数据发生变化后 DOM 立即变化，而是按照一定策略异步执行 DOM 更新的
* vue 在修改数据后，视图不会立刻进行更新，而是要等同一事件循环机制内所有数据变化完成后，再统一进行DOM更新
* nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。

详细分析：
vue全局有三个属性 flushing、waiting和pending ，flushing表示页面还在刷新，不能往队列加 watcher，waiting 表示现在不能执行 nextTick，pending 表示异步任务正在进行中，默认都是false

1. 只要一修改页面上的依赖数据，就会引发nextTick执行，跟修改的是哪个数据无关。
2. 因为我们修改了数据，会触发属性上的setter，setter里面会执行 dep.notify()
3. dep.notify() 会遍历通知它所有的 watcher 执行自己的update方法
4. update 判断这个 watcher 是3中watcher中的哪一种，具体代码跳转：[Watcher](/v2/reactive/relative.html#watcher)
5. 如果发现自己是 renderWatcher 或者 userWatcher ，并且 flushing为false ，会调用 queueWatcher，把自己添加到一个队列 queue 里
```js
function queueWatcher(watcher) {
    var id = watcher.id;
    if (has[id] != null) {
        return;
    }
    if (watcher === Dep.target && watcher.noRecurse) {
        return;
    }
    has[id] = true;
    if (!flushing) {
        queue.push(watcher);
    }
    else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i > index && queue[i].id > watcher.id) {
            i--;
        }
        queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
        waiting = true;
        if (process.env.NODE_ENV !== 'production' && !config.async) {
            flushSchedulerQueue();
            return;
        }
        nextTick(flushSchedulerQueue);
    }
}
```
6. 由于此时 waiting 是false，可以调用 nextTick，并把 waiting 设置为true，防止多次调用 nextTick
7. nextTick 里面传入了 flushSchedulerQueue
8. flushSchedulerQueue 作用是遍历执行所有 queue 里面的 watcher ，在它执行期间，会设置flushing = true，这时不能再添加watcher
```js
function flushSchedulerQueue() {
    flushing = true;
    ...
    for (index = 0; index < queue.length; index++) {
        watcher = queue[index];
        ...
        watcher.run();
    }
    ...
}
```
9. queue 才加了一个watcher，你就遍历执行，那不是白费功夫吗，关键在 nextTick
```js
function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
        if (cb) {
           cb.call(ctx);
        }
    });
    if (!pending) {
        pending = true;
        timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        });
    }
}
```
10. nextTick 又用到了一个队列 callbacks，他会把 接收到的回调函数 cb 推到 callbacks里面
11. 这个 cb 除了刚刚 flushSchedulerQueue 之外，还会接收到另外一种回调，那就是我们通过 this.$nextTick，传入的回调
12. nextTick 执行的时候，会调用timerFunc，timerFunc会启动一个异步任务。这个异步任务的功能，就是遍历执行 callbacks 里面所有的回调。
    1. 这个异步任务默认使用Promise
    2. 没有Promise就使用setImmediate
    3. setImmediate再没有，就只能使用 setTimeout 了

注意：DOM更新是同步的，DOM渲染才是异步的，但因为 watcher 被加入到 callbacks 里面成为了微队列，导致DOM更新成了微任务，进而导致我们的同步代码拿不到最新 DOM 。所以，我们才需要调用 $nextTick，让我们的回调在更新DOM的 watcher 后面，这样就可以拿到新的DOM；
