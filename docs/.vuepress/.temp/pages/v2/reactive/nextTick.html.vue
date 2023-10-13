<template><div><h1 id="nexttick" tabindex="-1"><a class="header-anchor" href="#nexttick" aria-hidden="true">#</a> nextTick</h1>
<p>Vue的DOM更新是异步的，异步更新的原因是为了性能优化，等待数据全部修改完后，集中一批更新DOM，再一次性地渲染。</p>
<p>Vue的nextTick方法设计的本意是为了解决DOM异步更新问题，提供一种机制让开发者可以在DOM更新完成后立即获取最新的DOM状态，并且可以用于满足实际应用中对DOM更新数据时机的后续逻辑处理。</p>
<p>Vue本身不推荐用户去操作DOM，</p>
<p>我们通常在修改数据之后，调用<code v-pre>this.$nextTick</code>去拿到页面的最新DOM，不然就会获取到旧的 DOM，这是什么原因呢？</p>
<h2 id="场景分析" tabindex="-1"><a class="header-anchor" href="#场景分析" aria-hidden="true">#</a> 场景分析</h2>
<p>在vue中，我使用了一个数据</p>
<div class="language-html line-numbers-mode" data-ext="html"><pre v-pre class="language-html"><code> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span>{{count}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>handleClick<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>click<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token function">data</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token function">handleClick</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10000</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我点击 button 按钮，count 会修改 10000 次，那么，页面上的DOM是不是也会修改10000次呢？</p>
<p>并不会。vue内部对其进行了优化，并不是数据改变就直接触发 watcher 的回调</p>
<h2 id="nexttick原理" tabindex="-1"><a class="header-anchor" href="#nexttick原理" aria-hidden="true">#</a> nextTick原理</h2>
<p>简单概述一下：</p>
<ul>
<li>vue 实现响应式并不是数据发生变化后 DOM 立即变化，而是按照一定策略异步执行 DOM 更新的</li>
<li>vue 在修改数据后，视图不会立刻进行更新，而是要等同一事件循环机制内所有数据变化完成后，再统一进行DOM更新</li>
<li>nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。</li>
</ul>
<p>详细分析：
vue全局有三个属性 flushing、waiting和pending ，flushing表示页面还在刷新，不能往队列加 watcher，waiting 表示现在不能执行 nextTick，pending 表示异步任务正在进行中，默认都是false</p>
<ol>
<li>只要一修改页面上的依赖数据，就会引发nextTick执行，跟修改的是哪个数据无关。</li>
<li>因为我们修改了数据，会触发属性上的setter，setter里面会执行 dep.notify()</li>
<li>dep.notify() 会遍历通知它所有的 watcher 执行自己的update方法</li>
<li>update 判断这个 watcher 是3中watcher中的哪一种，具体代码跳转：<RouterLink to="/v2/reactive/relative.html#watcher">Watcher</RouterLink></li>
<li>如果发现自己是 renderWatcher 或者 userWatcher ，并且 flushing为false ，会调用 queueWatcher，把自己添加到一个队列 queue 里</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">queueWatcher</span><span class="token punctuation">(</span><span class="token parameter">watcher</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> id <span class="token operator">=</span> watcher<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>watcher <span class="token operator">===</span> Dep<span class="token punctuation">.</span>target <span class="token operator">&amp;&amp;</span> watcher<span class="token punctuation">.</span>noRecurse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    has<span class="token punctuation">[</span>id<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>flushing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>watcher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// if already flushing, splice the watcher based on its id</span>
        <span class="token comment">// if already past its id, it will be run next immediately.</span>
        <span class="token keyword">var</span> i <span class="token operator">=</span> queue<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">></span> index <span class="token operator">&amp;&amp;</span> queue<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>id <span class="token operator">></span> watcher<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            i<span class="token operator">--</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        queue<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> watcher<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// queue the flush</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>waiting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        waiting <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">'production'</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>config<span class="token punctuation">.</span>async<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">flushSchedulerQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">nextTick</span><span class="token punctuation">(</span>flushSchedulerQueue<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>由于此时 waiting 是false，可以调用 nextTick，并把 waiting 设置为true，防止多次调用 nextTick</li>
<li>nextTick 里面传入了 flushSchedulerQueue</li>
<li>flushSchedulerQueue 作用是遍历执行所有 queue 里面的 watcher ，在它执行期间，会设置flushing = true，这时不能再添加watcher</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">flushSchedulerQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    flushing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token operator">...</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span>index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> queue<span class="token punctuation">.</span>length<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        watcher <span class="token operator">=</span> queue<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token operator">...</span>
        watcher<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9">
<li>queue 才加了一个watcher，你就遍历执行，那不是白费功夫吗，关键在 nextTick</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">nextTick</span><span class="token punctuation">(</span><span class="token parameter">cb<span class="token punctuation">,</span> ctx</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> _resolve<span class="token punctuation">;</span>
    callbacks<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>pending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        pending <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token function">timerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// $flow-disable-line</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cb <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> Promise <span class="token operator">!==</span> <span class="token string">'undefined'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            _resolve <span class="token operator">=</span> resolve<span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="10">
<li>nextTick 又用到了一个队列 callbacks，他会把 接收到的回调函数 cb 推到 callbacks里面</li>
<li>这个 cb 除了刚刚 flushSchedulerQueue 之外，还会接收到另外一种回调，那就是我们通过 this.$nextTick，传入的回调</li>
<li>nextTick 执行的时候，会调用timerFunc，timerFunc会启动一个异步任务。这个异步任务的功能，就是遍历执行 callbacks 里面所有的回调。
<ol>
<li>这个异步任务默认使用Promise</li>
<li>没有Promise就使用setImmediate</li>
<li>setImmediate再没有，就只能使用 setTimeout 了</li>
</ol>
</li>
</ol>
<p>注意：DOM更新是同步的，DOM渲染才是异步的，但因为 watcher 被加入到 callbacks 里面成为了微队列，导致DOM更新成了微任务，进而导致我们的同步代码拿不到最新 DOM 。所以，我们才需要调用 $nextTick，让我们的回调在更新DOM的 watcher 后面，这样就可以拿到新的DOM；</p>
</div></template>


