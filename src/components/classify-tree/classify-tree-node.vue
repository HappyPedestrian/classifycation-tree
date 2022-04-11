<!--
 * @Description: 树节点
 * @Author: Happy_Pedestrian
 * @Date: 2022-03-26 09:41:34
 * @LastEditTime: 2022-04-11 15:24:10
 * @LastEditors: Happy_Pedestrian
-->
<template>
	<div
		class="classify-tree-node-wraper"
		:class="mode === 'vertical' ? 'classify-tree-node-wraper-vertical' : mode === 'horizon' ? 'classify-tree-node-wraper-horizon' : null"
	>
		<div
			class="classify-tree-node-content"
			ref="treeNodeRef"
			:class="
				mode === 'vertical' ? 'classify-tree-node-content-vertical' : mode === 'horizon' ? 'classify-tree-node-content-horizon' : null
			"
		>
			<div class="classify-tree-node" :style="nodeStyle" :class="nodeData.class" ref="treeNodeContentRef">
				<TemplateContainer
					v-if="slots && slots[nodeData.slotScope || 'default']"
					:template="slots[nodeData.slotScope || 'default']"
					:data="{ node: nodeData, parent }"
				></TemplateContainer>
				<slot v-else :name="nodeData.slotScope || 'default'" :data="{ node: nodeData, parent }">
					<div class="classify-tree-node-default">
						{{ nodeData[treeNodeProp.label] }}
					</div>
				</slot>
			</div>
			<div
				class="classify-tree-node-expand"
				:class="
					mode === 'vertical' ? 'classify-tree-node-expand-vertical' : mode === 'horizon' ? 'classify-tree-node-expand-horizon' : null
				"
				@click="onExpandClick"
			>
				<TemplateContainer
					v-if="slots && slots['expand'] && nodeData[treeNodeProp.children] && nodeData[treeNodeProp.children].length > 0"
					:template="slots['expand']"
					:data="nodeData.expanded"
				></TemplateContainer>
				<slot v-else-if="nodeData[treeNodeProp.children] && nodeData[treeNodeProp.children].length > 0" :data="expanded">
					<div class="classify-tree-node-expand-default">
						<span class="minus"></span>
						<span v-if="expanded === false" class="minus add"></span>
					</div>
				</slot>
			</div>

			<div
				class="diliver"
				v-if="showChildren"
				:class="mode === 'vertical' ? 'diliver-vertical' : mode === 'horizon' ? 'diliver-horizon' : null"
			>
				<svg :height="svgStyle.height" :width="svgStyle.width" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<path
						v-for="(path, i) in connectLinePaths"
						:d="path"
						:key="i"
						:stroke="(nodeChildrenConnectLineOption[i] && nodeChildrenConnectLineOption[i].lineColor) || 'black'"
						fill="transparent"
						:stroke-width="(nodeChildrenConnectLineOption[i] && nodeChildrenConnectLineOption[i].lineWidth) || 2"
						stroke-linecap="round"
					></path>
					<path
						v-for="(position, i) in arrowPositions"
						:key="i"
						:d="`M ${position} m 0 -4 l 3 -3 l -3 7 l -3 -7 l 3 3`"
						:stroke="(nodeChildrenConnectLineOption[i] && nodeChildrenConnectLineOption[i].lineColor) || 'black'"
						:fill="(nodeChildrenConnectLineOption[i] && nodeChildrenConnectLineOption[i].lineColor) || 'black'"
						stroke-width="0.2"
						:transform="mode === 'horizon' ? `rotate(-90, ${position})` : undefined"
						stroke-linejoin="miter"
					></path>
				</svg>
			</div>
			<transition name="child-contain-box" @after-leave="updateConnectLine" @after-enter="updateConnectLine">
				<div class="classify-tree-children" v-if="showChildren" ref="childNodesBoxRef">
					<transition-group name="children-box">
						<template v-for="(node, index) in nodeData[treeNodeProp.children]" :key="node[treeNodeProp.key]">
							<ClassifyTreeNode
								:node-data="node"
								:parent="nodeData"
								:style="getChildStyle(index)"
								:mode="mode"
								@updateConnectLine="mutationObserverCallback"
							>
							</ClassifyTreeNode>
						</template>
					</transition-group>
				</div>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, provide, inject, Slots, toRefs, ref } from 'vue'
import TemplateContainer from './assets/components/template-container.vue'
import { ClassificationNode, ConnectLineOption, TreeNodeProps, TreeNodeProp } from './assets/classify-tree-types'
import { createMutationObserver } from './assets/constants'

