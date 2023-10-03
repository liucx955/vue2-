
# patch函数和精细化比较
## patch函数是什么
* 在vue中，patch函数是一个将虚拟DOM转化为真实DOM的主函数，也是diff算法的主体函数
* 它可以接收四个参数，主要还是前两个
    * oldVnode：老的虚拟 DOM 节点
    * vnode：新的虚拟 DOM 节点
    * hydrating：是不是要和真实 DOM 混合，服务端渲染的话会用到，这里不过多说明
    * removeOnly：transition-group 会用到，这里不过多说明
## patch函数的流程
patch的源代码在vue2的`node_modules\vue\src\core\vdom\patch.ts`的801行

vue中patch函数的流程:
![patch](/images/patch.png)

patch函数带注释版：
```js
// 两个判断函数
function isUndef (v: any): boolean %checks {
  return v === undefined || v === null
}
function isDef (v: any): boolean %checks {
  return v !== undefined && v !== null
}
return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // 如果新的 vnode 不存在，但是 oldVnode 存在
    if (isUndef(vnode)) {
      // 如果 oldVnode 存在，调用 oldVnode 的组件卸载钩子 destroy
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []
    
    // 如果 oldVnode 不存在的话，新的 vnode 是肯定存在的，比如首次渲染的时候
    if (isUndef(oldVnode)) {
      isInitialPatch = true
      // 就创建新的 vnode
      createElm(vnode, insertedVnodeQueue)
    } else {
      // 剩下的都是新的 vnode 和 oldVnode 都存在的话
      
      // 是不是元素节点
      const isRealElement = isDef(oldVnode.nodeType)
      // 是元素节点 && 通过 sameVnode 对比是不是同一个节点 (函数后面有详解)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // 如果是 就用 patchVnode 进行后续对比 (函数后面有详解)
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        // 如果不是同一元素节点的话
        if (isRealElement) {
          // const SSR_ATTR = 'data-server-rendered'
          // 如果是元素节点 并且有 'data-server-rendered' 这个属性
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            // 就是服务端渲染的，删掉这个属性
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          // 这个判断里是服务端渲染的处理逻辑，就是混合
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn('这是一段很长的警告信息')
            }
          }
          // function emptyNodeAt (elm) {
          //    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
          //  }
          // 如果不是服务端渲染的，或者混合失败，就创建一个空的注释节点替换 oldVnode
          oldVnode = emptyNodeAt(oldVnode)
        }
        
        // 拿到 oldVnode 的父节点
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)
        
        // 根据新的 vnode 创建一个 DOM 节点，挂载到父节点上
        createElm(
          vnode,
          insertedVnodeQueue,
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )
        
        // 如果新的 vnode 的根节点存在，就是说根节点被修改了，就需要遍历更新父节点
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          // 递归更新父节点下的元素
          while (ancestor) {
            // 卸载老根节点下的全部组件
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor)
            }
            // 替换现有元素
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            // 更新父节点
            ancestor = ancestor.parent
          }
        }
        // 如果旧节点还存在，就删掉旧节点
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          // 否则直接卸载 oldVnode
          invokeDestroyHook(oldVnode)
        }
      }
    }
    // 返回更新后的节点
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
```

## 怎么证明是“同一个节点”
在patch函数里面，这一段调用了另一个函数sameVnode
```js
 if (!isRealElement && sameVnode(oldVnode, vnode)){
     xxx;
 }
```
sameVnode函数是这样的,总体上来看，是在比较key相等并且tag相等。
```js
function sameVnode (a, b) {
    return (
        a.key === b.key &&  // key 是不是一样
        a.asyncFactory === b.asyncFactory && ( // 是不是异步组件
            (
                a.tag === b.tag && // 标签是不是一样
                a.isComment === b.isComment && // 是不是注释节点
                isDef(a.data) === isDef(b.data) && // 内容数据是不是一样
                sameInputType(a, b) // 判断 input 的 type 是不是一样
            ) || (
                isTrue(a.isAsyncPlaceholder) && // 判断区分异步组件的占位符否存在
                isUndef(b.asyncFactory.error)
            )
        )
    )
}

```

## 是同一个节点怎么办
如果vnode和oldVnode是同一个虚拟节点，就调用patchVnode函数对比节点文本变化或子节点变化。

 1. 如果 oldVnode 和 vnode 的引用地址是一样的，就表示节点没有变化，直接返回
 2. 如果 oldVnode 的 isAsyncPlaceholder 存在，就跳过异步组件的检查，直接返回
 3. 如果 oldVnode 和 vnode 都是静态节点，并且有一样的 key，并且 vnode 是克隆节点或者 v-once 指令控制的节点时，把 oldVnode.elm 和 oldVnode.child 都复制到 vnode 上，然后返回
 4. 如果 vnode 不是文本节点也不是注释的情况下
    1. 如果 vnode 和 oldVnode 都有子节点，而且子节点不一样的话，就调用 updateChildren 更新子节点
    2. 如果只有 vnode 有子节点，就调用 addVnodes 创建子节点
    3. 如果只有 oldVnode 有子节点，就调用 removeVnodes 删除该子节点
    4. 如果 vnode 文本为 undefined，就删掉 vnode.elm 文本
 5. 如果 vnode 是文本节点但是和 oldVnode 文本内容不一样，就更新文本

## 子节点不一样怎么办
如果 vnode 和 oldVnode 都有子节点，且子节点不一样的时候，调用 updateChildren 函数进行子节点对比。

比如现在有两个子节点列表对比，对比主要流程如下：

循环遍历两个列表，循环停止条件是：其中一个列表的开始指针 startIdx 和 结束指针 endIdx 重合

循环内容是：

* 新前 对 旧前 
* 新后 对 旧后 
* 新后 对 旧前 
* 新前 对 旧后
