<template><div><h1 id="mustache模板引擎" tabindex="-1"><a class="header-anchor" href="#mustache模板引擎" aria-hidden="true">#</a> mustache模板引擎</h1>
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
<li>mustache的嵌入标记“{{ }}”非常像胡子，而Vue也是这种写法，这就是学习mustache的原因</li>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


