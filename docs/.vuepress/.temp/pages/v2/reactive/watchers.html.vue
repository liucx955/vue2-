<template><div><h1 id="_3个watcher" tabindex="-1"><a class="header-anchor" href="#_3个watcher" aria-hidden="true">#</a> 3个watcher</h1>
<ul>
<li>Watcher为依赖的代理执行者，每一个依赖都对应一个Watcher，收集依赖时收集Watcher就可以，触发依赖时通过Watcher去代理执行。</li>
<li>谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例。</li>
</ul>
<p>在Vue中，会遇到三种类型的watcher实例，他们分别为：</p>
<ul>
<li>renderWatcher：用于vue组件渲染</li>
<li>userWatcher：被监听的属性值变化后，执行对应的回调函数</li>
<li>computedWatcher：用于控制计算属性是否需要重新计算</li>
</ul>
<h2 id="renderwatcher" tabindex="-1"><a class="header-anchor" href="#renderwatcher" aria-hidden="true">#</a> renderWatcher</h2>
<p>在Vue原型上，有一个$mount方法</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">el<span class="token punctuation">,</span> hydrating</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
    <span class="token keyword">return</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>而<code v-pre>mountComponent</code>是这样的：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>$el <span class="token operator">=</span> el<span class="token punctuation">;</span>
    <span class="token operator">...</span>
    <span class="token function">callHook$1</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'beforeMount'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> updateComponent<span class="token punctuation">,</span> noop<span class="token punctuation">,</span> watcherOptions<span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token operator">...</span>
    vm<span class="token punctuation">.</span>_isMounted <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token function">callHook$1</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'mounted'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在new watcher的时候，如果最后一个参数为true，就说明是renderWatcher</p>
<h2 id="userwatcher" tabindex="-1"><a class="header-anchor" href="#userwatcher" aria-hidden="true">#</a> userWatcher</h2>
<h2 id="computedwatcher" tabindex="-1"><a class="header-anchor" href="#computedwatcher" aria-hidden="true">#</a> computedWatcher</h2>
</div></template>


