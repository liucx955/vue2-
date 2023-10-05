<template><div><h1 id="initdata" tabindex="-1"><a class="header-anchor" href="#initdata" aria-hidden="true">#</a> initData</h1>
<h2 id="initdata-方法" tabindex="-1"><a class="header-anchor" href="#initdata-方法" aria-hidden="true">#</a> initData()方法</h2>
<p>Vue初始化会调用initData()方法:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initData</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">vm</span><span class="token operator">:</span> Component</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> data <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>data <span class="token comment">// 用户传入的数据</span>
  data <span class="token operator">=</span> vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token keyword">typeof</span> data <span class="token operator">===</span> <span class="token string">'function'</span>
    <span class="token operator">?</span> <span class="token function">getData</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token operator">:</span> data <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isPlainObject</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token string">'data functions should return an object:\n'</span> <span class="token operator">+</span>
      <span class="token string">'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function'</span><span class="token punctuation">,</span>
      vm
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// proxy data on instance</span>
  <span class="token keyword">const</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>props
  <span class="token keyword">const</span> methods <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>methods
  <span class="token keyword">let</span> i <span class="token operator">=</span> keys<span class="token punctuation">.</span>length
  <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>methods <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>methods<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">warn</span><span class="token punctuation">(</span>
          <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Method "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" has already been defined as a data property.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
          vm
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>props <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">The data property "</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>key<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">" is already declared as a prop. </span><span class="token template-punctuation string">`</span></span> <span class="token operator">+</span>
        <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Use prop default value instead.</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>
        vm
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isReserved</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">_data</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// observe data</span>
  <span class="token function">observe</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span><span class="token punctuation">)</span> <span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>数据观测
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意，initData是在initState里面被调用的,同时被调用的还有：initProps、initMethods、initComputed、initWatch</p>
</blockquote>
<p>这个函数大概做了这么几件事情：</p>
<ol>
<li>判断data是函数还是对象，进行不同的操作，如果是函数，就调用这个函数并把this指向vm,最后拿到data，放到vm._data上面</li>
<li>判断vm上面是不是已经有同名的methods或者props了，如果有就警告名字已经被占用了</li>
<li>没有同名的话，就调用 <strong>proxy</strong> 在vm上面添加所有data数据，并代理到 <code v-pre>_data</code>上面</li>
</ol>
<blockquote>
<p>点击跳转：<a href="/v2/reactive/proxy">proxy</a></p>
</blockquote>
<ol start="4">
<li>也就是说当我们访问 <code v-pre>this.xxx</code> 来得到data时，实际访问到的是 <code v-pre>this._data.xxx</code></li>
<li>最后，调用<code v-pre>observe</code>对data进行数据劫持</li>
</ol>
<h2 id="observe" tabindex="-1"><a class="header-anchor" href="#observe" aria-hidden="true">#</a> observe</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">observe</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> shallow<span class="token punctuation">,</span> ssrMockReactivity</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&amp;&amp;</span> <span class="token function">hasOwn</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>__ob__ <span class="token keyword">instanceof</span> <span class="token class-name">Observer</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> value<span class="token punctuation">.</span>__ob__<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldObserve <span class="token operator">&amp;&amp;</span>
          <span class="token punctuation">(</span>ssrMockReactivity <span class="token operator">||</span> <span class="token operator">!</span><span class="token function">isServerRendering</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">isPlainObject</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          Object<span class="token punctuation">.</span><span class="token function">isExtensible</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          <span class="token operator">!</span>value<span class="token punctuation">.</span>__v_skip <span class="token comment">/* ReactiveFlags.SKIP */</span> <span class="token operator">&amp;&amp;</span>
          <span class="token operator">!</span><span class="token function">isRef</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
          <span class="token operator">!</span><span class="token punctuation">(</span>value <span class="token keyword">instanceof</span> <span class="token class-name">VNode</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Observer</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> shallow<span class="token punctuation">,</span> ssrMockReactivity<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这里其实是做了一些判断，最终去new Observer,去看看Observer是什么：</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">var</span> Observer <span class="token operator">=</span> <span class="token doc-comment comment">/** <span class="token keyword">@class</span> */</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">function</span> <span class="token function">Observer</span><span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> shallow<span class="token punctuation">,</span> mock</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>shallow <span class="token operator">===</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> shallow <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>mock <span class="token operator">===</span> <span class="token keyword">void</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> mock <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value<span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>shallow <span class="token operator">=</span> shallow<span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>mock <span class="token operator">=</span> mock<span class="token punctuation">;</span>
          <span class="token comment">// this.value = value</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>dep <span class="token operator">=</span> mock <span class="token operator">?</span> mockDep <span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Dep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>vmCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
          <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token string">'__ob__'</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">if</span> <span class="token punctuation">(</span>hasProto<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                      value<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> arrayMethods<span class="token punctuation">;</span>
                      <span class="token comment">/* eslint-enable no-proto */</span>
                  <span class="token punctuation">}</span>
                  <span class="token keyword">else</span> <span class="token punctuation">{</span>
                      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> arrayKeys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                          <span class="token keyword">var</span> key <span class="token operator">=</span> arrayKeys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                          <span class="token function">def</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> arrayMethods<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                      <span class="token punctuation">}</span>
                  <span class="token punctuation">}</span>
              <span class="token punctuation">}</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>shallow<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">observeArray</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token doc-comment comment">/**
               * Walk through all properties and convert them into
               * getter/setters. This method should only be called when
               * value type is Object.
               */</span>
              <span class="token keyword">var</span> keys <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> keys<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                  <span class="token keyword">var</span> key <span class="token operator">=</span> keys<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                  <span class="token function">defineReactive</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> <span class="token constant">NO_INIITIAL_VALUE</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> shallow<span class="token punctuation">,</span> mock<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token doc-comment comment">/**
       * Observe a list of Array items.
       */</span>
      <span class="token class-name">Observer</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">observeArray</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> l <span class="token operator">=</span> value<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> l<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token function">observe</span><span class="token punctuation">(</span>value<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>mock<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> Observer<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这个Observer是一个立即执行函数，里面返回的Observer才是真正的Observer</li>
</ul>
<p>看一下调用堆栈，防晕：</p>
<p><img src="/images/initData-stack.png" alt="调用堆栈"></p>
<p>这个 Observer 会通过 isArray 判断 data 是数组还是对象：</p>
<h3 id="_1-是对象" tabindex="-1"><a class="header-anchor" href="#_1-是对象" aria-hidden="true">#</a> 1.是对象</h3>
<p>如果data是对象，会for循环遍历data所有key，然后每次遍历都会调用<code v-pre>defineReactive</code>方法， 他会循环对象定义响应式变化。</p>
<blockquote>
<p>点击跳转：<a href="/v2/reactive/defineReactive">defineReactive</a></p>
</blockquote>
<h3 id="_2-是数组" tabindex="-1"><a class="header-anchor" href="#_2-是数组" aria-hidden="true">#</a> 2.是数组</h3>
<p>如果<code v-pre>isArray</code>判断出来 data 是数组，会采用函数劫持和切片思想</p>
<!-- ## 响应式的原理

initState会调用initData,initData会调用proxy、defineReactive、def

Vue初始化时会调用initData()方法，方法内部会调用observe()方法对数据进行观测，observe()方法先判断data是否为对象，如果不是对象不进行观测。再判断是否已经被观测，没有被观测的话会new 一个Observer去观测对象。观测时又分为两种，对象的观测和数组的观测。

**如果观测的是对象:**

就会遍历所有对象并调用defineReactive方法，defineReactive方法会判断如果观测的值还是一个对象，会重新调用observe方法进行递归观测，然后使用object.definedProperty方法给属性添加get/set方法给属性定义响应式，如果数据被获取时，就会调用get方法，如果get方法被调用，就会收集点前的watcher，如果数据发生变化，就会调用set方法，判断数据是否和元数据一致，如果不一致就会调用notify方法就会通知视图更新。

**如果观测的是数组:**

就会调用protoAugment将原型链指向我们新定义的方法，当我们调用这些方法时，方法内部还是会调用原有的方法，但是会在最后会手动通知视图更新。操作个别的可能会新增数组的方法时，如果有新增的数据就会调用observeArray方法对数据进行观测，因为新增的数据也可能是对象，原理和对象相同。

流程： -->
<p><img src="/images/initData.png" alt="initData"></p>
</div></template>


