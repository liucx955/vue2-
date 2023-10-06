# def工具函数
```js
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}
```
def是vue全局的一个工具函数，主要用`Object.defineProperty`来给对象添加一个属性，并指定属性的值