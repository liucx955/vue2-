<template><div><h1 id="最长递增子序列" tabindex="-1"><a class="header-anchor" href="#最长递增子序列" aria-hidden="true">#</a> 最长递增子序列</h1>
<h2 id="什么是最长递增子序列" tabindex="-1"><a class="header-anchor" href="#什么是最长递增子序列" aria-hidden="true">#</a> 什么是最长递增子序列？</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>从数组中选择一些数组成新数组，并且顺序和原数组一样，比如<code v-pre>[2,5,3]</code>就可以算是arr的一个子序列。</li>
<li>如果要求是递增子序列，则表明新数组右边的元素，一定要大于左边的元素，比如<code v-pre>[1,2,5]</code>就是一个递增子序列</li>
<li>我们要做的，就是要在所有递增子序列中，找到最长的那一个</li>
</ol>
<h2 id="为什么vue3要使用最长递增子序列" tabindex="-1"><a class="header-anchor" href="#为什么vue3要使用最长递增子序列" aria-hidden="true">#</a> 为什么vue3要使用最长递增子序列</h2>
<p>最长递增子序列是经典的动态规划算法，递增子序列的最长可以保证移动次数的最少</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> prev <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">]</span>

<span class="token keyword">var</span> next <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我要将上面的prev变成next，先找到了<code v-pre>[1, 2, 4, 5]</code>这个最长递增子序列，那么在倒序遍历的过程中，遇到 5、4、2、1 不动，遇到 6、3 移动即可，如下图所示：</p>
<p><img src="/images/longest-increasing-subsequence.webp" alt="图片"></p>
<p>只需移动两次，prev变成next，所以<strong>如何移动的问题就回到了求解最长递增子序列的问题</strong>。</p>
<h2 id="手写实现" tabindex="-1"><a class="header-anchor" href="#手写实现" aria-hidden="true">#</a> 手写实现</h2>
<p>我们要模拟的是vue3 中求递增子序列的问题，vue3里面要的结果是对应原数组的<strong>下标数组</strong>，比如：</p>
<p>如果原数组是[2, 7, 4, 5, 11]，该数组最长递增子序列为 [2, 4, 5, 11]，对应下标数组为 [0, 2, 3, 4],</p>
<p>不管怎样，实现方式上都是采用 <strong>贪心算法 + 二分查找</strong>。</p>
<p>接下来一步步实现：</p>
<h3 id="_1-简单实现" tabindex="-1"><a class="header-anchor" href="#_1-简单实现" aria-hidden="true">#</a> 1. 简单实现</h3>
<p><strong>先实现下标数组，只要求它在对应的元素在原数组中是递增的</strong></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getSequence</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token comment">// 原数组长度为0，没意义</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

  <span class="token comment">// 用来存放结果的数组</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// result数组的最后一个元素</span>
  <span class="token keyword">let</span> resultLast<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取result的最后一位元素</span>
    resultLast <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 如果arr[i]比“result最后一位下标对应的元素”更大，则把该i下标push到result里面</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>resultLast<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> data <span class="token operator">=</span>  <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ 0, 2, 3, 7, 8 ]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里拿到的是[ 0, 2, 3, 7, 8 ]，它确实是递增子序列，但不是最长，比如[2, 5, 6, 7, 11, 15]就比它长，接下来解决长度问题</p>
