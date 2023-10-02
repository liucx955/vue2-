# AST的介绍
## 抽象语法树是什么
* 抽象语法树是用来解析模版的，只要是模版解析的地方都会用到抽象语法树，比如babel

* 在vue里面，会将vue模版转成字符串，再将字符串转成AST，最后再转成正常的HTML语法

* 抽象语法树本次上是一个js对象

## AST的结构

```js
{
    tag:"div",
    attrs:[{name:"class",value:"box"}],
    type:1,
    children:[
        {
            tag:"h1",
            attrs:[{name:'class',value:"title"}],
            type:1,
            children:[{text:"我是一个标题",type:3}]
        }
    ]
}
```

AST包含以下属性:

1. tag    表示标签名
2. attrs    是attributes的缩写，代表属性，是一个数组
   1. name：attrs的属性名
   2. value：attrs的属性值
3. type：节点类型，1表示标签，3表示文本
4. children：表示子节点

## AST和虚拟DOM的关系
::: warning
注意：抽象语法树并不会直接变成虚拟DOM，而是直接变成**渲染函数**(render)，渲染函数接收一个h函数作为参数，
用于创建虚拟 DOM 元素
:::

> 关于h函数的知识，点击跳转：[h函数](/v2/template/hfunction)  

## AST和Mustache模板引擎的关系
* Vue的模板引擎借鉴了Mustache的思想
* AST只是模板引擎中的一部分

# 指针思想
## 什么是指针

![image-20230930232352782](/images/pointer.png)

* AST中的指针不是C语言的指针，其实就是下标位置，它的用法涉及到算法

* 指针算法意味着一种思想，是一种解决问题的方式。

## 使用指针

寻找字符串中，连续重复次数最多的字符:

**i 和 j** 就是两个指针，具体实现代码：

```js
// 寻找字符串中，连续重复次数最多的字符
let str = "aaaaaabbbbbbbbcccccccccccccccccccddddd";

// 指针
let i = 0;
let j = 1;

let maxRepeat = 0; // 最大重复次数
let maxStr = ""; // 重复最多的字符串

while (i < str.length) {
  // 只要i和j字符串不同，就说明中间有重复
  if (str[i] !== str[j]) {
    console.log(`${i}和${j}之间重复了，都是${str[i]}，重复了${j - i}次`);
    if (j - i > maxRepeat) {
      maxRepeat = j - i;
      maxStr = str[i];
    }
    // 让i追上j
    i = j;
  }
  // 不管结果如何,j都要后移
  j++;
}

console.log(`计算完成，重复最多的字符串是${maxStr},它重复了${maxRepeat}次`);


```

* 除了指针外，AST还用到了递归、栈等，这里不再细说

# AST实现原理
## 实现AST的思路
* 使用正则表达式来判断开始标签、结束标签、文字内容
* 使用指针来决定什么时候循环结束，每次处理完标签或一个文本后，指针就往后跳
* 使用两个栈来进行运算，当遇到 <>标签 时进栈，遇到 </>标签 出栈
   * 栈1 存储标签
   * 栈2 存储文字内容
* 标签里面的属性也要处理，处理成attrs数组

## 实现一个AST
* 把attrsString变为数组返回
```js
// 把attrsString变为数组返回
export function parseAttrsString (attrsString) {
    if (attrsString == undefined) return [];
    console.log(attrsString);
    // 当前是否在引号内
    var isYinhao = false
    // 断点
    var point = 0;
    // 结果数组
    var result = [];

    // 遍历attrsString，而不是你想的用split()这种暴力方法
    for (let i = 0; i < attrsString.length; i++) {
        let char = attrsString[i];
        if (char == '"') {
            isYinhao = !isYinhao;
        } else if (char == ' ' && !isYinhao) {
            // 遇见了空格，并且不在引号中
            console.log(i);
            if (!/^\s*$/.test(attrsString.substring(point, i))) {
                result.push(attrsString.substring(point, i).trim());
                point = i;
            }
        }
    }
    // 循环结束之后，最后还剩一个属性k="v"
    result.push(attrsString.substring(point).trim());

    // 下面的代码功能是，将["k=v","k=v","k=v"]变为[{name:k, value:v}, {name:k, value:v}, {name:k,value:v}];
    result = result.map(item => {
        // 根据等号拆分
        const o = item.match(/^(.+)="(.+)"$/);
        return {
            name: o[1],
            value: o[2]
        };
    });

    return result;
}

```
* 主要功能的实现
```js
// 引入parseAttrsString
import {parseAttrsString} from './parseAttrsString.js';

// parse函数，主函数
export default function (templateString) {
    // 指针
    var index = 0;
    // 剩余部分
    var rest = '';
    // 开始标记
    var startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    // 结束标记
    var endRegExp = /^\<\/([a-z]+[1-6]?)\>/;
    // 抓取结束标记前的文字
    var wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
    // 准备两个栈
    var stack1 = [];
    var stack2 = [{ 'children': [] }];

    while (index < templateString.length - 1) {
        rest = templateString.substring(index);
        // console.log(templateString[index]);
        if (startRegExp.test(rest)) {
            // 识别遍历到的这个字符，是不是一个开始标签
            let tag = rest.match(startRegExp)[1];
            let attrsString = rest.match(startRegExp)[2];
            // console.log('检测到开始标记', tag);
            // 将开始标记推入栈1中
            stack1.push(tag);
            // 将空数组推入栈2中
            stack2.push({ 'tag': tag, 'children': [], 'attrs': parseAttrsString(attrsString) });
            // 得到attrs字符串的长度
            const attrsStringLength = attrsString != null ? attrsString.length : 0;
            // 指针移动标签的长度加2再加attrString的长度，为什么要加2呢？因为<>也占两位
            index += tag.length + 2 + attrsStringLength;
        } else if (endRegExp.test(rest)) {
            // 识别遍历到的这个字符，是不是一个结束标签
            let tag = rest.match(endRegExp)[1];
            // console.log('检测到结束标记', tag);
            let pop_tag = stack1.pop();
            // 此时，tag一定是和栈1顶部的是相同的
            if (tag == pop_tag) {
                let pop_arr = stack2.pop();
                if (stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(pop_arr);
                }
            } else {
                throw new Error(pop_tag + '标签没有封闭！！');
            }
            // 指针移动标签的长度加3，为什么要加2呢？因为</>也占3位
            index += tag.length + 3;
        } else if (wordRegExp.test(rest)) {
            // 识别遍历到的这个字符，是不是文字，并别不能是全空
            let word = rest.match(wordRegExp)[1];
            // 看word是不是全是空
            if (!/^\s+$/.test(word)) {
                // 不是全是空 
                // console.log('检测到文字', word);
                // 改变此时stack2栈顶元素中
                stack2[stack2.length - 1].children.push({ 'text': word, 'type': 3 });
            }
            // 指针移动标签的长度加3，为什么要加2呢？因为</>也占3位
            index += word.length;
        } else {
            index++;
        }
    }

    // 此时stack2就是我们之前默认放置的一项了，此时要返回这一项的children即可
    return stack2[0].children[0];
};
```
