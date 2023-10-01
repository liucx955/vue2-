import { defaultTheme } from "vuepress";

export default defaultTheme({
  home: "/",
  lang: "zh-CN",
  logo: "/images/hero.png",
  backToHome: "返回首页",
  logoDark: "https://vuejs.org/images/logo.png",
  navbar: [
    {
      text: "mustache",
      children: [
        { text: "模板引擎", link: "/v2/mustache/engine" },
      ],
    },
    {
      text: "AST",
      children: [
        { text: "AST介绍", link: "/v2/template/ast" },
        { text: "AST指针思想", link: "/v2/template/pointer" },
        { text: "AST实现原理", link: "/v2/template/principle" },
      ],
    },
    {
      text: "VNODE和diff",
      children: [
        { text: "h函数", link: "/v2/vnode/hfunction" },
        { text: "diff介绍", link: "/v2/vnode/introduce" },
      ],
    },
    {
      text: "响应式原理",
      children: [
        { text: "defineProperty", link: "/v2/reactive/defineProperty" },
        { text: "defineReactive函数", link: "/v2/vnode/defineReactive" },
      ],
    },
  ],
  sidebar: {
    "/v2/mustache/": [
      {
        text: "模版引擎",
        children: ["engine"],
      },
    ],
    "/v2/template/": [
      {
        text: "AST",
        children: [ "ast", "pointer", "principle"],
      },
    ],
    "/v2/vnode/": [
      {
        text: "VNODE和diff",
        children: ["hfunction", "introduce"],
      },
    ],
    "/v2/reactive/": [
      {
        text: "VNODE和diff",
        children: ["defineProperty", "defineReactive"],
      },
    ],
  },
});
