# 二分查找
## 是什么
二分查找（Binary Search）是一种在有序数组中查找特定元素的搜索算法。在每一步，算法比较数组中间元素和目标值。如果两者相等，则查找成功并返回元素的位置。如果目标值小于中间元素，则在数组的左半部分继续查找；如果目标值大于中间元素，则在右半部分查找。这样，每次都能排除一半的搜索空间，从而显著减少了查找时间。

## 使用
以下是二分查找的JavaScript实现：
```js
// 在数组中找到第一个大于100的元素下标
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] > target) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return result;
}

const arr = [10, 30, 99, 100, 120, 140, 160];
const target = 100;

const index = binarySearch(arr, target);
console.log(index); // 输出：4

```
这个二分查找的函数首先设置了左右两个指针，然后开始循环。在每次循环中，都会计算中间元素的索引，并将其与目标值进行比较。如果中间元素小于目标值，那么就将左指针向右移动；如果中间元素大于目标值，那么就将右指针向左移动。
直到右指针到了左指针的左边，这个时候说明mid的下标就是要找的下标
