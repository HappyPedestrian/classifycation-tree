<!--
 * @Description: 
 * @Author: Happy_Pedestrian
 * @Date: 2022-03-28 16:47:08
 * @LastEditTime: 2022-04-10 15:17:34
 * @LastEditors: Happy_Pedestrian
-->
<script lang="ts">
import { defineComponent, h } from 'vue'
export default defineComponent({
	inheritAttrs: false,
	props: {
		template: {
			type: Function,
		},
		data: {},
	},
	setup() {},
	components: {},
	data() {
		return {}
	},
	computed: {},
	watch: {},
	mounted() {
		this.$emit('mounted')
	},
	methods: {},
	render: (props: any) => h('div', [props.template(props.data)]),
	// render: (props: any) => h(() => props.template(props.data)),
})
</script>

<style lang="" scoped></style>
