<template><div><h1 id="ast实现原理" tabindex="-1"><a class="header-anchor" href="#ast实现原理" aria-hidden="true">#</a> AST实现原理</h1>
<h2 id="ast的思路" tabindex="-1"><a class="header-anchor" href="#ast的思路" aria-hidden="true">#</a> AST的思路</h2>
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


