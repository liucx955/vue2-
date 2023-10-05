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
        { text: "准备", link: "/v2/reactive/prepare" },
        { text: "new Vue()", link: "/v2/reactive/newvue" },
        { text: "initData", link: "/v2/reactive/initData" },
        { text: "defineReactive", link: "/v2/reactive/defineReactive" },
      ],
    },
    {
      text: "算法",
      children: [
        { text: "最长递增子序列", link: "/v2/algorithm/subsequence" },
        { text: "二分查找", link: "/v2/algorithm/dichotomy" },
      ],
    },
  ],
  sidebar: {
    "/v2/template/": [
      {
        // collapsible:true,
        text: "模板和渲染",
        children: ["flow", "ast", "hfunction", "vnode", "patch", "mustache"],
      },
    ],
    "/v2/reactive/": [
      {
        // collapsible:true,
        text: "响应式原理",
        children: ["prepare", "newvue", "initData", "defineReactive"],
      },
    ],
    "/v2/algorithm/": [
      {
        // collapsible:true,
        text: "算法",
        children: ["subsequence", "dichotomy"],
      },
    ],
  },
});
