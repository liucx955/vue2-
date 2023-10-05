# defineReactive
* defineReactive 函数，它是一个非常重要的函数，它的作用是在一个对象上定义一个响应式的属性

```js
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 实例化 Dep 对象，主要存储对该属性的依赖，Dep 类后面详细研究
  const dep = new Dep() 

  // 获取对象的指定键的属性描述符
  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return // 获取原描述信息，如果不可以修改配置则退出
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get // 获取原有 getter 方法
  const setter = property && property.set // 获取原有 setter 方法
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key] // 尚未定义 getter 方法则通过 obj[key] 获取属性的值
  }
  
  // 对属性的 值 进行响应式观察处理，这个 observe 用来递归
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 获取属性的值
      const value = getter ? getter.call(obj) : val
      // --------------------------------
      if (Dep.target) {                //
        dep.depend()                   //
        if (childOb) {                 //
          childOb.dep.depend()         // 依赖收集
          if (Array.isArray(value)) {  //
            dependArray(value)         //
          }                            //
        }                              //
      }                                //
      // --------------------------------
      return value
    },
    set: function reactiveSetter (newVal) {
        // 获取原有属性值
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return // 新旧值相同则退出
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return // 只读不可写 则退出
      // 设置新值
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      // 对属性的 新值 进行响应式观察处理
      childOb = !shallow && observe(newVal)
      dep.notify()            // 更新属性，通知 依赖者
    }
  })
}

```

1. defineReactive先创建了一个Dep实例
2. 递归调用`observe`进行深度劫持（即重复`observe -> new Observer -> defineReactive`这几步
3. 然后给`data`数据添加`getter`和`setter`对数据进行劫持
4. `getter`里面使用 `dep.depend()` 方法做依赖收集
5. `setter`里面先判断数据有没有变化，没有变化直接return退出，否则使用 `dep.notify()`方法通知依赖者更新数据

## Dep
```js
var Dep = /** @class */ (function () {
    function Dep() {
        // pending subs cleanup
        this._pending = false;
        this.id = uid$2++;
        this.subs = [];
    }
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.removeSub = function (sub) {
        // #12696 deps with massive amount of subscribers are extremely slow to
        // clean up in Chromium
        // to workaround this, we unset the sub for now, and clear them on
        // next scheduler flush.
        this.subs[this.subs.indexOf(sub)] = null;
        if (!this._pending) {
            this._pending = true;
            pendingCleanupDeps.push(this);
        }
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
        // stabilize the subscriber list first
        var subs = this.subs.filter(function (s) { return s; });
        if (process.env.NODE_ENV !== 'production' && !config.async) {
            // subs aren't sorted in scheduler if not running async
            // we need to sort them now to make sure they fire in correct
            // order
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
