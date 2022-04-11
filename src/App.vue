<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, reactive } from 'vue'
// import '../lib/style.css'
// import ClassifyTree from '../lib/classification-tree.es'
import ClassifyTree from './components/classify-tree/classify-tree.vue'
const list: ClassificationNode[] = [
	{
		label: '分类',
		key: 0,
		slotScope: 'rootNode',
		connectLineOption: {
			showArrow: true,
			lineColor: 'blue',
			lineHeight: '40px',
		},
		children: [
			{
				label: '节点1',
				key: 1,
				connectLineOption: {
					showArrow: true,
				},
				children: [
					{
						label: '节点11',
						key: 11,
						connectLineOption: {
							lineColor: 'red',
						},
					},
					{
						label: '节点12',
						key: 12,
						connectLineOption: {
							lineColor: '#158468',
						},
					},
					{
						label: '节点13',
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
]
type ClassificationNode = {
	label?: string
	key?: number
	slotScope?: string
	children?: ClassificationNode[]
	connectLineOption?: {
		lineHeight?: string
		showArrow?: boolean
		lineColor?: string
		lineWidth?: string
	}
}
const nodeList = reactive(list)

function addClassify(parent: ClassificationNode) {
	const newTag = {
		label: '新标签',
		key: new Date().getTime(),
		slotScope: 'newTag',
	}
	if (parent.children) {
		parent.children.push(newTag)
	} else {
		parent.children = [newTag]
	}
}

function removeClassify(parent: ClassificationNode, node: ClassificationNode): void {
	const index = parent?.children?.findIndex((item) => item.key === node.key)
	if (index) {
		parent?.children?.splice(index, 1)
	}
}
</script>

<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<ClassifyTree :nodeList="nodeList">
		<template #default="{ node, parent }">
			<div class="classify-item">
				<div class="classify-label">
					{{ node.label }}
				</div>
				<div class="classify-option">
					<button @click="addClassify(node)">+</button><button @click="removeClassify(parent, node)">删除</button>
				</div>
			</div>
		</template>
		<template #rootNode="{ node }">
			<div class="classify-item root-node">
				<div class="classify-label">
					{{ node.label }}
				</div>
				<div class="classify-option" @click="addClassify(node)">增加分类</div>
			</div>
		</template>
		<template #newTag="{ node, parent }">
			<div class="classify-item new-tag">
				<div class="classify-label">
					{{ node.label }}
				</div>
				<div class="classify-option">
					<button @click="addClassify(node)">+</button><button @click="removeClassify(parent, node)">删除</button>
				</div>
			</div>
		</template>
	</ClassifyTree>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

.classify-item {
	max-width: 100px;
	border: 3px solid #8d0c1b;
	border-radius: 5px;
	.classify-label {
		padding: 5px 10px;
		font-size: 20px;
		font-weight: bold;
		word-break: break-all;
		white-space: normal;
	}
	.classify-option {
		padding: 5px;
		display: flex;
		justify-content: space-around;
		background-color: rgb(0, 204, 255);
		cursor: pointer;
		.delete-btn {
			color: #ff7787;
		}
		.more-trgger-btn {
			color: #fff;
		}
	}
}
.root-node {
	padding: 10px;
	border: 3px solid #28d4cbe6;
	border-radius: 40%;
	overflow: hidden;
	.classify-label {
	}
	.classify-option {
		border-radius: 10px;
		background-color: rgb(157, 0, 255);
	}
}
.new-tag {
	border: 3px solid #d46428e6;
	input {
		width: 80%;
	}
	.classify-option {
		background-color: rgba(0, 179, 255, 0.251);
	}
}
</style>
