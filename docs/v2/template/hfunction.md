# h函数
## h函数是什么
h函数用来产生虚拟节点(VNode),然后多个VNode结合成虚拟DOM树(VDom)：

> 点击跳转：[模板如何转换为元素](/v2/template/flow)

假如有一个这样的模板：

```html
<el-button type="text" @click="open">点击打开</el-button>
```

写成h函数是这样的：
```js
h('el-button',{ type: 'text', "@click": "open" },'点击打开')
```

h函数有三个参数：
1. tag: 标签或者组件名
2. props: 标签或者组件的属性
3. children: 字符串，或者插槽，就相当于标签的内容

## 为什么叫做h函数
h函数是createElement的简写，至于它为什么不叫c函数或者其他的名字，目前有两种说法：
1. ”h“其实代表的是hyperscript，表示的是 "生成描述HTML结构的脚本"。
2. 因为Vue借鉴了Snabbdom，Snabbdom是著名的虚拟DOM库，在Snabbdom中，创建虚拟节点的函数也被称为h函数。

无论是源自hyperscript还是Snabbdom，Vue中的h函数都是用于创建虚拟节点的重要函数。
