export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroText\":\"Vue2源码笔记\",\"heroImage\":\"/images/hero.png\",\"heroHeight\":200,\"actions\":[{\"text\":\"开始阅读\",\"link\":\"/v2/mustache/engine\",\"type\":\"primary\"}],\"footer\":\"gitee地址:<a href=\\\"https://gitee.com/liuxc955/vue2-source-code\\\"  target=\\\"_blank\\\">liuxc955/vue2源码</a>\",\"footerHtml\":true},\"headers\":[],\"git\":{\"updatedTime\":1696078831000,\"contributors\":[{\"name\":\"liuchenxing\",\"email\":\"2076434315@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
