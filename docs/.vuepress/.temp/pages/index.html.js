export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroText\":\"Vue2源码笔记\",\"heroImage\":\"/images/hero.png\",\"heroHeight\":200,\"actions\":[{\"text\":\"开始阅读\",\"link\":\"/v2/template/mustache\",\"type\":\"primary\"}],\"footer\":\"github地址:<a href=\\\"https://github.com/liucx955/vue2-base\\\"  target=\\\"_blank\\\">liuxc955/vue2-base</a>\",\"footerHtml\":true},\"headers\":[],\"git\":{\"updatedTime\":1696130504000,\"contributors\":[{\"name\":\"liuchenxing\",\"email\":\"2076434315@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"README.md\"}")

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
