<template><div><h1 id="new-vue-发生了什么" tabindex="-1"><a class="header-anchor" href="#new-vue-发生了什么" aria-hidden="true">#</a> new Vue()发生了什么</h1>
<h2 id="vue构造函数" tabindex="-1"><a class="header-anchor" href="#vue构造函数" aria-hidden="true">#</a> Vue构造函数</h2>
<p>引入Vue后打印一下,发现Vue函数长这样</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>ƒ <span class="token function">Vue</span><span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vue</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn$2</span><span class="token punctuation">(</span><span class="token string">'Vue is a constructor and should be called with the `new` keyword'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里只有两步操作：</p>
<ol>
<li>判断你有没有使用<code v-pre>new</code>关键字调用，如果你直接调用Vue函数，他会报错说： “这是一个构造函数，请使用new关键字”。</li>
<li>调用实例身上的 <code v-pre>_init</code> 方法，传入配置对象。</li>
</ol>
<p>配置对象就是我们new Vue的时候传入的那个对象，比如:</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">el</span><span class="token operator">:</span><span class="token string">"#app"</span><span class="token punctuation">,</span>
    <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token parameter">h</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="new-vue之前" tabindex="-1"><a class="header-anchor" href="#new-vue之前" aria-hidden="true">#</a> new Vue之前</h3>
<p>Vue函数中，<code v-pre> this._init(options)</code>中的**_init**从哪里来？</p>
<p>在chome里面调试源代码，找到这样的一个函数：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token keyword">function</span> <span class="token function">initMixin$1</span><span class="token punctuation">(</span><span class="token parameter">Vue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">_init</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">var</span> vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
			
         <span class="token comment">// 省略多行代码</span>
          
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原来，它是被一个叫<code v-pre>initMixin$1</code>的函数加在Vue原型上面的，那么这个<code v-pre>initMixin$1</code>必然是在new Vue() 之前执行的，可是我们明明没有调用它啊？</p>
<p>只有一种可能，他是在<strong>引入Vue</strong>的时候就执行了，果然，在源码中发现了这些代码：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>  <span class="token comment">//@ts-expect-error Vue has function type</span>
  <span class="token function">initMixin$1</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//@ts-expect-error Vue has function type</span>
  <span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//@ts-expect-error Vue has function type</span>
  <span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//@ts-expect-error Vue has function type</span>
  <span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">//@ts-expect-error Vue has function type</span>
  <span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不仅如此，在引入Vue的时候还执行了很多代码，比如：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>Vue<span class="token punctuation">.</span>set <span class="token operator">=</span> set<span class="token punctuation">;</span>
Vue<span class="token punctuation">.</span>delete <span class="token operator">=</span> del<span class="token punctuation">;</span>
Vue<span class="token punctuation">.</span>nextTick <span class="token operator">=</span> nextTick<span class="token punctuation">;</span>

<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$off</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span> xxx <span class="token punctuation">}</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$emit</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> xxx <span class="token punctuation">}</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$set <span class="token operator">=</span> set<span class="token punctuation">;</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$<span class="token keyword">delete</span> <span class="token operator">=</span> del<span class="token punctuation">;</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$watch</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">expOrFn<span class="token punctuation">,</span> cb<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span><span class="token punctuation">{</span> xxx <span class="token punctuation">}</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$nextTick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span><span class="token punctuation">{</span> xxx <span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些方法有些是直接添加在Vue上面，有的则是添加在Vue原型上面以便给组件实例使用。</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>所以，<strong>为什么Vue可以调用nextTick、component等方法，为什么组件可以通过this调用$emit、$nextTick、</strong></p>
<p><strong>$set方法？</strong></p>
<p>因为在new Vue之前，源码里面就已经把这些方法加到Vue的自己身上或者显式原型上了</p>
</div>
<h2 id="init初始化函数" tabindex="-1"><a class="header-anchor" href="#init初始化函数" aria-hidden="true">#</a> _init初始化函数</h2>
<p>在打断点执行执行 _init 的函数的时候，发现了这些代码：</p>
<p><img src="/images/newvue-init.png" alt="newVue"></p>
<p>可以看到，<strong>Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，调用beforeCreate钩子，初始化 data、props、computed、watcher ，调用create钩子。</strong></p>
<p>接下来逐个解读：</p>
<h3 id="_1-options" tabindex="-1"><a class="header-anchor" href="#_1-options" aria-hidden="true">#</a> 1. $options</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>vm<span class="token punctuation">.</span>$options <span class="token operator">=</span> <span class="token function">mergeOptions</span><span class="token punctuation">(</span><span class="token function">resolveConstructorOptions</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>constructor<span class="token punctuation">)</span><span class="token punctuation">,</span> options <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>代码其实很简单，就是把 vm 配置项全部加到 vm的 $options 上面，然后又把，把自己也添加到$options.vm上面，也就是<strong>合并配置</strong>。</p>
<h3 id="_2-initlifecycle" tabindex="-1"><a class="header-anchor" href="#_2-initlifecycle" aria-hidden="true">#</a> 2. initLifecycle</h3>
<p>初始化生命周期方法主要做的事情是关联父子组件，给 vm 添加一些像<code v-pre>$parent</code>、<code v-pre>$children </code>,<code v-pre>$refs</code>之类的属性，和生命周期钩子无关。</p>
<h3 id="_3-initevents" tabindex="-1"><a class="header-anchor" href="#_3-initevents" aria-hidden="true">#</a> 3. initEvents</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initEvents</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 创建了一个保存事件的对象</span>
  vm<span class="token punctuation">.</span>_events <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  vm<span class="token punctuation">.</span>_hasHookEvent <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token comment">// 初始化父附加事件</span>
  <span class="token keyword">const</span> listeners <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_parentListeners
  <span class="token keyword">if</span> <span class="token punctuation">(</span>listeners<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">updateComponentListeners</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> listeners<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化事件先定义了两个变量，然后判断是否存在父组件的附加事件，这个具体是做什么的暂时还不知道，后面再看。</p>
<h3 id="_4-initrender" tabindex="-1"><a class="header-anchor" href="#_4-initrender" aria-hidden="true">#</a> 4. initRender</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initRender</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>_vnode <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 子树的根节点</span>
  vm<span class="token punctuation">.</span>_staticTrees <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// v-once 缓存树</span>
  <span class="token keyword">const</span> options <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">const</span> parentVnode <span class="token operator">=</span> vm<span class="token punctuation">.</span>$vnode <span class="token operator">=</span> options<span class="token punctuation">.</span>_parentVnode <span class="token comment">// 父树中的占位符节点</span>
  <span class="token keyword">const</span> renderContext <span class="token operator">=</span> parentVnode <span class="token operator">&amp;&amp;</span> parentVnode<span class="token punctuation">.</span>context
  <span class="token comment">// 处理slot</span>
  vm<span class="token punctuation">.</span>$slots <span class="token operator">=</span> <span class="token function">resolveSlots</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>_renderChildren<span class="token punctuation">,</span> renderContext<span class="token punctuation">)</span>
  vm<span class="token punctuation">.</span>$scopedSlots <span class="token operator">=</span> emptyObject
  <span class="token comment">// 给当前实例绑定一个createElement方法</span>
  <span class="token comment">// 这样我们就可以在其中获得适当的渲染上下文。</span>
  <span class="token comment">// 参数列表: tag, data, children, normalizationType, alwaysNormalize</span>
  <span class="token comment">// 内部版本由从模板编译的渲染函数使用</span>
  vm<span class="token punctuation">.</span><span class="token function-variable function">_c</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token comment">// 公开版本，用于用户编写渲染函数时使用</span>
  vm<span class="token punctuation">.</span><span class="token function-variable function">$createElement</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">createElement</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

   <span class="token comment">// $attrs 和 $listeners 用于更方便的创建高阶组件 HOC</span>
  <span class="token comment">// 它们需要是响应性的，这样使用它们的HOC才会始终得到更新</span>
  <span class="token keyword">const</span> parentData <span class="token operator">=</span> parentVnode <span class="token operator">&amp;&amp;</span> parentVnode<span class="token punctuation">.</span>data
  <span class="token function">defineReactive</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'$attrs'</span><span class="token punctuation">,</span> parentData <span class="token operator">&amp;&amp;</span> parentData<span class="token punctuation">.</span>attrs <span class="token operator">||</span> emptyObject<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token function">defineReactive</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token string">'$listeners'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>_parentListeners <span class="token operator">||</span> emptyObject<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>初始化渲染方法也是先定义了几个变量，然后处理了一下插槽，接着定义了两个变量用于引用创建虚拟<code v-pre>dom</code>节点的<code v-pre>createElement</code>方法，最后，给实例添加了两个响应性的属性<code v-pre>$attrs</code>、<code v-pre>$listeners</code>，<code v-pre>defineReactive</code>方法的实现我们放到下一篇去看。</p>
