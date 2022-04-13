# classification-tree

English | [简体中文](./README-zh_CN.md)

## introduce

This component is based on vue3. It is used to display the tree structure. Each tree node can be customized through slots. The display effect is as follows:  
default：  
![default](https://happypedestrian.github.io/classifycation-tree/images/default.jpg)

custom：  
![custom](https://happypedestrian.github.io/classifycation-tree/images/customer.jpg)

## [demo](https://happypedestrian.github.io/classifycation-tree/demo/index.html)

## install

```bash
$ npm install classification-tree -S
```

## use

```javascript
<script>
import 'classification-tree/lib/style.css'
import ClassifyTree from 'classification-tree'
import { defineComponent } from 'vue'
export default defineComponent({
	components: {
		ClassifyTree,
	},
  data() {
    return {
      nodeList: [
        {
          label: 'root',
          key: 0,
          slotScope: 'rootNode',
          connectLineOption: {
            showArrow: true,
            lineColor: 'blue',
            lineHeight: '40px',
          },
          children: [
            {
              label: 'node1',
              key: 1,
              connectLineOption: {
                showArrow: true,
              },
              children: [
                {
                  label: 'node11',
                  key: 11,
                  connectLineOption: {
                    lineColor: 'red',
                  },
                },
                {
                  label: 'node12',
                  key: 12,
                  connectLineOption: {
                    lineColor: '#158468',
                  },
                },
                {
                  label: 'node13',
                  key: 13,
                  slotScope: 'newTag',
                  connectLineOption: {
                    lineColor: 'rgba(255, 122, 75, 0.5)',
                  },
                },
              ],
            },
          ],
        },
      ],
      mode: 'vertical'
    }
  }
})
</script>
<template>
	<ClassifyTree :node-list="nodeList" :mode="mode" >
    <template #default="{ node, parent }">
			<div class="classify-item">
        default slot{{ node.label }}
      </div>
    </template>
    <template #rootNode="{ node, parent }">
			<div class="classify-item">
        root node {{ node.label }}
      </div>
    </template>
    <template #newTag="{ node, parent }">
			<div class="classify-item">
        new tag{{ node.label }}
      </div>
    </template>
  </ClassifyTree>
</template>
```

## classification-tree props

| props                  | description                                               | type                    | default                                                                    |
| ---------------------- | --------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------- |
| node-list              | tree node array                                           | ClassificationNode[]    | []                                                                         |
| mode                   | Parent-child node arrangement direction                   | 'horizon' \| 'vertical' | 'vertical'                                                                 |
| connectLineOption      | Connector display configuration of parent and child nodes | ConnectLineOption       | {lineHeight: '20px', showArrow: false, lineColor: 'black', lineWidth: '2'} |
| treeNodeProps          | Custom element node object attribute alias                | TreeNodeProps           | { label: 'label', children: 'children', key: 'key', }                      |
| expand                 | Expand button custom slot                                 | v-slot:data             | -                                                                          |
| Custom tree node slots | Tree node custom slot                                     | v-slot: {node, parent}  | -                                                                          |

## ClassificationNode Object

| attribute         | description                                               | type                 | default value |
| ----------------- | --------------------------------------------------------- | -------------------- | ------------- |
| label             | Node name (can be customized by 'treeNodeProps' prop)     | string               | ''            |
| key               | Node key (can be customized by 'treeNodeProps' prop)      | string               | ''            |
| children          | Node children (can be customized by 'treeNodeProps' prop) | ClassificationNode[] | undefined     |
| connectLineOption | Connector display configuration of the node               | ConnectLineOption    | undefined     |
| style             | The style used for this node div                          | Object               | {}            |
| class             | The class used for this node div                          | string               | ''            |
| expanded          | Expand node subarray                                      | boolean              | true          |
| slotScope         | Custom node slot name                                     | string               | 'default'     |
| ...               | other                                                     | -                    | -             |

## ConnectLineOption Object

| attribute  | description                                                                  | type    | default value |
| ---------- | ---------------------------------------------------------------------------- | ------- | ------------- |
| lineHeight | The height of the connecting line between the node and its child nodes       | string  | '20px'        |
| showArrow  | Does the connection line between the node and its child nodes display arrows | boolean | false         |
| lineColor  | The color of the connector between the node and its parent node              | string  | 'black'       |
| lineWidth  | The thickness of the connecting line between the node and its parent node    | string  | '2'           |
