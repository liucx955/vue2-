# proxy
vue2里的proxy是它自己定义的函数，并不是es6的proxy代理，
```js
export function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```
**以它处理`props`为例：**

1. target 其实就是vm, sourceKey 就是_props，key就是每个 props 的名字。
2. 写作proxy，实际做的是defineProperty的事情，也就是把`props` 代理到`_props`上面，也就是当我们访问`this.xxx`时，实际访问的是`this._props.xxx`