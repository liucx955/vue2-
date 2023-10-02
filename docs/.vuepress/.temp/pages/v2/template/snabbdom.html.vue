<template><div><h1 id="snabbdom" tabindex="-1"><a class="header-anchor" href="#snabbdom" aria-hidden="true">#</a> Snabbdom</h1>
<h2 id="为什么要学习snabbdom" tabindex="-1"><a class="header-anchor" href="#为什么要学习snabbdom" aria-hidden="true">#</a> 为什么要学习snabbdom</h2>
<ul>
<li>vue借鉴snabbdom.js进行开发。通过学习snabbdom库并手写其中的一些函数，有助于理解虚拟DOM和diff算法。</li>
<li>snabbdom代码量少，模块化，结构清晰。</li>
</ul>
<h2 id="snabbdom的功能" tabindex="-1"><a class="header-anchor" href="#snabbdom的功能" aria-hidden="true">#</a> snabbdom的功能</h2>
<p>在snabbdom中，它实现了一种称为patch的算法，该算法通过比较新旧两个虚拟DOM节点的差异，并只更新有差异的部分，而不是重新创建整个DOM树
，从而提高了渲染性能。</p>
</div></template>


