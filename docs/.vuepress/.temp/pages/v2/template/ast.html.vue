<template><div><h1 id="ast的介绍" tabindex="-1"><a class="header-anchor" href="#ast的介绍" aria-hidden="true">#</a> AST的介绍</h1>
<h2 id="抽象语法树是什么" tabindex="-1"><a class="header-anchor" href="#抽象语法树是什么" aria-hidden="true">#</a> 抽象语法树是什么</h2>
<ul>
<li>
<p>抽象语法树是用来解析模版的，只要是模版解析的地方都会用到抽象语法树，比如babel</p>
</li>
<li>
<p>在vue里面，会将vue模版转成字符串，再将字符串转成AST，最后再转成正常的HTML语法</p>
</li>
<li>
<p>抽象语法数本次上是一个js对象</p>
</li>
</ul>
<h2 id="ast的结构" tabindex="-1"><a class="header-anchor" href="#ast的结构" aria-hidden="true">#</a> AST的结构</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token literal-property property">tag</span><span class="token operator">:</span><span class="token string">"div"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">attrs</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">"class"</span><span class="token punctuation">,</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">"box"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">tag</span><span class="token operator">:</span><span class="token string">"h1"</span><span class="token punctuation">,</span>
            <span class="token literal-property property">attrs</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'class'</span><span class="token punctuation">,</span><span class="token literal-property property">value</span><span class="token operator">:</span><span class="token string">"title"</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token literal-property property">text</span><span class="token operator">:</span><span class="token string">"我是一个标题"</span><span class="token punctuation">,</span><span class="token literal-property property">type</span><span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>AST包含以下属性:</p>
<ol>
<li>tag    表示标签名</li>
<li>attrs    是attributes的缩写，代表属性，是一个数组
<ol>
<li>name：attrs的属性名</li>
<li>value：attrs的属性值</li>
</ol>
</li>
<li>type：节点类型，1表示标签，3表示文本</li>
<li>children：表示子节点</li>
</ol>
<h2 id="ast和虚拟节点的关系" tabindex="-1"><a class="header-anchor" href="#ast和虚拟节点的关系" aria-hidden="true">#</a> AST和虚拟节点的关系</h2>
<blockquote>
<p>模板语法 -&gt; 抽象语法树 -&gt; 渲染函数(h函数) -&gt; 虚拟DOM -&gt; diff -&gt; 页面结构</p>
</blockquote>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>注意：抽象语法树并不会直接变成虚拟节点，而是直接变成<strong>渲染函数</strong>（h函数），h函数是虚拟节点的起源</p>
<p>h函数执行后变成虚拟节点，虚拟节点经过diff算法之后，就显示在了页面上</p>
</div>
<p>关于h函数的知识，点击跳转：<a href="/v2/vnode/hfunction">VNODE和diff -&gt; h函数</a></p>
</div></template>


