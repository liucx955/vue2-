import { defaultTheme } from "vuepress";

export default defaultTheme({
  home: "/",
  lang: "zh-CN",
  logo: "/images/hero.png",
  backToHome: "返回首页",
  logoDark: "https://vuejs.org/images/logo.png",
  navbar: [
    {
      text: "模板和渲染相关",
      children: [
        { text: "模板编译流程", link: "/v2/template/flow" },
        { text: "AST", link: "/v2/template/ast" },
        { text: "h函数", link: "/v2/template/hfunction" },
        { text: "虚拟DOM和diff", link: "/v2/template/vnode" },
        { text: "patch函数", link: "/v2/template/patch" },
        { text: "Mustache模板引擎", link: "/v2/template/mustache" },
      ],
    },
    {
      text: "响应式原理",
      children: [
        { text: "defineProperty", link: "/v2/reactive/defineProperty" },
        { text: "defineReactive函数", link: "/v2/reactive/defineReactive" },
        { text: "new Vue()", link: "/v2/reactive/newvue" },
      ],
    },
  ],
  sidebar: {
    "/v2/template/": [
      {
        // collapsible:true,
        text: "模板和渲染",
        children: [ "flow", "ast", "hfunction","vnode","patch","mustache"],
      },
    ],
    "/v2/reactive/": [
      {
        // collapsible:true,
        text: "响应式原理",
        children: ["defineProperty", "defineReactive","newvue"],
      },
    ],
  },

});