export default defineComponent({
	name: 'ClassifyTreeNode',
	props: {
		nodeData: {
			default: (): ClassificationNode => {
				return {
					label: '',
					key: '',
					slotScope: 'default',
					expanded: false,
				}
			},
		},
		parent: {
			default: (): ClassificationNode | null => {
				return null
			},
		},
		mode: {
			default: 'vertical', // 'horizon'
		},
	},
	setup(props, context) {
		const { nodeData } = toRefs(props)
		const slots = inject<Slots>('slots')
		const connectLineOption = inject<ConnectLineOption>('connectLineOption')
		const treeNodeProps = inject<TreeNodeProps>('treeNodeProp')
		const treeNodeProp: TreeNodeProp = {
			label: treeNodeProps?.label || 'label',
			children: treeNodeProps?.children || 'children',
			key: treeNodeProps?.key || 'children',
		}

		let nodeConnectLineOption: ConnectLineOption | undefined = {}
		if (nodeData?.value?.connectLineOption) {
			nodeConnectLineOption = {
				...nodeData?.value?.connectLineOption,
			}
		} else {
			nodeConnectLineOption = connectLineOption
		}

		provide('slots', slots || context.slots)
		provide<ConnectLineOption | undefined>('connectLineOption', nodeConnectLineOption)
		return {
			slots,
			nodeConnectLineOption: ref(nodeConnectLineOption),
			treeNodeProp: ref(treeNodeProp),
		}
	},
	components: {
		TemplateContainer,
	},
	data() {
		return {
			treeNodeElRect: {} as DOMRect,
			connectLinePaths: [] as string[],
			arrowPositions: [] as string[],
			svgStyle: {
				height: '0',
				width: '0',
			},
			mutationObserver: null as MutationObserver | null,
			expanded: false,
		}
	},
	computed: {
		nodeStyle(): any | null {
			if (typeof this.nodeData.style === 'object') {
				return {
					...this.nodeData.style,
				}
			}
			return null
		},
		nodeChildrenConnectLineOption(): ConnectLineOption[] {
			const nodeConnectLineOption = this.nodeConnectLineOption
			if (this.nodeData[this.treeNodeProp.children]) {
				return this.nodeData[this.treeNodeProp.children].map((child: ClassificationNode) => {
					let childConnectLineOption = child.connectLineOption || {}
					return {
						...nodeConnectLineOption,
						...childConnectLineOption,
					}
				})
			}
			return []
		},
		showChildren() {
			return this.nodeData[this.treeNodeProp.children] && this.nodeData[this.treeNodeProp.children].length > 0 && this.expanded !== false
		},
	},
	watch: {
		showChildren(val) {
			if (!this.mutationObserver && val) {
				this.$nextTick(() => {
					this.bindMutationObserver()
				})
				this.mutationObserverCallback()
				setTimeout(() => {
					this.mutationObserverCallback()
				}, 500)
			} else {
				this.mutationObserver?.disconnect()
				this.mutationObserverCallback()
				setTimeout(() => {
					this.mutationObserverCallback()
				}, 500)
			}
		},
		mode() {
			this.mutationObserverCallback()
			setTimeout(() => {
				this.mutationObserverCallback()
			}, 500)
		},
		'nodeData.expanded'(val) {
			this.expanded = val === false ? false : true
		},
	},
	created() {
		this.expanded = this.nodeData.expanded === false ? false : true
	},
	mounted() {
		// const treeNodeContentRef: any = this.$refs.treeNodeContentRef
		this.bindMutationObserver()
		this.mutationObserverCallback()
	},
	beforeUnmount() {
		if (this?.mutationObserver?.disconnect) {
			this.mutationObserver.disconnect()
		}
		this.$nextTick(() => {
			this.mutationObserverCallback()
		})
	},
	methods: {
		bindMutationObserver() {
			if (this.mutationObserver) {
				return
			}
			const childNodesBoxRef: any = this.$refs.childNodesBoxRef
			if (childNodesBoxRef) {
				this.mutationObserver = createMutationObserver(childNodesBoxRef as HTMLElement, () => {
					this.$nextTick(() => {
						setTimeout(() => {
							// console.log('mutationObserver')
							this.mutationObserverCallback()
						}, 500)
					})
				})
			}
		},
		mutationObserverCallback() {
			// console.log('执行了callback')
			this.connectLinePaths = []
			this.arrowPositions = []
			const treeNodeRef: HTMLElement = this.$refs.treeNodeRef as HTMLElement
			if (!treeNodeRef) {
				return
			}
			this.treeNodeElRect = treeNodeRef.getBoundingClientRect()

			const childrenBox = this.$refs.childNodesBoxRef as HTMLElement
			let lineHeight = this.nodeConnectLineOption?.lineHeight ? this.nodeConnectLineOption.lineHeight : '20px'
			if (childrenBox) {
				const childrenBoxRect = childrenBox.getBoundingClientRect()
				if (this.mode === 'vertical') {
					Object.assign(this.svgStyle, {
						height: lineHeight,
						width: childrenBoxRect.width,
					})
				} else if (this.mode === 'horizon') {
					Object.assign(this.svgStyle, {
						height: childrenBoxRect.height,
						width: lineHeight,
					})
				}
				const children: HTMLCollection = childrenBox.children
				const lineHeightNum: number = Number.parseInt(lineHeight)
				for (let child of <any>children) {
					// debugger
					const childRect = child.getBoundingClientRect()
					if (this.mode === 'vertical') {
						const centerParentH = childrenBoxRect.left + childrenBoxRect.width / 2

						const centerChildH = childRect.left + childRect.width / 2

						const gapH = centerParentH - centerChildH

						this.connectLinePaths.push(
							`M${childrenBoxRect.width / 2} 0 Q ${childrenBoxRect.width / 2} ${lineHeightNum / 2} ${
								childrenBoxRect.width / 2 - gapH / 2
							} ${lineHeightNum / 2} Q ${centerChildH - childrenBoxRect.left} ${lineHeightNum / 2} ${centerChildH - childrenBoxRect.left} ${
								lineHeightNum - 4
							}`
						)
						// 箭头坐标
						this.nodeConnectLineOption?.showArrow && this.arrowPositions.push(`${centerChildH - childrenBoxRect.left} ${lineHeightNum}`)
					} else if (this.mode === 'horizon') {
						const centerParentV = childrenBoxRect.top + childrenBoxRect.height / 2

						const centerChildV = childRect.top + childRect.height / 2

						const gapV = centerParentV - centerChildV

						this.connectLinePaths.push(
							`M 0 ${childrenBoxRect.height / 2} Q ${lineHeightNum / 2} ${childrenBoxRect.height / 2} ${lineHeightNum / 2} ${
								childrenBoxRect.height / 2 - gapV / 2
							} Q ${lineHeightNum / 2} ${centerChildV - childrenBoxRect.top} ${lineHeightNum - 4} ${centerChildV - childrenBoxRect.top}`
						)
						// 箭头坐标
						this.nodeConnectLineOption?.showArrow && this.arrowPositions.push(`${lineHeightNum} ${centerChildV - childrenBoxRect.top}`)
					}
				}
			}
			this.$nextTick(() => {
				// 更新父级元素连接线
				this.$emit('updateConnectLine')
			})
		},
		getChildStyle(index: number) {
			const childrenLen = this.nodeData[this.treeNodeProp.children] ? this.nodeData[this.treeNodeProp.children].length : 0
			if (this.mode === 'vertical') {
				return { marginRight: index < childrenLen - 1 ? '15px' : null }
			} else {
				return { marginBottom: index < childrenLen - 1 ? '15px' : null }
			}
		},
		onExpandClick() {
			console.log('expand-click')
			if (this.nodeData.expanded === false) {
				this.expanded = this.nodeData.expanded = true
			} else {
				this.expanded = this.nodeData.expanded = false
			}
			console.log('expand-click value:', this.nodeData.expanded)
		},
		updateConnectLine() {
			this.$nextTick(() => {
				this.mutationObserverCallback()
			})
		},
	},
})
</script>

