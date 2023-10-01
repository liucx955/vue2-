<template><div><h1 id="指针思想" tabindex="-1"><a class="header-anchor" href="#指针思想" aria-hidden="true">#</a> 指针思想</h1>
<h2 id="什么是指针" tabindex="-1"><a class="header-anchor" href="#什么是指针" aria-hidden="true">#</a> 什么是指针</h2>
<p><img src="/images/pointer.png" alt="image-20230930232352782"></p>
<ul>
<li>
<p>AST中的指针不是C语言的指针，其实就是下标位置，它的用法涉及到算法</p>
</li>
<li>
<p>指针算法意味着一种思想，是一种解决问题的方式。</p>
</li>
</ul>
<h2 id="使用指针" tabindex="-1"><a class="header-anchor" href="#使用指针" aria-hidden="true">#</a> 使用指针</h2>
<p>寻找字符串中，连续重复次数最多的字符:</p>
<p><strong>i 和 j</strong> 就是两个指针，具体实现代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 寻找字符串中，连续重复次数最多的字符</span>
<span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">"aaaaaabbbbbbbbcccccccccccccccccccddddd"</span><span class="token punctuation">;</span>

<span class="token comment">// 指针</span>
<span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> j <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> maxRepeat <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 最大重复次数</span>
<span class="token keyword">let</span> maxStr <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span> <span class="token comment">// 重复最多的字符串</span>

<span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> str<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 只要i和j字符串不同，就说明中间有重复</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">!==</span> str<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">和</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>j<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">之间重复了，都是</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">，重复了</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>j <span class="token operator">-</span> i<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">次</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">-</span> i <span class="token operator">></span> maxRepeat<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      maxRepeat <span class="token operator">=</span> j <span class="token operator">-</span> i<span class="token punctuation">;</span>
      maxStr <span class="token operator">=</span> str<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 让i追上j</span>
    i <span class="token operator">=</span> j<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 不管结果如何,j都要后移</span>
  j<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">计算完成，重复最多的字符串是</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>maxStr<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">,它重复了</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>maxRepeat<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">次</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>除了指针外，AST还用到了递归、栈等，这里不再细说</li>
</ul>
</div></template>


