var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
import { defineComponent as e, h as t, toRefs as n, inject as o, unref as i, provide as a, ref as d, resolveComponent as s, openBlock as r, createElementBlock as l, normalizeClass as c, createElementVNode as h, normalizeStyle as p, createBlock as u, renderSlot as m, toDisplayString as f, createCommentVNode as v, Fragment as C, renderList as b, createVNode as y, Transition as k, withCtx as O, TransitionGroup as g, pushScopeId as w, popScopeId as x } from "vue";
const L = e({ inheritAttrs: false, props: { template: { type: Function }, data: {} }, setup() {
}, components: {}, data: () => ({}), computed: {}, watch: {}, mounted() {
  this.$emit("mounted");
}, methods: {}, render: (e2) => t("div", [e2.template(e2.data)]) });
var $ = (e2, t2) => {
  const n2 = e2.__vccOpts || e2;
  for (const [e3, o2] of t2)
    n2[e3] = o2;
  return n2;
};
const N = e({ name: "ClassifyTreeNode", props: { nodeData: { default: () => ({ label: "", key: "", slotScope: "default", expanded: false }) }, parent: { default: () => null }, mode: { default: "vertical" } }, setup(e2, t2) {
  const s2 = n(e2.nodeData), r2 = o("slots"), l2 = i(o("connectLineOption")), c2 = o("treeNodeProp"), h2 = { label: (c2 == null ? void 0 : c2.label) || "label", children: (c2 == null ? void 0 : c2.children) || "children", key: (c2 == null ? void 0 : c2.key) || "children" };
  let p2 = {};
  return p2 = s2.connectLineOption ? __spreadValues(__spreadValues({}, l2), i(s2.connectLineOption)) : l2, a("slots", r2 || t2.slots), a("connectLineOption", p2), { slots: r2, nodeConnectLineOption: d(p2), treeNodeProp: d(h2) };
}, components: { TemplateContainer: L }, data: () => ({ treeNodeElRect: {}, connectLinePaths: [], arrowPositions: [], svgStyle: { height: "0", width: "0" }, mutationObserver: null, expanded: false }), computed: { nodeStyle() {
  return typeof this.nodeData.style == "object" ? __spreadValues({}, this.nodeData.style) : null;
}, nodeChildrenConnectLineOption() {
  const e2 = this.nodeConnectLineOption;
  return this.nodeData[this.treeNodeProp.children] ? this.nodeData[this.treeNodeProp.children].map((t2) => {
    let n2 = t2.connectLineOption || {};
    return __spreadValues(__spreadValues({}, e2), n2);
  }) : [];
}, showChildren() {
  return this.nodeData[this.treeNodeProp.children] && this.nodeData[this.treeNodeProp.children].length > 0 && this.expanded !== false;
} }, watch: { showChildren(e2) {
  var _a;
  !this.mutationObserver && e2 ? (this.$nextTick(() => {
    this.bindMutationObserver();
  }), this.mutationObserverCallback(), setTimeout(() => {
    this.mutationObserverCallback();
  }, 500)) : ((_a = this.mutationObserver) == null ? void 0 : _a.disconnect(), this.mutationObserverCallback(), setTimeout(() => {
    this.mutationObserverCallback();
  }, 500));
}, mode() {
  this.mutationObserverCallback(), setTimeout(() => {
    this.mutationObserverCallback();
  }, 500);
}, "nodeData.expanded"(e2) {
  this.expanded = e2 !== false;
} }, created() {
  this.expanded = this.nodeData.expanded !== false;
}, mounted() {
  this.bindMutationObserver(), this.mutationObserverCallback();
}, beforeUnmount() {
  var _a;
  ((_a = this == null ? void 0 : this.mutationObserver) == null ? void 0 : _a.disconnect) && this.mutationObserver.disconnect(), this.$nextTick(() => {
    this.mutationObserverCallback();
  });
}, methods: { bindMutationObserver() {
  if (this.mutationObserver)
    return;
  const e2 = this.$refs.childNodesBoxRef;
  e2 && (this.mutationObserver = function(e3, t2, n2) {
    const o2 = new MutationObserver(t2);
    return o2.observe(e3, __spreadValues({ attributes: true, childList: true, subtree: true, characterData: true }, n2)), o2;
  }(e2, () => {
    this.$nextTick(() => {
      setTimeout(() => {
        this.mutationObserverCallback();
      }, 500);
    });
  }));
}, mutationObserverCallback() {
  var _a, _b, _c;
  this.connectLinePaths = [], this.arrowPositions = [];
  const e2 = this.$refs.treeNodeRef;
  if (!e2)
    return;
  this.treeNodeElRect = e2.getBoundingClientRect();
  const t2 = this.$refs.childNodesBoxRef;
  let n2 = ((_a = this.nodeConnectLineOption) == null ? void 0 : _a.lineHeight) ? this.nodeConnectLineOption.lineHeight : "20px";
  if (t2) {
    const e3 = t2.getBoundingClientRect();
    this.mode === "vertical" ? Object.assign(this.svgStyle, { height: n2, width: e3.width }) : this.mode === "horizon" && Object.assign(this.svgStyle, { height: e3.height, width: n2 });
    const o2 = t2.children, i2 = Number.parseInt(n2);
    for (let t3 of o2) {
      const n3 = t3.getBoundingClientRect();
      if (this.mode === "vertical") {
        const t4 = e3.left + e3.width / 2, o3 = n3.left + n3.width / 2, a2 = t4 - o3;
        this.connectLinePaths.push(`M${e3.width / 2} 0 Q ${e3.width / 2} ${i2 / 2} ${e3.width / 2 - a2 / 2} ${i2 / 2} Q ${o3 - e3.left} ${i2 / 2} ${o3 - e3.left} ${i2 - 4}`), ((_b = this.nodeConnectLineOption) == null ? void 0 : _b.showArrow) && this.arrowPositions.push(`${o3 - e3.left} ${i2}`);
      } else if (this.mode === "horizon") {
        const t4 = e3.top + e3.height / 2, o3 = n3.top + n3.height / 2, a2 = t4 - o3;
        this.connectLinePaths.push(`M 0 ${e3.height / 2} Q ${i2 / 2} ${e3.height / 2} ${i2 / 2} ${e3.height / 2 - a2 / 2} Q ${i2 / 2} ${o3 - e3.top} ${i2 - 4} ${o3 - e3.top}`), ((_c = this.nodeConnectLineOption) == null ? void 0 : _c.showArrow) && this.arrowPositions.push(`${i2} ${o3 - e3.top}`);
      }
    }
  }
  this.$nextTick(() => {
    this.$emit("updateConnectLine");
  });
}, getChildStyle(e2) {
  const t2 = this.nodeData[this.treeNodeProp.children] ? this.nodeData[this.treeNodeProp.children].length : 0;
  return this.mode === "vertical" ? { marginRight: e2 < t2 - 1 ? "15px" : null } : { marginBottom: e2 < t2 - 1 ? "15px" : null };
}, onExpandClick() {
  this.nodeData.expanded === false ? this.expanded = this.nodeData.expanded = true : this.expanded = this.nodeData.expanded = false;
}, updateConnectLine() {
  this.$nextTick(() => {
    this.mutationObserverCallback();
  });
} } }), D = { class: "classify-tree-node-default" }, P = { class: "classify-tree-node-expand-default" }, T = ((e2) => (w("data-v-10c8f218"), e2 = e2(), x(), e2))(() => h("span", { class: "minus" }, null, -1)), S = { key: 0, class: "minus add" }, z = ["height", "width"], R = ["d", "stroke", "stroke-width"], _ = ["d", "stroke", "fill", "transform"], B = { key: 0, class: "classify-tree-children", ref: "childNodesBoxRef" };
var A = $(e({ name: "ClassifyTree", props: { nodeList: { default: () => [] }, mode: { default: "vertical" }, connectLineOption: { default: () => ({}) }, treeNodeProps: { default: () => ({ label: "label", children: "children", key: "key" }) } }, setup(e2, t2) {
  var _a, _b, _c;
  const { connectLineOption: o2, treeNodeProps: i2 } = n(e2), s2 = { label: ((_a = i2.value) == null ? void 0 : _a.label) || "label", children: ((_b = i2.value) == null ? void 0 : _b.children) || "children", key: ((_c = i2.value) == null ? void 0 : _c.key) || "key" };
  return a("slots", t2.slots), a("connectLineOption", o2), a("treeNodeProp", s2), { treeNodeProp: d(s2) };
}, components: { ClassifyTreeNode: $(N, [["render", function(e2, t2, n2, o2, i2, a2) {
  const d2 = s("TemplateContainer"), w2 = s("ClassifyTreeNode", true);
  return r(), l("div", { class: c(["classify-tree-node-wraper", e2.mode === "vertical" ? "classify-tree-node-wraper-vertical" : e2.mode === "horizon" ? "classify-tree-node-wraper-horizon" : null]) }, [h("div", { class: c(["classify-tree-node-content", e2.mode === "vertical" ? "classify-tree-node-content-vertical" : e2.mode === "horizon" ? "classify-tree-node-content-horizon" : null]), ref: "treeNodeRef" }, [h("div", { class: c(["classify-tree-node", e2.nodeData.class]), style: p(e2.nodeStyle), ref: "treeNodeContentRef" }, [e2.slots && e2.slots[e2.nodeData.slotScope || "default"] ? (r(), u(d2, { key: 0, template: e2.slots[e2.nodeData.slotScope || "default"], data: { node: e2.nodeData, parent: e2.parent } }, null, 8, ["template", "data"])) : m(e2.$slots, e2.nodeData.slotScope || "default", { key: 1, data: { node: e2.nodeData, parent: e2.parent } }, () => [h("div", D, f(e2.nodeData[e2.treeNodeProp.label]), 1)], true)], 6), h("div", { class: c(["classify-tree-node-expand", e2.mode === "vertical" ? "classify-tree-node-expand-vertical" : e2.mode === "horizon" ? "classify-tree-node-expand-horizon" : null]), onClick: t2[0] || (t2[0] = (...t3) => e2.onExpandClick && e2.onExpandClick(...t3)) }, [e2.slots && e2.slots.expand && e2.nodeData[e2.treeNodeProp.children] && e2.nodeData[e2.treeNodeProp.children].length > 0 ? (r(), u(d2, { key: 0, template: e2.slots.expand, data: e2.nodeData.expanded }, null, 8, ["template", "data"])) : e2.nodeData[e2.treeNodeProp.children] && e2.nodeData[e2.treeNodeProp.children].length > 0 ? m(e2.$slots, "default", { key: 1, data: e2.expanded }, () => [h("div", P, [T, e2.expanded === false ? (r(), l("span", S)) : v("", true)])], true) : v("", true)], 2), e2.showChildren ? (r(), l("div", { key: 0, class: c(["diliver", e2.mode === "vertical" ? "diliver-vertical" : e2.mode === "horizon" ? "diliver-horizon" : null]) }, [(r(), l("svg", { height: e2.svgStyle.height, width: e2.svgStyle.width, version: "1.1", xmlns: "http://www.w3.org/2000/svg" }, [(r(true), l(C, null, b(e2.connectLinePaths, (t3, n3) => (r(), l("path", { d: t3, key: n3, stroke: e2.nodeChildrenConnectLineOption[n3] && e2.nodeChildrenConnectLineOption[n3].lineColor || "black", fill: "transparent", "stroke-width": e2.nodeChildrenConnectLineOption[n3] && e2.nodeChildrenConnectLineOption[n3].lineWidth || 2, "stroke-linecap": "round" }, null, 8, R))), 128)), (r(true), l(C, null, b(e2.arrowPositions, (t3, n3) => (r(), l("path", { key: n3, d: `M ${t3} m 0 -4 l 3 -3 l -3 7 l -3 -7 l 3 3`, stroke: e2.nodeChildrenConnectLineOption[n3] && e2.nodeChildrenConnectLineOption[n3].lineColor || "black", fill: e2.nodeChildrenConnectLineOption[n3] && e2.nodeChildrenConnectLineOption[n3].lineColor || "black", "stroke-width": "0.2", transform: e2.mode === "horizon" ? `rotate(-90, ${t3})` : void 0, "stroke-linejoin": "miter" }, null, 8, _))), 128))], 8, z))], 2)) : v("", true), y(k, { name: "child-contain-box", onAfterLeave: e2.updateConnectLine, onAfterEnter: e2.updateConnectLine }, { default: O(() => [e2.showChildren ? (r(), l("div", B, [y(g, { name: "children-box" }, { default: O(() => [(r(true), l(C, null, b(e2.nodeData[e2.treeNodeProp.children], (t3, n3) => (r(), u(w2, { key: t3[e2.treeNodeProp.key], "node-data": t3, parent: e2.nodeData, style: p(e2.getChildStyle(n3)), mode: e2.mode, onUpdateConnectLine: e2.mutationObserverCallback }, null, 8, ["node-data", "parent", "style", "mode", "onUpdateConnectLine"]))), 128))]), _: 1 })], 512)) : v("", true)]), _: 1 }, 8, ["onAfterLeave", "onAfterEnter"])], 2)], 2);
}], ["__scopeId", "data-v-10c8f218"]]), TemplateContainer: L }, data: () => ({}), computed: {}, watch: {}, mounted() {
}, methods: { getChildStyle(e2) {
  return this.mode === "vertical" ? { marginRight: e2 < this.nodeList.length - 1 ? "15px" : null } : { marginBottom: e2 < this.nodeList.length - 1 ? "15px" : null };
} } }), [["render", function(e2, t2, n2, o2, i2, a2) {
  const d2 = s("ClassifyTreeNode");
  return r(), l("div", { class: c(["classify-tree-wraper", e2.mode === "vertical" ? "classify-tree-wraper-vertical" : e2.mode === "horizon" ? "classify-tree-wraper-horizon" : null]) }, [y(g, { name: "tree" }, { default: O(() => [(r(true), l(C, null, b(e2.nodeList, (t3, n3) => (r(), u(d2, { "node-data": t3, style: p(e2.getChildStyle(n3)), mode: e2.mode, key: t3[e2.treeNodeProp.key] }, null, 8, ["node-data", "style", "mode"]))), 128))]), _: 1 })], 2);
}], ["__scopeId", "data-v-426dbd21"]]);
export { A as default };
