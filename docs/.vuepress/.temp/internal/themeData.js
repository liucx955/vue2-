export const themeData = JSON.parse("{\"home\":\"/\",\"lang\":\"zh-CN\",\"logo\":\"/images/hero.png\",\"backToHome\":\"返回首页\",\"logoDark\":\"https://vuejs.org/images/logo.png\",\"navbar\":[{\"text\":\"模板和渲染相关\",\"children\":[{\"text\":\"模板编译流程\",\"link\":\"/v2/template/flow\"},{\"text\":\"AST\",\"link\":\"/v2/template/ast\"},{\"text\":\"h函数\",\"link\":\"/v2/template/hfunction\"},{\"text\":\"虚拟DOM和diff\",\"link\":\"/v2/template/vnode\"},{\"text\":\"patch函数\",\"link\":\"/v2/template/patch\"},{\"text\":\"Mustache模板引擎\",\"link\":\"/v2/template/mustache\"}]},{\"text\":\"响应式原理\",\"children\":[{\"text\":\"准备\",\"link\":\"/v2/reactive/prepare\"},{\"text\":\"Dep、Watcher、Observer\",\"link\":\"/v2/reactive/relative\"},{\"text\":\"new Vue()\",\"link\":\"/v2/reactive/newvue\"},{\"text\":\"initData\",\"link\":\"/v2/reactive/initData\"},{\"text\":\"defineReactive\",\"link\":\"/v2/reactive/defineReactive\"},{\"text\":\"$set\",\"link\":\"/v2/reactive/set\"},{\"text\":\"nextTick\",\"link\":\"/v2/reactive/nextTick\"}]},{\"text\":\"生命周期\",\"children\":[{\"text\":\"表现和原理\",\"link\":\"/v2/lifecycle/merge\"}]},{\"text\":\"算法\",\"children\":[{\"text\":\"最长递增子序列\",\"link\":\"/v2/algorithm/subsequence\"},{\"text\":\"二分查找\",\"link\":\"/v2/algorithm/dichotomy\"}]}],\"sidebar\":{\"/v2/template/\":[{\"text\":\"模板和渲染\",\"children\":[\"flow\",\"ast\",\"hfunction\",\"vnode\",\"patch\",\"mustache\"]}],\"/v2/reactive/\":[{\"text\":\"响应式原理\",\"children\":[\"prepare\",\"relative\",\"newvue\",\"initData\",\"defineReactive\",\"set\",\"nextTick\"]}],\"/v2/lifecycle/\":[{\"text\":\"生命周期\",\"children\":[\"merge\"]}],\"/v2/algorithm/\":[{\"text\":\"算法\",\"children\":[\"subsequence\",\"dichotomy\"]}]},\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
