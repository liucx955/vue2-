# mustache模板引擎
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
* mustache的嵌入标记“{{ }}”非常像胡子，而Vue也是这种写法，这就是学习mustache的原因
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