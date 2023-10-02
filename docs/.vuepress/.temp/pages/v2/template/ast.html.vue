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
<p>抽象语法树本次上是一个js对象</p>
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
<h2 id="ast和虚拟dom的关系" tabindex="-1"><a class="header-anchor" href="#ast和虚拟dom的关系" aria-hidden="true">#</a> AST和虚拟DOM的关系</h2>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>注意：抽象语法树并不会直接变成虚拟DOM，而是直接变成<strong>渲染函数</strong>(render)，渲染函数接收一个h函数作为参数，
用于创建虚拟 DOM 元素</p>
</div>
<blockquote>
<p>关于h函数的知识，点击跳转：<a href="/v2/template/hfunction">h函数</a></p>
</blockquote>
<h2 id="ast和mustache模板引擎的关系" tabindex="-1"><a class="header-anchor" href="#ast和mustache模板引擎的关系" aria-hidden="true">#</a> AST和Mustache模板引擎的关系</h2>
<ul>
<li>Vue的模板引擎借鉴了Mustache的思想</li>
<li>AST只是模板引擎中的一部分</li>
</ul>
<h1 id="指针思想" tabindex="-1"><a class="header-anchor" href="#指针思想" aria-hidden="true">#</a> 指针思想</h1>
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
<h1 id="ast实现原理" tabindex="-1"><a class="header-anchor" href="#ast实现原理" aria-hidden="true">#</a> AST实现原理</h1>
<h2 id="实现ast的思路" tabindex="-1"><a class="header-anchor" href="#实现ast的思路" aria-hidden="true">#</a> 实现AST的思路</h2>
<ul>
<li>使用正则表达式来判断开始标签、结束标签、文字内容</li>
<li>使用指针来决定什么时候循环结束，每次处理完标签或一个文本后，指针就往后跳</li>
<li>使用两个栈来进行运算，当遇到 &lt;&gt;标签 时进栈，遇到 &lt;/&gt;标签 出栈
<ul>
<li>栈1 存储标签</li>
<li>栈2 存储文字内容</li>
</ul>
</li>
<li>标签里面的属性也要处理，处理成attrs数组</li>
</ul>
<h2 id="实现一个ast" tabindex="-1"><a class="header-anchor" href="#实现一个ast" aria-hidden="true">#</a> 实现一个AST</h2>
<ul>
<li>把attrsString变为数组返回</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 把attrsString变为数组返回</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">parseAttrsString</span> <span class="token punctuation">(</span><span class="token parameter">attrsString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>attrsString <span class="token operator">==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>attrsString<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 当前是否在引号内</span>
    <span class="token keyword">var</span> isYinhao <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token comment">// 断点</span>
    <span class="token keyword">var</span> point <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 结果数组</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 遍历attrsString，而不是你想的用split()这种暴力方法</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> attrsString<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> char <span class="token operator">=</span> attrsString<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>char <span class="token operator">==</span> <span class="token string">'"'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            isYinhao <span class="token operator">=</span> <span class="token operator">!</span>isYinhao<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>char <span class="token operator">==</span> <span class="token string">' '</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isYinhao<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 遇见了空格，并且不在引号中</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\s*$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>attrsString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>point<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>attrsString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>point<span class="token punctuation">,</span> i<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                point <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 循环结束之后，最后还剩一个属性k="v"</span>
    result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>attrsString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>point<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 下面的代码功能是，将["k=v","k=v","k=v"]变为[{name:k, value:v}, {name:k, value:v}, {name:k,value:v}];</span>
    result <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 根据等号拆分</span>
        <span class="token keyword">const</span> o <span class="token operator">=</span> item<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^(.+)="(.+)"$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">name</span><span class="token operator">:</span> o<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">value</span><span class="token operator">:</span> o<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>主要功能的实现</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入parseAttrsString</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>parseAttrsString<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./parseAttrsString.js'</span><span class="token punctuation">;</span>

