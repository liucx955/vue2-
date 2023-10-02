<template><div><h1 id="h函数" tabindex="-1"><a class="header-anchor" href="#h函数" aria-hidden="true">#</a> h函数</h1>
<h2 id="h函数是什么" tabindex="-1"><a class="header-anchor" href="#h函数是什么" aria-hidden="true">#</a> h函数是什么</h2>
<p>h函数用来产生虚拟节点(VNode),然后多个VNode结合成虚拟DOM树(VDom)：</p>
<blockquote>
<p>点击跳转：<a href="/v2/template/flow">模板如何转换为元素</a></p>
</blockquote>
<p>假如有一个这样的模板：</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>el-button</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>open<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点击打开<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>el-button</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>写成h函数是这样的：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token function">h</span><span class="token punctuation">(</span><span class="token string">'el-button'</span><span class="token punctuation">,</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'text'</span><span class="token punctuation">,</span> <span class="token string-property property">"@click"</span><span class="token operator">:</span> <span class="token string">"open"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token string">'点击打开'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>h函数有三个参数：</p>
<ol>
<li>tag: 标签或者组件名</li>
<li>props: 标签或者组件的属性</li>
<li>children: 字符串，或者插槽，就相当于标签的内容</li>
</ol>
<h2 id="为什么叫做h函数" tabindex="-1"><a class="header-anchor" href="#为什么叫做h函数" aria-hidden="true">#</a> 为什么叫做h函数</h2>
<p>h函数是createElement的简写，至于它为什么不叫c函数或者其他的名字，目前有两种说法：</p>
<ol>
<li>”h“其实代表的是hyperscript，表示的是 &quot;生成描述HTML结构的脚本&quot;。</li>
<li>因为Vue借鉴了Snabbdom，Snabbdom是著名的虚拟DOM库，在Snabbdom中，创建虚拟节点的函数也被称为h函数。</li>
</ol>
<p>无论是源自hyperscript还是Snabbdom，Vue中的h函数都是用于创建虚拟节点的重要函数。</p>
</div></template>


