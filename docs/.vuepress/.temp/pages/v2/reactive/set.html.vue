<template><div><h1 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> $set</h1>
<p><strong>为什么this.$set可以添加响应式数据?</strong></p>
<p>在源码中，给Vue原型添加了$set，这就是我们可以调用<code v-pre>this.$set</code>拿到的原因:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$set <span class="token operator">=</span> set<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个set又是什么呢</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token operator">...</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReadonly</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">"Set operation on key \""</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token string">"\" failed: target is readonly."</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> ob <span class="token operator">=</span> target<span class="token punctuation">.</span>__ob__<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isArray</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isValidArrayIndex</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">.</span>length <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>target<span class="token punctuation">.</span>length<span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        target<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// when mocking for SSR, array methods are not hijacked</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ob <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>ob<span class="token punctuation">.</span>shallow <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">.</span>mock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">observe</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token keyword">in</span> target <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>_isVue <span class="token operator">||</span> <span class="token punctuation">(</span>ob <span class="token operator">&amp;&amp;</span> ob<span class="token punctuation">.</span>vmCount<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span>
            <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">'Avoid adding reactive properties to a Vue instance or its root $data '</span> <span class="token operator">+</span>
                <span class="token string">'at runtime - declare it upfront in the data option.'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ob<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        target<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
        <span class="token keyword">return</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token function">defineReactive</span><span class="token punctuation">(</span>ob<span class="token punctuation">.</span>value<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val<span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> ob<span class="token punctuation">.</span>shallow<span class="token punctuation">,</span> ob<span class="token punctuation">.</span>mock<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"add"</span> <span class="token comment">/* TriggerOpTypes.ADD */</span><span class="token punctuation">,</span>
            <span class="token literal-property property">target</span><span class="token operator">:</span> target<span class="token punctuation">,</span>
            <span class="token literal-property property">key</span><span class="token operator">:</span> key<span class="token punctuation">,</span>
            <span class="token literal-property property">newValue</span><span class="token operator">:</span> val<span class="token punctuation">,</span>
            <span class="token literal-property property">oldValue</span><span class="token operator">:</span> <span class="token keyword">undefined</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        ob<span class="token punctuation">.</span>dep<span class="token punctuation">.</span><span class="token function">notify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> val<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>在源码中首先判断set的目标是否是undefined和基本类型如果是undefined或基本类型就报错，</li>
<li>然后又判断了目标是否是数组与key是不是合法的index,合法的index是指值为大于等于0的整数，</li>
</ul>
<h3 id="如果target是数组" tabindex="-1"><a class="header-anchor" href="#如果target是数组" aria-hidden="true">#</a> 如果target是数组</h3>
<p>调用 target.splice(key, 1, val)，把用户新增的元素添加到相应位置，因为splice方法是被Vue重写过的，所以可以收集依赖和派发更新</p>
<h3 id="如果target是对象" tabindex="-1"><a class="header-anchor" href="#如果target是对象" aria-hidden="true">#</a> 如果target是对象</h3>
<ol>
<li>先判断用户添加属性是不是重复了（已经有该属性了），重复了直接返回</li>
<li>判断 target.<strong>ob</strong> 上面有没有 observe 实例，如果有，说明 target 本身就是个响应式对象，如果 target 完全是个普通对象，也是不能添加响应式数据的，直接返回</li>
<li>调用defineReactive定义属性添加 get 方法与 set 方法实现响应</li>
<li>然后手动调用dep里的 notify() 发布更新。</li>
</ol>
</div></template>


