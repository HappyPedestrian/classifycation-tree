<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import '../lib/style.css'
// import ClassifyTree from '../lib/classification-tree.es'
import ClassifyTree from './components/classify-tree/classify-tree.vue'
const list = [
	{
		label: '分类',
		key: 0,
		slotScope: 'rootNode',
		children: [
			{
				label: '节点1',
				key: 1,
				children: [
					{
						label: '节点11',
						key: 11,
					},
					{
						label: '节点12',
						key: 12,
					},
					{
						label: '节点13',
						key: 13,
						slotScope: 'newTag',
					},
				],
			},
		],
	},
]
const nodeList = ref(list)

function addClassify(parent) {
	const newTag = {
		label: '新标签',
		key: new Date().getTime(),
		// slotScope: 'newTag',
	}
	if (parent.children) {
		parent.children.push(newTag)
	} else {
		parent.children = [newTag]
	}
}
</script>

<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<ClassifyTree v-model:nodeList="nodeList">
		<template #default="data">
			<div class="classify-item">
				<div class="classify-label">
					{{ data.label }}
				</div>
				<div class="classify-option" @click="addClassify(data)">增加分类</div>
			</div>
		</template>
		<template #rootNode="data">
			<div class="classify-item root-node">
				<div class="classify-label">
					{{ data.label }}
				</div>
				<div class="classify-option" @click="addClassify(data)">增加分类</div>
			</div>
		</template>
		<template #newTag="data">
			<div class="classify-item new-tag">
				<div class="classify-label">
					<input v-model="data.label" />
				</div>
				<div class="classify-option">取消</div>
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
	border: 3px solid #28d4cbe6;
	.classify-label {
	}
	.classify-option {
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
