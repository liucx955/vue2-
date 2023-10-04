# 最长递增子序列
## 什么是最长递增子序列？

```js
const arr = [1,6,7,2,4,5,3];
```
1. 从数组中选择一些数组成新数组，并且顺序和原数组一样，比如`[2,5,3]`就可以算是arr的一个子序列。
2. 如果要求是递增子序列，则表明新数组右边的元素，一定要大于左边的元素，比如`[1,2,5]`就是一个递增子序列
3. 我们要做的，就是要在所有递增子序列中，找到最长的那一个

## 为什么vue3要使用最长递增子序列
最长递增子序列是经典的动态规划算法，递增子序列的最长可以保证移动次数的最少
```js
var prev = [1, 2, 3, 4, 5, 6]

var next = [1, 3, 2, 6, 4, 5]
```
如果我要将上面的prev变成next，先找到了`[1, 2, 4, 5]`这个最长递增子序列，那么在倒序遍历的过程中，遇到 5、4、2、1 不动，遇到 6、3 移动即可，如下图所示：

![图片](/images/longest-increasing-subsequence.webp)

只需移动两次，prev变成next，所以**如何移动的问题就回到了求解最长递增子序列的问题**。

## 手写实现

我们要模拟的是vue3 中求递增子序列的问题，vue3里面要的结果是对应原数组的**下标数组**，比如：

如果原数组是[2, 7, 4, 5, 11]，该数组最长递增子序列为 [2, 4, 5, 11]，对应下标数组为 [0, 2, 3, 4],

不管怎样，实现方式上都是采用 **贪心算法 + 二分查找**。

接下来一步步实现：

### 1. 简单实现

**先实现下标数组，只要求它在对应的元素在原数组中是递增的**

```js
function getSequence(arr) {
  const len = arr.length;
  // 原数组长度为0，没意义
  if (len == 0) return;

  // 用来存放结果的数组
  const result = [0];
  // result数组的最后一个元素
  let resultLast;

  for (let i = 0; i < arr.length; i++) {
    // 获取result的最后一位元素
    resultLast = result.slice(-1)[0];

    // 如果arr[i]比“result最后一位下标对应的元素”更大，则把该i下标push到result里面
    if (arr[i] > arr[resultLast]) {
      result.push(i);
    }
  }
  return result;
}

const data =  [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];
const res = getSequence(data);
console.log(res); // [ 0, 2, 3, 7, 8 ]
```

这里拿到的是[ 0, 2, 3, 7, 8 ]，它确实是递增子序列，但不是最长，比如[2, 5, 6, 7, 11, 15]就比它长，接下来解决长度问题

### 2. 保证最长

上面代码中：我们每次的 arr[i] 只和 arr[resultLast]  比较，如果要实现“**最长**”，肯定是要和result的所有下标比较才合理。

所以如果 arr[i] 比 arr[resultLast] 小，那就在 result 中，**从左到右 ，找到第一个比 arr[i] 大的元素**，然后决定要不要替换它。

我们使用**二分查找**来找到**第一个比 arr[i] 大的元素**

> 点击跳转：[二分查找](/v2/algorithm/dichotomy)

