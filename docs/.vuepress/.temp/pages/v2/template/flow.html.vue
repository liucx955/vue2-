<template><div><h1 id="模版编译流程" tabindex="-1"><a class="header-anchor" href="#模版编译流程" aria-hidden="true">#</a> 模版编译流程</h1>
<p>模版的编译流程分为以下几步：</p>
<ol>
<li>解析模版字符串，生成AST抽象语法树</li>
<li>对AST进行优化，添加静态标记</li>
<li>使用diff算法复用模版</li>
<li>根据优化后的AST生成render函数</li>
</ol>
</div></template>


