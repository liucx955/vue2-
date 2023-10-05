# 调试前的准备
## 在HTML里面调试
1. 在网上找一个Vue2的js源码文件(没压缩过的)，或者直接从一个vue项目的`node_modules/vue/dist`里面拿vue.js文件
2. 新建一个HTML文件，通过script引用即可
```js
<body>
    <div id="demo">
      <h1>vue初体验</h1>
      <p>{{msg}}</p>
      <input type="text" v-model="msg" />
      <Child @aaa="click" />
    </div>
  </body>
  <script src="./vue2/vue.js"></script>
  <script>
    console.log(Vue);
    const Child = {
      template: `<div>
        <h1>我是child组件</h1>
        <button @click="$emit('aaa')">按钮</button>
    </div>`,
    };
    debugger;
    const vm = new Vue({
      el: "#demo",
      data() {
        return {
          msg: "hello",
        };
      },
      components: {
        Child,
      },
      methods: {
        click() {
          console.log("click", (this.msg += 1));
        },
      },
    });

    console.log("vm", vm);
  </script>
```

## 直接在vue2项目里调试
有些vue项目配置了默认的eslint，在运行时，不允许debugger和console.log；
通过修改 package.json 文件的规则，可以解除限制
```json
  "eslintConfig": {
    ...
    "rules": {
        "no-console": 1,
        "no-debugger": 1
    },
    ...
  }

```
