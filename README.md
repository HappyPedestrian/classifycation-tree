# classification-tree

## 介绍

本组件基于 vue3。用于展示树形结构，每个树节点可通过插槽进行自定义。
实现效果如下：

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

| 参数              | 说明                   | 类型                    | 默认值                                                                     |
| ----------------- | ---------------------- | ----------------------- | -------------------------------------------------------------------------- |
| node-list         | 树节点数组             | ClassificationNode[]    | []                                                                         |
| mode              | 树组件显示方向         | 'horizon' \| 'vertical' | 'horizon'                                                                  |
| connectLineOption | 树组件连接线显示配置   | ConnectLineOption       | {lineHeight: '20px', showArrow: false, lineColor: 'black', lineWidth: '2'} |
| treeNodeProps     | 自定义元素节点属性别名 | treeNodeProps           | { label: 'label', children: 'children', key: 'key', }                      |
| expand            | 展开按钮自定义插槽     | v-slot:data             | -                                                                          |

## 树节点对象 ClassificationNode

| 参数              | 说明                                      | 类型                 | 默认值    |
| ----------------- | ----------------------------------------- | -------------------- | --------- |
| label             | 节点名称（可通过 treeNodeProps 自定义）   | string               | ''        |
| key               | key 值（可通过 treeNodeProps 自定义）     | string               | ''        |
| children          | 子节点数组（可通过 treeNodeProps 自定义） | ClassificationNode[] | undefined |
| connectLineOption | 该节点的连接线显示配置                    | ConnectLineOption    | undefined |
| style             | 节点 div 样式                             | Object               | {}        |
| class             | 用于节点 div 的类名                       | string               | ''        |
| expanded          | 节点子数组是否展开                        | boolean              | true      |
| slotScope         | 自定义节点插槽名                          | string               | 'default' |
| ...               | 其他                                      | -                    | -         |

## 连接线配置 ConnectLineOption

| 参数       | 说明         | 类型    | 默认值  |
| ---------- | ------------ | ------- | ------- |
| lineHeight | 连接线高度   | string  | '20px'  |
| showArrow  | 是否展示箭头 | boolean | false   |
| lineColor  | 线条颜色     | string  | 'black' |
| lineWidth  | 线条宽度     | string  | '2'     |