<h3 id="_5-触发beforecreate" tabindex="-1"><a class="header-anchor" href="#_5-触发beforecreate" aria-hidden="true">#</a> 5. 触发beforeCreate</h3>
<p><code v-pre>callHook(vm, 'beforeCreate')</code>这一段代码触发了beforeCreate函数，没什么好看的。注意在执行钩子函数里面的代码之前，他会先阻止收集依赖。</p>
<h3 id="_6-初始化依赖注入" tabindex="-1"><a class="header-anchor" href="#_6-初始化依赖注入" aria-hidden="true">#</a> 6. 初始化依赖注入</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initProvide</span> <span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> provide <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>provide
  <span class="token keyword">if</span> <span class="token punctuation">(</span>provide<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span>_provided <span class="token operator">=</span> <span class="token keyword">typeof</span> provide <span class="token operator">===</span> <span class="token string">'function'</span>
      <span class="token operator">?</span> <span class="token function">provide</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
      <span class="token operator">:</span> provide
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很简单，给<code v-pre>vue</code>实例添加了一个<code v-pre>_provided</code>属性，用来存放<code v-pre>provide</code>对象。</p>
<h3 id="_7-initstate" tabindex="-1"><a class="header-anchor" href="#_7-initstate" aria-hidden="true">#</a> 7. initState</h3>
<p><code v-pre>initState</code>里面就包含着<code v-pre>vue</code>的核心，数据观察：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initState</span><span class="token punctuation">(</span><span class="token parameter">vm</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  vm<span class="token punctuation">.</span>_watchers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token comment">// 声明了一个存放watcher的数组</span>
  <span class="token keyword">const</span> opts <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span> <span class="token function">initProps</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>props<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span> <span class="token function">initMethods</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>methods<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initData</span><span class="token punctuation">(</span>vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">observe</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>_data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span> <span class="token comment">/* asRootData */</span> <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span> <span class="token function">initComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>computed<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>opts<span class="token punctuation">.</span>watch <span class="token operator">&amp;&amp;</span> opts<span class="token punctuation">.</span>watch <span class="token operator">!==</span> nativeWatch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initWatch</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> opts<span class="token punctuation">.</span>watch<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一眼就能看出，这里处理了<code v-pre>props</code>、<code v-pre>methods</code>、<code v-pre>data</code>、<code v-pre>computed</code>、<code v-pre>watch</code>，一个一个来看：</p>
<h3 id="初始化props" tabindex="-1"><a class="header-anchor" href="#初始化props" aria-hidden="true">#</a> 初始化props</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initProps</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> propsOptions</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// propsData：创建实例时传递 props。主要作用是方便测试，只用于 new 创建的实例中</span>
  <span class="token keyword">const</span> propsData <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>propsData <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// 存储props</span>
  <span class="token keyword">const</span> props <span class="token operator">=</span> vm<span class="token punctuation">.</span>_props <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment">// 缓存prop的key，这样在后面更新prop时可以通过遍历数组，而不是枚举动态对象的属性</span>
  <span class="token keyword">const</span> keys <span class="token operator">=</span> vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>_propKeys <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">const</span> isRoot <span class="token operator">=</span> <span class="token operator">!</span>vm<span class="token punctuation">.</span>$parent
  <span class="token comment">// 根实例的props需要被观察</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 遍历所有prop</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> propsOptions<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    keys<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token comment">// 校验props，返回其默认值</span>
    <span class="token keyword">const</span> value <span class="token operator">=</span> <span class="token function">validateProp</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> propsOptions<span class="token punctuation">,</span> propsData<span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
    <span class="token function">defineReactive</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
    <span class="token comment">// 在Vue.extend（）期间，静态prop已在组件的原型上代理。我们只需要在这里代理实例化时定义的prop</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">proxy</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">_props</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token function">toggleObserving</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里的重点是 <code v-pre>proxy(vm, </code>_props<code v-pre>, key)</code></p>
<blockquote>
<p>点击跳转：<a href="/v2/reactive/proxy">proxy</a></p>
</blockquote>
<h3 id="初始化methods" tabindex="-1"><a class="header-anchor" href="#初始化methods" aria-hidden="true">#</a> 初始化methods</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initMethods</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> methods</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> methods<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">typeof</span> methods<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!==</span> <span class="token string">'function'</span> <span class="token operator">?</span> noop <span class="token operator">:</span> <span class="token function">bind</span><span class="token punctuation">(</span>methods<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">,</span> vm<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>initMethods</code>方法很简单，遍历所有<code v-pre>methods</code>,先判断是否是函数，是的话先绑定一下它的<code v-pre>this</code>到实例上面，然后也是给它添加为到vm的某个属性。</p>
<p>这里和props不同的是，props是因为代理才导致我们可以直接通过this.xxx拿到，而methods则是直接添加到vm上的属性。</p>
<h3 id="初始化data" tabindex="-1"><a class="header-anchor" href="#初始化data" aria-hidden="true">#</a> 初始化data</h3>
<p>这一段比较长，且涉及到响应式数据的原理</p>
<blockquote>
<p>点击跳转：<a href="/v2/reactive/initData">initData</a></p>
</blockquote>
<h3 id="初始化计算属性" tabindex="-1"><a class="header-anchor" href="#初始化计算属性" aria-hidden="true">#</a> 初始化计算属性</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initComputed</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> computed</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 保存用于计算属性的watcher</span>
  <span class="token keyword">const</span> watchers <span class="token operator">=</span> vm<span class="token punctuation">.</span>_computedWatchers <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> computed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 计算属性支持两种写法：普通函数、对象形式：{ get: Function, set: Function }</span>
    <span class="token keyword">const</span> userDef <span class="token operator">=</span> computed<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">const</span> getter <span class="token operator">=</span> <span class="token keyword">typeof</span> userDef <span class="token operator">===</span> <span class="token string">'function'</span> <span class="token operator">?</span> userDef <span class="token operator">:</span> userDef<span class="token punctuation">.</span>get

    <span class="token comment">// 创建一个内部的 watcher </span>
    watchers<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Watcher</span><span class="token punctuation">(</span>
      vm<span class="token punctuation">,</span>
      getter <span class="token operator">||</span> noop<span class="token punctuation">,</span>
      noop<span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">lazy</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span>

    <span class="token comment">// 组件定义的计算属性已在组件原型上定义。我们只需要在这里定义实例化时定义的计算属性。</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>key <span class="token keyword">in</span> vm<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">defineComputed</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> userDef<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以看到为每个计算属性都创建了一个<code v-pre>watcher</code>实例，<code v-pre>watcher</code>的作用我们后续再说，然后调用了<code v-pre>defineComputed</code>方法</p>
<p>xxx</p>
<h3 id="初始化watch" tabindex="-1"><a class="header-anchor" href="#初始化watch" aria-hidden="true">#</a> 初始化watch</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">initWatch</span><span class="token punctuation">(</span><span class="token parameter">vm<span class="token punctuation">,</span> watch</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> key <span class="token keyword">in</span> watch<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> handler <span class="token operator">=</span> watch<span class="token punctuation">[</span>key<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> handler<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> handler<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">createWatcher</span><span class="token punctuation">(</span>vm<span class="token punctuation">,</span> key<span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把用户定义的所有监视属性，传入<strong>createWatcher</strong>方法，然后创建watcher实例</p>
<p>xxx</p>
<h3 id="_8-挂载" tabindex="-1"><a class="header-anchor" href="#_8-挂载" aria-hidden="true">#</a> 8. 挂载</h3>
<p>最后，如果提供了<code v-pre>el</code>选项，那么会进行挂载：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    vm<span class="token punctuation">.</span><span class="token function">$mount</span><span class="token punctuation">(</span>vm<span class="token punctuation">.</span>$options<span class="token punctuation">.</span>el<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>挂载的内容</p>
<p>xxx</p>
</div></template>


