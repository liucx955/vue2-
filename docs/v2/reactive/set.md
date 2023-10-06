# $set
**为什么this.$set可以添加响应式数据?**

在源码中，给Vue原型添加了$set，这就是我们可以调用`this.$set`拿到的原因:
```js
Vue.prototype.$set = set;
```
这个set又是什么呢
```js
function set(target, key, val) {
   ...
    if (isReadonly(target)) {
        process.env.NODE_ENV !== 'production' && warn("Set operation on key \"".concat(key, "\" failed: target is readonly."));
        return;
    }
    var ob = target.__ob__;
    if (isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        // when mocking for SSR, array methods are not hijacked
        if (ob && !ob.shallow && ob.mock) {
            observe(val, false, true);
        }
        return val;
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }
    if (target._isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' &&
            warn('Avoid adding reactive properties to a Vue instance or its root $data ' +
                'at runtime - declare it upfront in the data option.');
        return val;
    }
    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
    if (process.env.NODE_ENV !== 'production') {
        ob.dep.notify({
            type: "add" /* TriggerOpTypes.ADD */,
            target: target,
            key: key,
            newValue: val,
            oldValue: undefined
        });
    }
    else {
        ob.dep.notify();
    }
    return val;
}
```

* 在源码中首先判断set的目标是否是undefined和基本类型如果是undefined或基本类型就报错，
* 然后又判断了目标是否是数组与key是不是合法的index,合法的index是指值为大于等于0的整数，

### 如果target是数组
调用 target.splice(key, 1, val)，把用户新增的元素添加到相应位置，因为splice方法是被Vue重写过的，所以可以收集依赖和派发更新
### 如果target是对象
1. 先判断用户添加属性是不是重复了（已经有该属性了），重复了直接返回
2. 判断 target.__ob__ 上面有没有 observe 实例，如果有，说明 target 本身就是个响应式对象，如果 target 完全是个普通对象，也是不能添加响应式数据的，直接返回
3. 调用defineReactive定义属性添加 get 方法与 set 方法实现响应
4. 然后手动调用dep里的 notify() 发布更新。

