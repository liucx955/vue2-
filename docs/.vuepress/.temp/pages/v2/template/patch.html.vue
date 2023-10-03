<template><div><h1 id="patch函数和精细化比较" tabindex="-1"><a class="header-anchor" href="#patch函数和精细化比较" aria-hidden="true">#</a> patch函数和精细化比较</h1>
<h2 id="patch函数是什么" tabindex="-1"><a class="header-anchor" href="#patch函数是什么" aria-hidden="true">#</a> patch函数是什么</h2>
<ul>
<li>在vue中，patch函数是一个将虚拟DOM转化为真实DOM的函数，也是diff算法的主体函数</li>
<li>它可以接收四个参数，主要还是前两个
<ul>
<li>oldVnode：老的虚拟 DOM 节点</li>
<li>vnode：新的虚拟 DOM 节点</li>
<li>hydrating：是不是要和真实 DOM 混合，服务端渲染的话会用到，这里不过多说明</li>
<li>removeOnly：transition-group 会用到，这里不过多说明</li>
</ul>
</li>
</ul>
<h2 id="patch函数的流程" tabindex="-1"><a class="header-anchor" href="#patch函数的流程" aria-hidden="true">#</a> patch函数的流程</h2>
<p>patch的源代码在vue2的<code v-pre>node_modules\vue\src\core\vdom\patch.ts</code>的801行</p>
<p>vue中patch函数的流程:
<img src="/images/patch.png" alt="patch"></p>
<p>patch函数带注释版：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 两个判断函数</span>
<span class="token keyword">function</span> <span class="token function">isUndef</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">v</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token operator">%</span>checks <span class="token punctuation">{</span>
  <span class="token keyword">return</span> v <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span> v <span class="token operator">===</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">isDef</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">v</span><span class="token operator">:</span> any</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token operator">%</span>checks <span class="token punctuation">{</span>
  <span class="token keyword">return</span> v <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span> v <span class="token operator">!==</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
<span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">patch</span> <span class="token punctuation">(</span><span class="token parameter">oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> hydrating<span class="token punctuation">,</span> removeOnly</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果新的 vnode 不存在，但是 oldVnode 存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果 oldVnode 存在，调用 oldVnode 的组件卸载钩子 destroy</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">invokeDestroyHook</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">let</span> isInitialPatch <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token keyword">const</span> insertedVnodeQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    
    <span class="token comment">// 如果 oldVnode 不存在的话，新的 vnode 是肯定存在的，比如首次渲染的时候</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isUndef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      isInitialPatch <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// 就创建新的 vnode</span>
      <span class="token function">createElm</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 剩下的都是新的 vnode 和 oldVnode 都存在的话</span>
      
      <span class="token comment">// 是不是元素节点</span>
      <span class="token keyword">const</span> isRealElement <span class="token operator">=</span> <span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span>
      <span class="token comment">// 是元素节点 &amp;&amp; 通过 sameVnode 对比是不是同一个节点 (函数后面有详解)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRealElement <span class="token operator">&amp;&amp;</span> <span class="token function">sameVnode</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果是 就用 patchVnode 进行后续对比 (函数后面有详解)</span>
        <span class="token function">patchVnode</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> removeOnly<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果不是同一元素节点的话</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isRealElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// const SSR_ATTR = 'data-server-rendered'</span>
          <span class="token comment">// 如果是元素节点 并且有 'data-server-rendered' 这个属性</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> oldVnode<span class="token punctuation">.</span><span class="token function">hasAttribute</span><span class="token punctuation">(</span><span class="token constant">SSR_ATTR</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 就是服务端渲染的，删掉这个属性</span>
            oldVnode<span class="token punctuation">.</span><span class="token function">removeAttribute</span><span class="token punctuation">(</span><span class="token constant">SSR_ATTR</span><span class="token punctuation">)</span>
            hydrating <span class="token operator">=</span> <span class="token boolean">true</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 这个判断里是服务端渲染的处理逻辑，就是混合</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isTrue</span><span class="token punctuation">(</span>hydrating<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hydrate</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">invokeInsertHook</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
              <span class="token keyword">return</span> oldVnode
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'这是一段很长的警告信息'</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// function emptyNodeAt (elm) {</span>
          <span class="token comment">//    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)</span>
          <span class="token comment">//  }</span>
          <span class="token comment">// 如果不是服务端渲染的，或者混合失败，就创建一个空的注释节点替换 oldVnode</span>
          oldVnode <span class="token operator">=</span> <span class="token function">emptyNodeAt</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        
        <span class="token comment">// 拿到 oldVnode 的父节点</span>
        <span class="token keyword">const</span> oldElm <span class="token operator">=</span> oldVnode<span class="token punctuation">.</span>elm
        <span class="token keyword">const</span> parentElm <span class="token operator">=</span> nodeOps<span class="token punctuation">.</span><span class="token function">parentNode</span><span class="token punctuation">(</span>oldElm<span class="token punctuation">)</span>
        
        <span class="token comment">// 根据新的 vnode 创建一个 DOM 节点，挂载到父节点上</span>
        <span class="token function">createElm</span><span class="token punctuation">(</span>
          vnode<span class="token punctuation">,</span>
          insertedVnodeQueue<span class="token punctuation">,</span>
          oldElm<span class="token punctuation">.</span>_leaveCb <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> parentElm<span class="token punctuation">,</span>
          nodeOps<span class="token punctuation">.</span><span class="token function">nextSibling</span><span class="token punctuation">(</span>oldElm<span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        
        <span class="token comment">// 如果新的 vnode 的根节点存在，就是说根节点被修改了，就需要遍历更新父节点</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>vnode<span class="token punctuation">.</span>parent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">let</span> ancestor <span class="token operator">=</span> vnode<span class="token punctuation">.</span>parent
          <span class="token keyword">const</span> patchable <span class="token operator">=</span> <span class="token function">isPatchable</span><span class="token punctuation">(</span>vnode<span class="token punctuation">)</span>
          <span class="token comment">// 递归更新父节点下的元素</span>
          <span class="token keyword">while</span> <span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 卸载老根节点下的全部组件</span>
            <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cbs<span class="token punctuation">.</span>destroy<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              cbs<span class="token punctuation">.</span>destroy<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 替换现有元素</span>
            ancestor<span class="token punctuation">.</span>elm <span class="token operator">=</span> vnode<span class="token punctuation">.</span>elm
            <span class="token keyword">if</span> <span class="token punctuation">(</span>patchable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cbs<span class="token punctuation">.</span>create<span class="token punctuation">.</span>length<span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                cbs<span class="token punctuation">.</span>create<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>emptyNode<span class="token punctuation">,</span> ancestor<span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">const</span> insert <span class="token operator">=</span> ancestor<span class="token punctuation">.</span>data<span class="token punctuation">.</span>hook<span class="token punctuation">.</span>insert
              <span class="token keyword">if</span> <span class="token punctuation">(</span>insert<span class="token punctuation">.</span>merged<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> insert<span class="token punctuation">.</span>fns<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  insert<span class="token punctuation">.</span>fns<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token function">registerRef</span><span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 更新父节点</span>
            ancestor <span class="token operator">=</span> ancestor<span class="token punctuation">.</span>parent
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 如果旧节点还存在，就删掉旧节点</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>parentElm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">removeVnodes</span><span class="token punctuation">(</span><span class="token punctuation">[</span>oldVnode<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isDef</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">.</span>tag<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 否则直接卸载 oldVnode</span>
          <span class="token function">invokeDestroyHook</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 返回更新后的节点</span>
    <span class="token function">invokeInsertHook</span><span class="token punctuation">(</span>vnode<span class="token punctuation">,</span> insertedVnodeQueue<span class="token punctuation">,</span> isInitialPatch<span class="token punctuation">)</span>
    <span class="token keyword">return</span> vnode<span class="token punctuation">.</span>elm
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="怎么证明是-同一个节点" tabindex="-1"><a class="header-anchor" href="#怎么证明是-同一个节点" aria-hidden="true">#</a> 怎么证明是“同一个节点”</h2>
<p>在patch函数里面，这一段调用了另一个函数sameVnode</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRealElement <span class="token operator">&amp;&amp;</span> <span class="token function">sameVnode</span><span class="token punctuation">(</span>oldVnode<span class="token punctuation">,</span> vnode<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     xxx<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sameVnode函数是这样的,总体上来看，是在比较key相等并且tag相等。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">sameVnode</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
        a<span class="token punctuation">.</span>key <span class="token operator">===</span> b<span class="token punctuation">.</span>key <span class="token operator">&amp;&amp;</span>  <span class="token comment">// key 是不是一样</span>
        a<span class="token punctuation">.</span>asyncFactory <span class="token operator">===</span> b<span class="token punctuation">.</span>asyncFactory <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span> <span class="token comment">// 是不是异步组件</span>
            <span class="token punctuation">(</span>
                a<span class="token punctuation">.</span>tag <span class="token operator">===</span> b<span class="token punctuation">.</span>tag <span class="token operator">&amp;&amp;</span> <span class="token comment">// 标签是不是一样</span>
                a<span class="token punctuation">.</span>isComment <span class="token operator">===</span> b<span class="token punctuation">.</span>isComment <span class="token operator">&amp;&amp;</span> <span class="token comment">// 是不是注释节点</span>
                <span class="token function">isDef</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token function">isDef</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// 内容数据是不是一样</span>
                <span class="token function">sameInputType</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token comment">// 判断 input 的 type 是不是一样</span>
            <span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>
                <span class="token function">isTrue</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span>isAsyncPlaceholder<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token comment">// 判断区分异步组件的占位符否存在</span>
                <span class="token function">isUndef</span><span class="token punctuation">(</span>b<span class="token punctuation">.</span>asyncFactory<span class="token punctuation">.</span>error<span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="是同一个节点怎么办" tabindex="-1"><a class="header-anchor" href="#是同一个节点怎么办" aria-hidden="true">#</a> 是同一个节点怎么办</h2>
<p>如果vnode和oldVnode是同一个虚拟节点，就调用patchVnode函数对比节点文本变化或子节点变化。</p>
<ol>
<li>如果 oldVnode 和 vnode 的引用地址是一样的，就表示节点没有变化，直接返回</li>
<li>如果 oldVnode 的 isAsyncPlaceholder 存在，就跳过异步组件的检查，直接返回</li>
<li>如果 oldVnode 和 vnode 都是静态节点，并且有一样的 key，并且 vnode 是克隆节点或者 v-once 指令控制的节点时，把 oldVnode.elm 和 oldVnode.child 都复制到 vnode 上，然后返回</li>
<li>如果 vnode 不是文本节点也不是注释的情况下
<ol>
<li>如果 vnode 和 oldVnode 都有子节点，而且子节点不一样的话，就调用 updateChildren 更新子节点</li>
<li>如果只有 vnode 有子节点，就调用 addVnodes 创建子节点</li>
<li>如果只有 oldVnode 有子节点，就调用 removeVnodes 删除该子节点</li>
<li>如果 vnode 文本为 undefined，就删掉 vnode.elm 文本</li>
</ol>
</li>
<li>如果 vnode 是文本节点但是和 oldVnode 文本内容不一样，就更新文本</li>
</ol>
<h2 id="子节点不一样怎么办" tabindex="-1"><a class="header-anchor" href="#子节点不一样怎么办" aria-hidden="true">#</a> 子节点不一样怎么办</h2>
<p>如果 vnode 和 oldVnode 都有子节点，且子节点不一样的时候，调用 updateChildren 函数进行子节点对比。</p>
<p>比如现在有两个子节点列表对比，对比主要流程如下：</p>
<ol>
<li>定义四个指针</li>
</ol>
<ul>
<li>oldStartIdx</li>
<li>oldEndIdx</li>
<li>newStartIdx</li>
<li>newEndIdx</li>
</ul>
<p><img src="/images/updateChildren.png" alt="updateChildren"></p>
<ol start="2">
<li>循环遍历比较列表：</li>
</ol>
<p>循环内容是：</p>
<ul>
<li>新前 对 旧前</li>
<li>新后 对 旧后</li>
<li>新后 对 旧前</li>
<li>新前 对 旧后</li>
</ul>
<p>每次比较，如果有一种情况相等，则则新旧的指针都移动一位</p>
<p><img src="/images/updateChildren.gif" alt="updateChildren"></p>
<blockquote>
<p>点击下载演示文稿：<a href="/images/updateChildren.pptx">updateChildren.pptx</a></p>
</blockquote>
<p>循环停止条件是：其中一个列表的开始指针 startIdx 和 结束指针 endIdx 重合</p>
</div></template>