> 点击跳转：[什么是指针](/v2/template/ast.html#什么是指针)

```js
function getSequence(arr) {
  const len = arr.length;
  // 原数组长度为0，没意义
  if (len == 0) return;

  // 定义三个指针
  let start;
  let end;
  let middle;

  // 用来存放结果的数组
  const result = [0];
  // result数组的最后一个元素
  let resultLast;

  for (let i = 0; i < arr.length; i++) {
    // 获取result的最后一位元素
    resultLast = result.slice(-1)[0];
    // 如果arr[i]比“result最后一位下标对应的元素”更大，则把该i下标push到result里面
    if (arr[i] > arr[resultLast]) {
      result.push(i);
      continue;
    }
    // 否则，使用二分查找
    start = 0;
    end = result.length;
    // 退出下面这个循环的
    while (start < end) {
      middle = Math.floor((start + end) / 2);
      if (arr[result[middle]] < arr[i]) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    
    // while 循环结束后，start 和 end 会指向同一个元素
    // 这里使用贪心算法，保留arr[i]和arr[result[end]]中更小的值的下标
    if (arr[i] <= arr[result[end]]) {
      result[end] = i;
    }
  }
  return result;
}

const data = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];
const res = getSequence(data);
console.log(res); // [1, 9, 5, 6, 7, 8]

```
可以看到，我们定义了 start，end 和 middle 三个指针，不断进行二分查询，中间元素 middle 小于 arr[i]，说明 arr[i] 较大，区间换成[middle + 1, end]; 否则说明，中间元素 middle 大于等于 arrI，说明 arrI 较小，区间换成 [start, middle]， 如此循环，直至 start ≥ end 为止，二分找到某一项刚好大于当前项，此时 start 和 end 指针应该是指向同一个元素下标，然后用当前元素替换掉二分找到的那一项。

这里拿到的结果是[2, 4, 6, 7, 11, 15]， 发现顺序有问题，这是由于贪心算法，我们每次都寻求局部最优解，结果就可能导致最终结果出现偏差。

### 3. 回溯修正
要想得到正确的序列，首先要对上面的代码做一些改动
* 增加chain变量，存放每一位在被加入到result时其对应的前一位的下标值，进行关系绑定
* 回溯chain，覆盖result的值。因为result内，最后一位一定是正确的，所以可以从后往前进行修正

chain的作用：
前面说过，子序列的顺序是必须要和原数组相同的，那么在是需要有一种方法去保存原来顺序的：

比如`2, 8, 9`，你可以想象成`9-> 8-> 2`， 它们是强绑定的，9前面永远是8, 8前面永远是2
* 如果此时遇到了 5 ，会变成 `2, 5, 9`，但是`9-> 8-> 2`这个绑定关系依然不变
* 这个时候如果我们回溯， `2, 5, 9`又会变回`2, 8, 9`
* 什么时候我们会留下 5 呢，那就是在 5 后面的值都被替换的情况下，比如后面又遇到了 6 ,这个时候就变成了 `2, 5, 6`, 这个时候绑定关系就变成了`6-> 5 ->2`

```js
      function getSequence(arr) {
        const length = arr.length;

        // 描述最长递增子序列的数组，元素是递增元素对应的下标
        const result = [0];
        // result 最后一个元素
        let resultLast;

        let start;
        let end;
        let middle;

        let chain = new Array(arr.length).fill(null);
        for (let i = 0; i < length; i++) {
          const arrI = arr[i];

          // 在 Vue 3 Diff 中，0 表示该新节点不在旧节点的中，是需要进行新增的节点
          if (arrI !== 0) {
            resultLast = result[result.length - 1];

            if (arrI > arr[resultLast]) {
              result.push(i);
              chain[i] = resultLast;
              continue;
            }

            start = 0;
            end = result.length - 1;

            while (start < end) {
              middle = ((start + end) / 2) | 0; // 或者 middle = Math.floor((start + end) / 2);

              if (arr[result[middle]] < arrI) {
                start = middle + 1;
              } else {
                end = middle;
              }
            }

            // while 循环结束后，start 和 end 会指向同一个元素
            if (arr[result[end]] > arrI) {
              result[end] = i;
              chain[i] = result[end - 1];
            }
          }
        }

        let i = result.length;
        let last = result[i - 1];

        // 回溯修正
        while (i-- > 0) {
          result[i] = last;
          last = chain[last];
        }
        return result;
      }
      const data = [3, 2, 8, 9, 5, 6, 7, 11, 15, 4];
      const res = getSequence(data);
      console.log(res); // [1, 4, 5, 6, 7, 8]
```





