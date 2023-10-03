<template><div><h1 id="mustache模板引擎" tabindex="-1"><a class="header-anchor" href="#mustache模板引擎" aria-hidden="true">#</a> Mustache模板引擎</h1>
<h2 id="为什么要学习mustache" tabindex="-1"><a class="header-anchor" href="#为什么要学习mustache" aria-hidden="true">#</a> 为什么要学习mustache</h2>
<ul>
<li>Mustache 是模板引擎思想的奠基者，Vue 中的模板引擎也借用了它的思想</li>
<li>Mustache里面的tokens是“抽象语法树”、“虚拟节点”等的开山鼻祖</li>
</ul>
<h2 id="模板引擎是什么" tabindex="-1"><a class="header-anchor" href="#模板引擎是什么" aria-hidden="true">#</a> 模板引擎是什么</h2>
<p>先做一个题目：</p>
<p>将下面数组转化成多个li标签:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'李四'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">88</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'王五'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">108</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于这个题目，我们有多个解决方案</p>
<p>比如:</p>
<ol>
<li>
<p>使用最原始的操作原生DOM的方法，遍历，创建节点，上树</p>
</li>
<li>
<p>使用数组中的join方法（曾经流行）</p>
</li>
<li>
<p>使用ES6模板字符串，直接生成一个字符串，最后添加innerHTML属性上，模板字符串可以换行，非常方便</p>
</li>
</ol>
<blockquote>
<p>在Vue中，我们使用v-for，我们使用很少的代码，很容易就能实现这个功能，就是因为它用到了<strong>mustache模板引擎</strong></p>
<p>所以，<strong>模板引擎是将数据变为视图最优雅的解决方式</strong></p>
</blockquote>
<h2 id="mustache是什么" tabindex="-1"><a class="header-anchor" href="#mustache是什么" aria-hidden="true">#</a> mustache是什么</h2>
<ul>
<li>mustache是模板引擎库的开山鼻祖，是早的模板引擎库</li>
<li>mustache的嵌入标记<code v-pre>{{ }}</code>非常像胡子，而Vue也是这种写法，这就是学习mustache的原因</li>
<li>对于上面那个题目，使用mustache库的写法是</li>
</ul>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code>  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token comment">&lt;!-- 引入Mustache --></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://cdn.bootcdn.net/ajax/libs/mustache.js/4.1.0/mustache.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
      <span class="token comment">// 定义模板</span>
    <span class="token keyword">const</span> templateStr <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
      &lt;ul id="list">
        {{#arr}}
        &lt;li>
          &lt;div class="hd">{{name}}的基本信息&lt;/div>
          &lt;div class="bd">
            &lt;p>姓名：{{name}}&lt;/p>
            &lt;p>年龄：{{age}}&lt;/p>
          &lt;/div>
        &lt;/li>
        {{/arr}}
      &lt;/ul>
    </span><span class="token template-punctuation string">`</span></span>
      <span class="token comment">// 定义数据</span>
   <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
         <span class="token literal-property property">arr</span> <span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'张三'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">18</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'李四'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">88</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'王五'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">108</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> domStr <span class="token operator">=</span> Mustache<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>templateStr<span class="token punctuation">,</span> data<span class="token punctuation">)</span>
    <span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'container'</span><span class="token punctuation">)</span>
    container<span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> domStr
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mustache如何运行" tabindex="-1"><a class="header-anchor" href="#mustache如何运行" aria-hidden="true">#</a> mustache如何运行</h2>
<h3 id="一个示例" tabindex="-1"><a class="header-anchor" href="#一个示例" aria-hidden="true">#</a> 一个示例</h3>
<p>最简单的替换<code v-pre>{{ }}</code>里面的内容的方法</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\{\{(\w+)\}\}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">thing</span><span class="token operator">:</span><span class="token string">"手机"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">mood</span><span class="token operator">:</span><span class="token string">"开心"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> templateStr <span class="token operator">=</span> <span class="token string">'&lt;h1>我买了一个{{thing}}，好{{mood}}的啊&lt;/h1>'</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>templateStr<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">findStr<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> index<span class="token punctuation">,</span> origin</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>findStr<span class="token punctuation">,</span> $1<span class="token punctuation">,</span> index<span class="token punctuation">,</span> origin<span class="token punctuation">)</span>
  <span class="token keyword">return</span> data<span class="token punctuation">[</span>$1<span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的代码中</p>
<ol>
<li>reg是正则表达式，用来匹配<code v-pre>{{ }}</code>并且捕获里面的内容</li>
<li>templateStr是模板字符串</li>
<li>replace可以将模板字符串中所有能被正则匹配的项，替换成函数的返回值</li>
<li>findStr表示被匹配的部分</li>
<li>$1表示第一个捕获组</li>
<li>index表示被匹配到的位置</li>
<li>origin表示原字符串</li>
</ol>
<p>最后的打印结果为：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>{{thing}} thing 9 &lt;h1>我买了一个{{thing}}，好{{mood}}的啊&lt;/h1>
{{mood}} mood 20 &lt;h1>我买了一个{{thing}}，好{{mood}}的啊&lt;/h1>
&lt;h1>我买了一个手机，好开心的啊&lt;/h1> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="核心机理" tabindex="-1"><a class="header-anchor" href="#核心机理" aria-hidden="true">#</a> 核心机理</h3>
<p>上面的示例中，只能实现最简单的替换，mustache的要做的远远不止这些，它还要遍历，实现嵌套结构</p>
<p>mustache库的机理大概是这样：
<img src="/images/mustache-core.png" alt="图片">
我们发现中间多出个 <span style="color:red;font-weight:bold;">tokens</span></p>
<p>token是一个js的嵌套的数组，大概长这样：
<img src="/images/mustache-tokens.png" alt="图片"></p>
<h2 id="mustache的不足" tabindex="-1"><a class="header-anchor" href="#mustache的不足" aria-hidden="true">#</a> mustache的不足</h2>
<p>mustache没有虚拟 DOM 和 diff 算法。它的主要功能是帮助开发者更方便地生成 HTML，而不是进行虚拟 DOM 的操作和 diff 算法的优化。数据发生变化时，它需要重新渲染整个模板。</p>
</div></template>


