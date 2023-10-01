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