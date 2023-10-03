<template><div><h1 id="虚拟dom-diff" tabindex="-1"><a class="header-anchor" href="#虚拟dom-diff" aria-hidden="true">#</a> 虚拟DOM&amp;diff</h1>
<h2 id="什么是虚拟dom" tabindex="-1"><a class="header-anchor" href="#什么是虚拟dom" aria-hidden="true">#</a> 什么是虚拟DOM</h2>
<ul>
<li>虚拟DOM就是把DOM数据化，利用javascript对象描述DOM结构</li>
<li>一个虚拟DOM的结构是这样的</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
    <span class="token literal-property property">tag</span><span class="token operator">:</span><span class="token string">'div'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span><span class="token string">'app'</span><span class="token punctuation">,</span> <span class="token keyword">class</span><span class="token operator">:</span><span class="token string">'container'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">'h1'</span><span class="token punctuation">,</span> <span class="token literal-property property">children</span><span class="token operator">:</span><span class="token string">'沐华'</span> <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它包含了下面几个属性：</p>
<ol>
<li>tag：必选。就是标签。也可以是组件，或者函数</li>
<li>props：非必选。就是这个标签上的属性和方法</li>
<li>children：非必选。就是这个标签的内容或者子节点</li>
</ol>
<h2 id="ast和虚拟dom有什么区别" tabindex="-1"><a class="header-anchor" href="#ast和虚拟dom有什么区别" aria-hidden="true">#</a> AST和虚拟DOM有什么区别</h2>
<p><strong>Vue中的AST和虚拟DOM有什么区别啊？看着都长的一个样?</strong></p>
<p>template先转成AST，然后AST再转成render函数，render函数再转成VNode。</p>
<blockquote>
<p>点击跳转：<a href="/v2/template/flow">模板如何转换为元素</a></p>
</blockquote>
<h2 id="为什么要使用虚拟dom" tabindex="-1"><a class="header-anchor" href="#为什么要使用虚拟dom" aria-hidden="true">#</a> 为什么要使用虚拟DOM？</h2>
<ul>
<li>原生DOM拥有非常多的属性和方法，就算创建一个空div也要不少的代价</li>
<li>虽然后面出现了模板引擎这种东西，可以让我们一次性去更新多个dom。但是当引擎内某个数据发生变化时，他要操作dom去重新渲染整个引擎。</li>
<li>虚拟DOM不过是一个javascript对象，生成它比直接生成DOM的成本要低得多</li>
</ul>
<h2 id="什么是diff算法" tabindex="-1"><a class="header-anchor" href="#什么是diff算法" aria-hidden="true">#</a> 什么是diff算法</h2>
<p>diff算法就是用于比较新旧两个虚拟dom之间差异，找出最小化的更新视图的一种算法。</p>
<h3 id="vue中的diff" tabindex="-1"><a class="header-anchor" href="#vue中的diff" aria-hidden="true">#</a> vue中的diff</h3>
<p>在vue中，diff算法就叫做<code v-pre>patch</code>,参考的snabbdom</p>
<blockquote>
<p>点击跳转：<RouterLink to="/v2/template/patch.html#patch%E5%87%BD%E6%95%B0%E6%98%AF%E4%BB%80%E4%B9%88">patch函数是什么</RouterLink></p>
</blockquote>
<p>在页面首次渲染的时候会调用一次 patch 并创建新的 vnode，不会进行更深层次的比较
然后是在组件中数据发生变化时，会触发 setter 然后通过 Notify 通知 Watcher，对应的 Watcher 会通知更新并执行更新函数，它会执行 render 函数获取新的虚拟 DOM，然后执行 patch 对比上次渲染结果的老的虚拟 DOM，并计算出最小的变化，然后再去根据这个最小的变化去更新真实的 DOM，也就是视图。</p>
<h2 id="diff算法的优化" tabindex="-1"><a class="header-anchor" href="#diff算法的优化" aria-hidden="true">#</a> diff算法的优化</h2>
<p>按照最直接的思维，比较新旧两个虚拟DOM，那么就应该分别递归遍历两个节点，进行比较，可是这样的效率很低。</p>
<p>为了优化diff算法，实现最小量更新，做了一些策略上的优化：</p>
<ol>
<li>只有同一个虚拟节点，才会进行精细化比较</li>
</ol>
<p>这里的同一个虚拟节点，判断依据是：tag和key都相同。如果被判断不是同一个节点，不仅这两个虚拟节点不比较，而且里面的子节点也不比较了。
直接暴力拆除旧的，插入新的。</p>
<ol start="2">
<li>只比较同一层级，不跨级比较。</li>
</ol>
<p>即使是同一片虚拟节点，但是跨层了，不会进行diff比较，依旧暴力删除旧的、然后插入新的。</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>像上面两种情况，万一里面还有很多相同的、可复用的节点，岂不是很浪费？</p>
<p>答：实际开发中很少遇到这两种情况，损失几乎可以忽略。</p>
</div>
</div></template>


