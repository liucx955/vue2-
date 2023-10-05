<template><div><h1 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> proxy</h1>
<p>vue2里的proxy是它自己定义的函数，并不是es6的proxy代理，</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> sourceKey<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  sharedPropertyDefinition<span class="token punctuation">.</span><span class="token function-variable function">get</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">proxyGetter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">[</span>sourceKey<span class="token punctuation">]</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  sharedPropertyDefinition<span class="token punctuation">.</span><span class="token function-variable function">set</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">proxySetter</span><span class="token punctuation">(</span><span class="token parameter">val</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">[</span>sourceKey<span class="token punctuation">]</span><span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> val
  <span class="token punctuation">}</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> sharedPropertyDefinition<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>以它处理<code v-pre>props</code>为例：</strong></p>
<ol>
<li>target 其实就是vm, sourceKey 就是_props，key就是每个 props 的名字。</li>
<li>写作proxy，实际做的是defineProperty的事情，也就是把<code v-pre>props</code> 代理到<code v-pre>_props</code>上面，也就是当我们访问<code v-pre>this.xxx</code>时，实际访问的是<code v-pre>this._props.xxx</code></li>
</ol>
</div></template>


