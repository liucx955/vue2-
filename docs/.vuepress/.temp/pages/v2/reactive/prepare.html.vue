<template><div><h1 id="调试前的准备" tabindex="-1"><a class="header-anchor" href="#调试前的准备" aria-hidden="true">#</a> 调试前的准备</h1>
<h2 id="在html里面调试" tabindex="-1"><a class="header-anchor" href="#在html里面调试" aria-hidden="true">#</a> 在HTML里面调试</h2>
<ol>
<li>在网上找一个Vue2的js源码文件(没压缩过的)，或者直接从一个vue项目的<code v-pre>node_modules/vue/dist</code>里面拿vue.js文件</li>
<li>新建一个HTML文件，通过script引用即可</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token operator">&lt;</span>body<span class="token operator">></span>
    <span class="token operator">&lt;</span>div id<span class="token operator">=</span><span class="token string">"demo"</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>h1<span class="token operator">></span>vue初体验<span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
      <span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token punctuation">{</span><span class="token punctuation">{</span>msg<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
      <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">"text"</span> v<span class="token operator">-</span>model<span class="token operator">=</span><span class="token string">"msg"</span> <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span>Child @aaa<span class="token operator">=</span><span class="token string">"click"</span> <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
  <span class="token operator">&lt;</span>script src<span class="token operator">=</span><span class="token string">"./vue2/vue.js"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
  <span class="token operator">&lt;</span>script<span class="token operator">></span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> Child <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;div>
        &lt;h1>我是child组件&lt;/h1>
        &lt;button @click="$emit('aaa')">按钮&lt;/button>
    &lt;/div></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">debugger</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> vm <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      <span class="token literal-property property">el</span><span class="token operator">:</span> <span class="token string">"#demo"</span><span class="token punctuation">,</span>
      <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">msg</span><span class="token operator">:</span> <span class="token string">"hello"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">components</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        Child<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function">click</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"click"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>msg <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"vm"</span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="直接在vue2项目里调试" tabindex="-1"><a class="header-anchor" href="#直接在vue2项目里调试" aria-hidden="true">#</a> 直接在vue2项目里调试</h2>
<p>有些vue项目配置了默认的eslint，在运行时，不允许debugger和console.log；
通过修改 package.json 文件的规则，可以解除限制</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>  <span class="token property">"eslintConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    ...
    <span class="token property">"rules"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"no-console"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
        <span class="token property">"no-debugger"</span><span class="token operator">:</span> <span class="token number">1</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


