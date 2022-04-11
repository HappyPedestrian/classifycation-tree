# classification-tree

## 介绍

本组件基于 vue3。用于展示树形结构，每个树节点可通过插槽进行自定义。实现效果如下：  
默认：  
![默认](https://happypedestrian.github.io/classifycation-tree/images/default.jpg)

自定义：  
![默认](https://happypedestrian.github.io/classifycation-tree/images/customer.jpg)

## [demo](https://happypedestrian.github.io/classifycation-tree/demo/index.html)

## 安装

```node
npm install classification-tree -S
```

## 使用

```javascript
<script>
import 'classification-tree/style.css'
import ClassifyTree from 'classification-tree'
import { defineComponent } from 'vue'
export default defineComponent({
	components: {
		ClassifyTree,
	},
})
</script>
<template>
	<ClassifyTree />
</template>
```

## classification-tree props

| 参数                 | 说明                       | 类型                    | 默认值                                                                     |
| -------------------- | -------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| node-list            | 树节点数组                 | ClassificationNode[]    | []                                                                         |
| mode                 | 父子节点排列方向           | 'horizon' \| 'vertical' | 'vertical'                                                                 |
| connectLineOption    | 树组件连接线显示配置       | ConnectLineOption 对象  | {lineHeight: '20px', showArrow: false, lineColor: 'black', lineWidth: '2'} |
| treeNodeProps        | 自定义元素节点对象属性别名 | TreeNodeProps 对象      | { label: 'label', children: 'children', key: 'key', }                      |
| expand               | 展开按钮自定义插槽         | v-slot:data             | -                                                                          |
| 其它自定义树节点插槽 | 树节点自定义插槽           | v-slot: {node, parent}  | -                                                                          |

## 树节点对象 ClassificationNode

| 属性              | 说明                                      | 类型                 | 默认值    |
| ----------------- | ----------------------------------------- | -------------------- | --------- |
| label             | 节点名称（可通过 treeNodeProps 自定义）   | string               | ''        |
| key               | key 值（可通过 treeNodeProps 自定义）     | string               | ''        |
| children          | 子节点数组（可通过 treeNodeProps 自定义） | ClassificationNode[] | undefined |
| connectLineOption | 该节点连接线显示配置                      | ConnectLineOption    | undefined |
| style             | 节点 div 样式                             | Object               | {}        |
| class             | 用于节点 div 的类名                       | string               | ''        |
| expanded          | 节点子数组是否展开                        | boolean              | true      |
| slotScope         | 自定义节点插槽名                          | string               | 'default' |
| ...               | 其他                                      | -                    | -         |

## 连接线配置对象 ConnectLineOption

| 属性       | 说明                               | 类型    | 默认值  |
| ---------- | ---------------------------------- | ------- | ------- |
| lineHeight | 节点与其子节点的连接线高度         | string  | '20px'  |
| showArrow  | 节点与其子节点的连接线是否展示箭头 | boolean | false   |
| lineColor  | 节点与其父节点的连接线颜色         | string  | 'black' |
| lineWidth  | 节点与其父节点的连接线粗细         | string  | '2'     |
