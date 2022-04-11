<!--
 * @Description: 树组件
 * @Author: Happy_Pedestrian
 * @Date: 2022-03-26 09:56:13
 * @LastEditTime: 2022-04-11 15:25:26
 * @LastEditors: Happy_Pedestrian
-->
<template>
	<div
		class="classify-tree-wraper"
		:class="mode === 'vertical' ? 'classify-tree-wraper-vertical' : mode === 'horizon' ? 'classify-tree-wraper-horizon' : null"
	>
		<transition-group name="tree">
			<ClassifyTreeNode
				v-for="(node, index) in nodeList"
				:node-data="node"
				:style="getChildStyle(index)"
				:mode="mode"
				:key="node[treeNodeProp.key]"
			>
			</ClassifyTreeNode>
		</transition-group>
	</div>
</template>

<script lang="ts">
import { defineComponent, toRefs, provide, ref } from 'vue'
import TemplateContainer from './assets/components/template-container.vue'
import { ClassificationNode, ConnectLineOption, TreeNodeProps, TreeNodeProp } from './assets/classify-tree-types'
import ClassifyTreeNode from './classify-tree-node.vue'

export default defineComponent({
	name: 'ClassifyTree',
	props: {
		nodeList: {
			default: (): ClassificationNode[] => {
				return []
			},
		},
		mode: {
			default: 'vertical', // 'horizon'
		},
		connectLineOption: {
			default: (): ConnectLineOption => ({}),
		},
		treeNodeProps: {
			default: (): TreeNodeProps => ({
				label: 'label',
				children: 'children',
				key: 'key',
			}),
		},
	},
	setup(props, context) {
		const { connectLineOption, treeNodeProps } = toRefs(props)
		const treeNodeProp: TreeNodeProp = {
			label: treeNodeProps.value?.label || 'label',
			children: treeNodeProps.value?.children || 'children',
			key: treeNodeProps.value?.key || 'key',
		}
		provide('slots', context.slots)
		provide('connectLineOption', connectLineOption)
		provide('treeNodeProp', treeNodeProp)
		return {
			treeNodeProp: ref(treeNodeProp),
		}
	},
	components: {
		ClassifyTreeNode,
		TemplateContainer,
	},
	data() {
		return {}
	},
	computed: {},
	watch: {},
	mounted() {},
	methods: {
		getChildStyle(index: number) {
			if (this.mode === 'vertical') {
				return { marginRight: index < this.nodeList.length - 1 ? '15px' : null }
			} else {
				return { marginBottom: index < this.nodeList.length - 1 ? '15px' : null }
			}
		},
	},
})
</script>

<style lang="less" scoped>
.classify-tree-wraper {
	// display: flex;
	// justify-content: center;
	// align-items: flex-start;
	width: 100%;
	overflow: auto;
	// flex-shrink: 0;
}
.classify-tree-wraper-vertical {
	display: inline-block;
	white-space: nowrap;
}
.classify-tree-wraper-horizon {
	// flex-direction: column;
	display: block;
}

.tree-move {
	transition: all 0.3s linear;
}
</style>