<style lang="less" scoped>
.classify-tree-node-wraper {
	position: relative;
	height: auto;
	width: auto;
	text-align: center;
	flex-shrink: 0;
	overflow: visible;
	.classify-tree-node-content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-shrink: 0;
		.classify-tree-node {
			position: relative;
			flex-shrink: 0;
			display: inline-block;
			.classify-tree-node-default {
				padding: 10px 15px;
				border: 1px solid #e2e2e2;
				border-radius: 2px;
			}
		}
		.classify-tree-node-expand {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			font-size: 14px;
			line-height: 14px;
			cursor: pointer;
		}
		.classify-tree-node-expand-vertical {
		}
		.classify-tree-node-expand-horizon {
		}
		.classify-tree-node-expand-default {
			position: relative;
			display: inline-block;
			height: 14px;
			width: 14px;
			border: 1px solid #000;
			background-color: #fff;
			border-radius: 50%;
			cursor: pointer;
			.minus {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 8px;
				height: 1px;
				line-height: 1px;
				background-color: black;
				border-radius: 0.5px;
				transition: all 0.2s ease;
			}
			.add {
				transform: translate(-50%, -50%) rotate(90deg);
			}
		}
		.diliver {
			transition: all 0.3s linear;
			display: flex;
			justify-content: center;
			svg {
				display: block;
			}
		}
		.diliver-vertical {
			width: 100%;
			overflow: visible;
		}
		.diliver-horizon {
			height: 100%;
			overflow: visible;
		}
		.classify-tree-children {
		}
	}
}
.classify-tree-node-wraper-vertical {
	display: inline-block;
	vertical-align: top;
	.classify-tree-children {
		display: flex;
		align-items: flex-start;
	}
	.classify-tree-node-content-vertical {
		flex-direction: column;
	}
}

.classify-tree-node-wraper-horizon {
	display: block;
	.classify-tree-node-content-horizon {
	}
}

.child-contain-box-enter-from,
.child-contain-box-leave-to {
	opacity: 0;
	filter: blur(4px);
}

.child-contain-box-enter-to {
	height: auto;
	width: auto;
	opacity: 1;
	filter: none;
}

.child-contain-box-leave-active,
.child-contain-box-enter-active {
	transition: all 0.3s linear;
}

.child-contain-box-move {
	transition: all 0.3s linear;
}

.children-box-leave-to,
.children-box-enter-from {
	height: 0;
	width: 0;
	opacity: 0;
	filter: blur(4px);
}
.children-box-enter-active,
.children-box-leave-active {
	transition: all 0.3s linear;
}
.children-box-move {
	transition: all 0.3s linear;
}
</style>