<span class="token comment">// parse函数，主函数</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">templateString</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 指针</span>
    <span class="token keyword">var</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token comment">// 剩余部分</span>
    <span class="token keyword">var</span> rest <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token comment">// 开始标记</span>
    <span class="token keyword">var</span> startRegExp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\&lt;([a-z]+[1-6]?)(\s[^\&lt;]+)?\></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    <span class="token comment">// 结束标记</span>
    <span class="token keyword">var</span> endRegExp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\&lt;\/([a-z]+[1-6]?)\></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    <span class="token comment">// 抓取结束标记前的文字</span>
    <span class="token keyword">var</span> wordRegExp <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^([^\&lt;]+)\&lt;\/[a-z]+[1-6]?\></span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    <span class="token comment">// 准备两个栈</span>
    <span class="token keyword">var</span> stack1 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> stack2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span> <span class="token string-property property">'children'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> templateString<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        rest <span class="token operator">=</span> templateString<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// console.log(templateString[index]);</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>startRegExp<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>rest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 识别遍历到的这个字符，是不是一个开始标签</span>
            <span class="token keyword">let</span> tag <span class="token operator">=</span> rest<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>startRegExp<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">let</span> attrsString <span class="token operator">=</span> rest<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>startRegExp<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// console.log('检测到开始标记', tag);</span>
            <span class="token comment">// 将开始标记推入栈1中</span>
            stack1<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>tag<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 将空数组推入栈2中</span>
            stack2<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">'tag'</span><span class="token operator">:</span> tag<span class="token punctuation">,</span> <span class="token string-property property">'children'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-property property">'attrs'</span><span class="token operator">:</span> <span class="token function">parseAttrsString</span><span class="token punctuation">(</span>attrsString<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 得到attrs字符串的长度</span>
            <span class="token keyword">const</span> attrsStringLength <span class="token operator">=</span> attrsString <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> attrsString<span class="token punctuation">.</span>length <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">// 指针移动标签的长度加2再加attrString的长度，为什么要加2呢？因为&lt;>也占两位</span>
            index <span class="token operator">+=</span> tag<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> attrsStringLength<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>endRegExp<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>rest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 识别遍历到的这个字符，是不是一个结束标签</span>
            <span class="token keyword">let</span> tag <span class="token operator">=</span> rest<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>endRegExp<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// console.log('检测到结束标记', tag);</span>
            <span class="token keyword">let</span> pop_tag <span class="token operator">=</span> stack1<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 此时，tag一定是和栈1顶部的是相同的</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">==</span> pop_tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">let</span> pop_arr <span class="token operator">=</span> stack2<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>stack2<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    stack2<span class="token punctuation">[</span>stack2<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>pop_arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>pop_tag <span class="token operator">+</span> <span class="token string">'标签没有封闭！！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 指针移动标签的长度加3，为什么要加2呢？因为&lt;/>也占3位</span>
            index <span class="token operator">+=</span> tag<span class="token punctuation">.</span>length <span class="token operator">+</span> <span class="token number">3</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>wordRegExp<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>rest<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 识别遍历到的这个字符，是不是文字，并别不能是全空</span>
            <span class="token keyword">let</span> word <span class="token operator">=</span> rest<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>wordRegExp<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// 看word是不是全是空</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^\s+$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>word<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 不是全是空 </span>
                <span class="token comment">// console.log('检测到文字', word);</span>
                <span class="token comment">// 改变此时stack2栈顶元素中</span>
                stack2<span class="token punctuation">[</span>stack2<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">'text'</span><span class="token operator">:</span> word<span class="token punctuation">,</span> <span class="token string-property property">'type'</span><span class="token operator">:</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 指针移动标签的长度加3，为什么要加2呢？因为&lt;/>也占3位</span>
            index <span class="token operator">+=</span> word<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            index<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 此时stack2就是我们之前默认放置的一项了，此时要返回这一项的children即可</span>
    <span class="token keyword">return</span> stack2<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>children<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