<h3 id="_2-保证最长" tabindex="-1"><a class="header-anchor" href="#_2-保证最长" aria-hidden="true">#</a> 2. 保证最长</h3>
<p>上面代码中：我们每次的 arr[i] 只和 arr[resultLast]  比较，如果要实现“<strong>最长</strong>”，肯定是要和result的所有下标比较才合理。</p>
<p>所以如果 arr[i] 比 arr[resultLast] 小，那就在 result 中，<strong>从左到右 ，找到第一个比 arr[i] 大的元素</strong>，然后决定要不要替换它。</p>
<p>我们使用<strong>二分查找</strong>来找到<strong>第一个比 arr[i] 大的元素</strong></p>
<blockquote>
<p>点击跳转：<a href="/v2/algorithm/dichotomy">二分查找</a></p>
</blockquote>
<blockquote>
<p>点击跳转：<RouterLink to="/v2/template/ast.html#%E4%BB%80%E4%B9%88%E6%98%AF%E6%8C%87%E9%92%88">什么是指针</RouterLink></p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getSequence</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> len <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
  <span class="token comment">// 原数组长度为0，没意义</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

  <span class="token comment">// 定义三个指针</span>
  <span class="token keyword">let</span> start<span class="token punctuation">;</span>
  <span class="token keyword">let</span> end<span class="token punctuation">;</span>
  <span class="token keyword">let</span> middle<span class="token punctuation">;</span>

  <span class="token comment">// 用来存放结果的数组</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token comment">// result数组的最后一个元素</span>
  <span class="token keyword">let</span> resultLast<span class="token punctuation">;</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取result的最后一位元素</span>
    resultLast <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 如果arr[i]比“result最后一位下标对应的元素”更大，则把该i下标push到result里面</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> arr<span class="token punctuation">[</span>resultLast<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">continue</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 否则，使用二分查找</span>
    start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    end <span class="token operator">=</span> result<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token comment">// 退出下面这个循环的</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>start <span class="token operator">&lt;</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      middle <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span><span class="token punctuation">(</span>start <span class="token operator">+</span> end<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>result<span class="token punctuation">[</span>middle<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        start <span class="token operator">=</span> middle <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        end <span class="token operator">=</span> middle<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// while 循环结束后，start 和 end 会指向同一个元素</span>
    <span class="token comment">// 这里使用贪心算法，保留arr[i]和arr[result[end]]中更小的值的下标</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;=</span> arr<span class="token punctuation">[</span>result<span class="token punctuation">[</span>end<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result<span class="token punctuation">[</span>end<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 9, 5, 6, 7, 8]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，我们定义了 start，end 和 middle 三个指针，不断进行二分查询，中间元素 middle 小于 arr[i]，说明 arr[i] 较大，区间换成[middle + 1, end]; 否则说明，中间元素 middle 大于等于 arrI，说明 arrI 较小，区间换成 [start, middle]， 如此循环，直至 start ≥ end 为止，二分找到某一项刚好大于当前项，此时 start 和 end 指针应该是指向同一个元素下标，然后用当前元素替换掉二分找到的那一项。</p>
<p>这里拿到的结果是[2, 4, 6, 7, 11, 15]， 发现顺序有问题，这是由于贪心算法，我们每次都寻求局部最优解，结果就可能导致最终结果出现偏差。</p>
<h3 id="_3-回溯修正" tabindex="-1"><a class="header-anchor" href="#_3-回溯修正" aria-hidden="true">#</a> 3. 回溯修正</h3>
<p>要想得到正确的序列，首先要对上面的代码做一些改动</p>
<ul>
<li>增加chain变量，存放每一位在被加入到result时其对应的前一位的下标值，进行关系绑定</li>
<li>回溯chain，覆盖result的值。因为result内，最后一位一定是正确的，所以可以从后往前进行修正</li>
</ul>
<p>chain的作用：
前面说过，子序列的顺序是必须要和原数组相同的，那么在是需要有一种方法去保存原来顺序的：</p>
<p>比如<code v-pre>2, 8, 9</code>，你可以想象成<code v-pre>9-&gt; 8-&gt; 2</code>， 它们是强绑定的，9前面永远是8, 8前面永远是2</p>
<ul>
<li>如果此时遇到了 5 ，会变成 <code v-pre>2, 5, 9</code>，但是<code v-pre>9-&gt; 8-&gt; 2</code>这个绑定关系依然不变</li>
<li>这个时候如果我们回溯， <code v-pre>2, 5, 9</code>又会变回<code v-pre>2, 8, 9</code></li>
<li>什么时候我们会留下 5 呢，那就是在 5 后面的值都被替换的情况下，比如后面又遇到了 6 ,这个时候就变成了 <code v-pre>2, 5, 6</code>, 这个时候绑定关系就变成了<code v-pre>6-&gt; 5 -&gt;2</code></li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>      <span class="token keyword">function</span> <span class="token function">getSequence</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> length <span class="token operator">=</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

        <span class="token comment">// 描述最长递增子序列的数组，元素是递增元素对应的下标</span>
        <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token comment">// result 最后一个元素</span>
        <span class="token keyword">let</span> resultLast<span class="token punctuation">;</span>

        <span class="token keyword">let</span> start<span class="token punctuation">;</span>
        <span class="token keyword">let</span> end<span class="token punctuation">;</span>
        <span class="token keyword">let</span> middle<span class="token punctuation">;</span>

        <span class="token keyword">let</span> chain <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> arrI <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>

          <span class="token comment">// 在 Vue 3 Diff 中，0 表示该新节点不在旧节点的中，是需要进行新增的节点</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>arrI <span class="token operator">!==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            resultLast <span class="token operator">=</span> result<span class="token punctuation">[</span>result<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>arrI <span class="token operator">></span> arr<span class="token punctuation">[</span>resultLast<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
              chain<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> resultLast<span class="token punctuation">;</span>
              <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            end <span class="token operator">=</span> result<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>

            <span class="token keyword">while</span> <span class="token punctuation">(</span>start <span class="token operator">&lt;</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              middle <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>start <span class="token operator">+</span> end<span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// 或者 middle = Math.floor((start + end) / 2);</span>

              <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>result<span class="token punctuation">[</span>middle<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> arrI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                start <span class="token operator">=</span> middle <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                end <span class="token operator">=</span> middle<span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// while 循环结束后，start 和 end 会指向同一个元素</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">[</span>result<span class="token punctuation">[</span>end<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">></span> arrI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              result<span class="token punctuation">[</span>end<span class="token punctuation">]</span> <span class="token operator">=</span> i<span class="token punctuation">;</span>
              chain<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> result<span class="token punctuation">[</span>end <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">let</span> i <span class="token operator">=</span> result<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
        <span class="token keyword">let</span> last <span class="token operator">=</span> result<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token comment">// 回溯修正</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i<span class="token operator">--</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          result<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> last<span class="token punctuation">;</span>
          last <span class="token operator">=</span> chain<span class="token punctuation">[</span>last<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> res <span class="token operator">=</span> <span class="token function">getSequence</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 4, 5, 6, 7, 8]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


