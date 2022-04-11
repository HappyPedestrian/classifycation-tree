/*
 * @Description: 
 * @Author: Happy_Pedestrian
 * @Date: 2022-03-26 09:59:51
 * @LastEditTime: 2022-04-11 10:10:17
 * @LastEditors: Happy_Pedestrian
 */
export interface ClassificationNode {
  label?: string // 标题文字
  children?: ClassificationNode[] | undefined | null // 子节点数组
  style?: any // 包裹节点的div的样式
  class?: string | string[] // 包裹节点的div的类名
  expanded?: boolean | undefined | null // 是否展开显示子节点
  key?: string | number
  slotScope?: string // 自定义节点显示的slot名称
  connectLineOption?: ConnectLineOption // 连接线的配置项
  [propName: string]: any
}

export type ConnectLineOption = {
  lineHeight?: string, // 连接线的高度
  lineColor?: string, // 连接线的颜色
  lineWidth?: string | number, // 连接线的线宽
  showArrow?: boolean // 是否展示箭头
}

export type TreeNodeProps = {
  label?: string
  children?: string
  key?: string
}

export type TreeNodeProp = {
  label: string
  children: string
  key: string
}