# AST的介绍
## 抽象语法树是什么
* 抽象语法树是用来解析模版的，只要是模版解析的地方都会用到抽象语法树，比如babel

* 在vue里面，会将vue模版转成字符串，再将字符串转成AST，最后再转成正常的HTML语法

* 抽象语法数本次上是一个js对象

## AST的结构

```js
{
    tag:"div",
    attrs:[{name:"class",value:"box"}],
    type:1,
    children:[
        {
            tag:"h1",
            attrs:[{name:'class',value:"title"}],
            type:1,
            children:[{text:"我是一个标题",type:3}]
        }
    ]
}
```

AST包含以下属性:

1. tag    表示标签名
2. attrs    是attributes的缩写，代表属性，是一个数组
   1. name：attrs的属性名
   2. value：attrs的属性值
3. type：节点类型，1表示标签，3表示文本
4. children：表示子节点

## AST和虚拟节点的关系

> 模板语法 -> 抽象语法树 -> 渲染函数(h函数) -> 虚拟DOM -> diff -> 页面结构

::: warning

注意：抽象语法树并不会直接变成虚拟节点，而是直接变成**渲染函数**（h函数），h函数是虚拟节点的起源

h函数执行后变成虚拟节点，虚拟节点经过diff算法之后，就显示在了页面上

:::

关于h函数的知识，点击跳转：[VNODE和diff -> h函数](/v2/vnode/hfunction)  

## AST和Mustache模板引擎的关系
Vue的AST和Mustache模板引擎在Vue的模板编译过程中扮演不同的角色。
* Mustache模板引擎是Vue用来解析模板语法并生成HTML的一种方式。
* 抽象语法树（AST）是Vue模板编译器的一部分。
   
> 总的来说， 用户编写的Vue模板通过Mustache模板引擎进行解析，生成AST，然后由Vue运行时系统使用AST来更新DOM。
