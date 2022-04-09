<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import '../lib/style.css'
import ClassifyTree from '../lib/classification-tree.es'
// import ClassifyTree from './components/classify-tree/classify-tree.vue'
const nodeList = [
	{
		label: '1',
		key: 1,
		children: [
			{
				label: '11',
				key: 11,
			},
			{
				label: '12',
				key: 12,
			},
		],
	},
]
</script>

<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<ClassifyTree v-model:nodeList="nodeList"></ClassifyTree>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
