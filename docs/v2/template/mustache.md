# Mustache模板引擎
## 为什么要学习mustache
* Mustache 是模板引擎思想的奠基者，Vue 中的模板引擎也借用了它的思想
* Mustache里面的tokens是“抽象语法树”、“虚拟节点”等的开山鼻祖

## 模板引擎是什么
先做一个题目：

将下面数组转化成多个li标签:

```js
const arr = [
    { name:'张三', age:18 },
    { name:'李四', age:88 },
    { name:'王五', age:108 },
]
```

对于这个题目，我们有多个解决方案

比如: 

1. 使用最原始的操作原生DOM的方法，遍历，创建节点，上树
2. 使用数组中的join方法（曾经流行）

3. 使用ES6模板字符串，直接生成一个字符串，最后添加innerHTML属性上，模板字符串可以换行，非常方便

> 在Vue中，我们使用v-for，我们使用很少的代码，很容易就能实现这个功能，就是因为它用到了**mustache模板引擎**
>
> 所以，**模板引擎是将数据变为视图最优雅的解决方式**

## mustache是什么
* mustache是模板引擎库的开山鼻祖，是早的模板引擎库
* mustache的嵌入标记```{{ }}```非常像胡子，而Vue也是这种写法，这就是学习mustache的原因
* 对于上面那个题目，使用mustache库的写法是
```html
  <div id="container"></div>
  <!-- 引入Mustache -->
  <script src="https://cdn.bootcdn.net/ajax/libs/mustache.js/4.1.0/mustache.js"></script>
  <script>
      // 定义模板
    const templateStr = `
      <ul id="list">
        {{#arr}}
        <li>
          <div class="hd">{{name}}的基本信息</div>
          <div class="bd">
            <p>姓名：{{name}}</p>
            <p>年龄：{{age}}</p>
          </div>
        </li>
        {{/arr}}
      </ul>
    `
      // 定义数据
   const data = {
         arr : [
            { name:'张三', age:18 },
            { name:'李四', age:88 },
            { name:'王五', age:108 },
        ]
    }
    const domStr = Mustache.render(templateStr, data)
    const container = document.getElementById('container')
    container.innerHTML = domStr
  </script>
```

##  mustache如何运行
### 一个示例
最简单的替换```{{ }}```里面的内容的方法
```js
const reg = /\{\{(\w+)\}\}/g;
const data = {
    thing:"手机",
    mood:"开心"
};
const templateStr = '<h1>我买了一个{{thing}}，好{{mood}}的啊</h1>'

console.log(templateStr.replace(reg, function (findStr, $1, index, origin) {
  console.log(findStr, $1, index, origin)
  return data[$1]
}))
```
在上面的代码中
1. reg是正则表达式，用来匹配```{{ }}```并且捕获里面的内容
2. templateStr是模板字符串
3. replace可以将模板字符串中所有能被正则匹配的项，替换成函数的返回值
4. findStr表示被匹配的部分
5. $1表示第一个捕获组
6. index表示被匹配到的位置
7. origin表示原字符串

最后的打印结果为：
```
{{thing}} thing 9 <h1>我买了一个{{thing}}，好{{mood}}的啊</h1>
{{mood}} mood 20 <h1>我买了一个{{thing}}，好{{mood}}的啊</h1>
<h1>我买了一个手机，好开心的啊</h1> 
```

###  核心机理
上面的示例中，只能实现最简单的替换，mustache的要做的远远不止这些，它还要遍历，实现嵌套结构

mustache库的机理大概是这样：
![图片](/images/mustache-core.png)
我们发现中间多出个 <span style="color:red;font-weight:bold;">tokens</span>

token是一个js的嵌套的数组，大概长这样：
![图片](/images/mustache-tokens.png)

