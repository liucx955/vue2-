<template><div><h1 id="snabbdom" tabindex="-1"><a class="header-anchor" href="#snabbdom" aria-hidden="true">#</a> Snabbdom</h1>
<h2 id="为什么要学习snabbdom" tabindex="-1"><a class="header-anchor" href="#为什么要学习snabbdom" aria-hidden="true">#</a> 为什么要学习snabbdom</h2>
<ul>
<li>Snabbdom是Vue的虚拟DOM库的基础之一。Vue的虚拟DOM和diff算法在设计思想上借鉴了Snabbdom。</li>
<li>Snabbdom的代码行数较少，相比Vue的复杂度较低，这使得我们能够更容易地理解其中的概念和逻辑。</li>
<li>通过学习Snabbdom，并手写其中的一些函数，我们可以更快地掌握虚拟DOM和diff算法的核心原理，进而更好地理解和使用Vue。</li>
</ul>
<h2 id="搭建snabbdom环境" tabindex="-1"><a class="header-anchor" href="#搭建snabbdom环境" aria-hidden="true">#</a> 搭建snabbdom环境</h2>
<ol>
<li>首先创建一个文件夹，初始化package.json</li>
</ol>
<div class="language-cmd line-numbers-mode" data-ext="cmd"><pre v-pre class="language-cmd"><code>npm init -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>安装snabbdom</li>
</ol>
<div class="language-cmd line-numbers-mode" data-ext="cmd"><pre v-pre class="language-cmd"><code>npm i -D snabbdom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>安装webpack和webpack-dev-server</li>
</ol>
<div class="language-cmd line-numbers-mode" data-ext="cmd"><pre v-pre class="language-cmd"><code>npm i -D webpack@5 webpack-cli@3 webpack-dev-server@3 -f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>配置webpack环境</li>
</ol>
<p>创建webpack.config.js</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 入口文件</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">'./src/index.js'</span><span class="token punctuation">,</span>
    <span class="token comment">// 出口</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 虚拟打包路径，就是说文件夹不会真正生成，而是在9000口虚拟生成</span>
        <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">'dist'</span><span class="token punctuation">,</span>
        <span class="token comment">// path: path.resolve(__dirname, 'dist'),</span>
        <span class="token comment">// 打包出来的文件名</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'bundle.js'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">devServer</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token comment">// 端口号</span>
        <span class="token literal-property property">port</span><span class="token operator">:</span><span class="token number">9000</span><span class="token punctuation">,</span>
        <span class="token literal-property property">open</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token comment">// 静态资源文件夹</span>
        <span class="token literal-property property">contentBase</span><span class="token operator">:</span><span class="token string">'public'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在根路径创建src/index.js和public/index.html</p>
<ol start="5">
<li>在package.json添加启动项</li>
</ol>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"dev"</span><span class="token operator">:</span> <span class="token string">"webpack-dev-server"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>
<p>运行项目，我们就可以看到public/index.html里面的内容了</p>
</li>
<li>
<p>在src/index.js里面，放上官方实例代码</p>
</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>
  init<span class="token punctuation">,</span>
  classModule<span class="token punctuation">,</span>
  propsModule<span class="token punctuation">,</span>
  styleModule<span class="token punctuation">,</span>
  eventListenersModule<span class="token punctuation">,</span>
  h<span class="token punctuation">,</span>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"snabbdom"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> patch <span class="token operator">=</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token comment">// Init patch function with chosen modules</span>
  classModule<span class="token punctuation">,</span> <span class="token comment">// makes it easy to toggle classes</span>
  propsModule<span class="token punctuation">,</span> <span class="token comment">// for setting properties on DOM elements</span>
  styleModule<span class="token punctuation">,</span> <span class="token comment">// handles styling on elements with support for animations</span>
  eventListenersModule<span class="token punctuation">,</span> <span class="token comment">// attaches event listeners</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"container"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> vnode <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">"div#container.two.classes"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">click</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"div clicked"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
  <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">"span"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">fontWeight</span><span class="token operator">:</span> <span class="token string">"bold"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"This is bold"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token string">" and this is just normal text"</span><span class="token punctuation">,</span>
  <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">"/foo"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"I'll take you places!"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Patch into empty DOM element – this modifies the DOM as a side effect</span>
<span class="token function">patch</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> newVnode <span class="token operator">=</span> <span class="token function">h</span><span class="token punctuation">(</span>
  <span class="token string">"div#container.two.classes"</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span> <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token function-variable function">click</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"updated div clicked"</span><span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">[</span>
    <span class="token function">h</span><span class="token punctuation">(</span>
      <span class="token string">"span"</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">fontWeight</span><span class="token operator">:</span> <span class="token string">"normal"</span><span class="token punctuation">,</span> <span class="token literal-property property">fontStyle</span><span class="token operator">:</span> <span class="token string">"italic"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">"This is now italic type"</span>
    <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">" and this is still just normal text"</span><span class="token punctuation">,</span>
    <span class="token function">h</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">"/bar"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">"I'll take you places!"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// Second `patch` invocation</span>
<span class="token function">patch</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> newVnode<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Snabbdom efficiently updates the old view to the new state</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8">
<li>在public/index.html里面引入，<code v-pre>&lt;script src=&quot;/dist/bundle.js&quot;&gt;&lt;/script&gt;</code>，并放置容器<code v-pre>&lt;div id=&quot;container&quot;&gt;&lt;/div&gt;</code>如果代码能跑通，说明成功了</li>
</ol>
</div></template>


