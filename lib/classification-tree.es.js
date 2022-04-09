var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { defineComponent, h, inject, provide, resolveComponent, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, createBlock, renderSlot, toDisplayString, createCommentVNode, Fragment, renderList, createVNode, Transition, withCtx, TransitionGroup, pushScopeId, popScopeId, toRefs } from "vue";
const _sfc_main$2 = defineComponent({
  inheritAttrs: false,
  props: {
    template: {
      type: Function
    },
    data: {}
  },
  setup() {
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {},
  render: (props) => h("div", [props.template(props.data)])
});
function createMutationObserver(el, callback, opts) {
  console.log("\u521B\u5EFA\u4E86observer", el);
  const mutationObserver = new MutationObserver(callback);
  mutationObserver.observe(el, __spreadValues({
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  }, opts));
  return mutationObserver;
}
var classifyTreeNode_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$1 = defineComponent({
  name: "ClassifyTreeNode",
  props: {
    nodeData: {
      default: () => {
        return {
          label: "",
          key: "",
          slotScope: "default",
          expanded: false
        };
      }
    },
    mode: {
      default: "vertical"
    }
  },
  setup(props, context) {
    const slots = inject("slots");
    const connectLineOption = inject("connectLineOption");
    const treeNodeProps = inject("treeNodeProp");
    const treeNodeProp = {
      label: (treeNodeProps == null ? void 0 : treeNodeProps.label) || "label",
      children: (treeNodeProps == null ? void 0 : treeNodeProps.children) || "children",
      key: (treeNodeProps == null ? void 0 : treeNodeProps.key) || "children"
    };
    provide("slots", slots || context.slots);
    provide("connectLineOption", connectLineOption);
    return {
      slots,
      connectLineOption,
      treeNodeProp
    };
  },
  components: {
    TemplateContainer: _sfc_main$2
  },
  data() {
    return {
      treeNodeElRect: {},
      connectLinePaths: [],
      arrowPositions: [],
      svgStyle: {
        height: "0",
        width: "0"
      },
      mutationObserver: {},
      expanded: false
    };
  },
  computed: {
    nodeStyle() {
      if (typeof this.nodeData.style === "object") {
        return __spreadValues({}, this.nodeData.style);
      }
      return null;
    },
    nodeConnectLineOption() {
      if (this.nodeData.connectLineOption) {
        return __spreadValues({}, this.connectLineOption);
      } else {
        return this.connectLineOption;
      }
    },
    nodeChildrenConnectLineOption() {
      const nodeConnectLineOption = this.nodeConnectLineOption;
      if (this.nodeData[this.treeNodeProp.children]) {
        return this.nodeData[this.treeNodeProp.children].map((child) => {
          let childConnectLineOption = child.connectLineOption || {};
          return __spreadValues(__spreadValues({}, nodeConnectLineOption), childConnectLineOption);
        });
      }
      return [];
    },
    showChildren() {
      return this.nodeData[this.treeNodeProp.children] && this.nodeData[this.treeNodeProp.children].length > 0 && this.expanded !== false;
    }
  },
  watch: {
    showChildren(val) {
      this.mutationObserverCallback();
      setTimeout(() => {
        this.mutationObserverCallback();
      }, 500);
    },
    mode() {
      this.mutationObserverCallback();
      setTimeout(() => {
        this.mutationObserverCallback();
      }, 500);
    },
    "nodeData.expanded"(val) {
      this.expanded = val === false ? false : true;
    }
  },
  created() {
    this.expanded = this.nodeData.expanded === false ? false : true;
  },
  mounted() {
    const treeNodeContentRef = this.$refs.treeNodeContentRef;
    if (treeNodeContentRef) {
      this.mutationObserver = createMutationObserver(treeNodeContentRef.$el, () => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.mutationObserverCallback();
          }, 500);
        });
      });
    }
    this.mutationObserverCallback();
  },
  unmounted() {
    var _a;
    if ((_a = this == null ? void 0 : this.mutationObserver) == null ? void 0 : _a.disconnect) {
      this.mutationObserver.disconnect();
    }
    this.$nextTick(() => {
      this.mutationObserverCallback();
    });
  },
  methods: {
    mutationObserverCallback() {
      var _a, _b, _c;
      console.log("\u6267\u884C\u4E86callback");
      this.connectLinePaths = [];
      this.arrowPositions = [];
      const treeNodeRef = this.$refs.treeNodeRef;
      if (!treeNodeRef) {
        return;
      }
      this.treeNodeElRect = treeNodeRef.getBoundingClientRect();
      const childrenBox = this.$refs.childNodesBoxRef;
      let lineHeight = ((_a = this.nodeConnectLineOption) == null ? void 0 : _a.lineHeight) ? this.nodeConnectLineOption.lineHeight : "20px";
      if (childrenBox) {
        const childrenBoxRect = childrenBox.getBoundingClientRect();
        if (this.mode === "vertical") {
          Object.assign(this.svgStyle, {
            height: lineHeight,
            width: childrenBoxRect.width
          });
        } else if (this.mode === "horizon") {
          Object.assign(this.svgStyle, {
            height: childrenBoxRect.height,
            width: lineHeight
          });
        }
        const children = childrenBox.children;
        const lineHeightNum = Number.parseInt(lineHeight);
        for (let child of children) {
          const childRect = child.getBoundingClientRect();
          if (this.mode === "vertical") {
            const centerParentH = childrenBoxRect.left + childrenBoxRect.width / 2;
            const centerChildH = childRect.left + childRect.width / 2;
            const gapH = centerParentH - centerChildH;
            this.connectLinePaths.push(`M${childrenBoxRect.width / 2} 0 Q ${childrenBoxRect.width / 2} ${lineHeightNum / 2} ${childrenBoxRect.width / 2 - gapH / 2} ${lineHeightNum / 2} Q ${centerChildH - childrenBoxRect.left} ${lineHeightNum / 2} ${centerChildH - childrenBoxRect.left} ${lineHeightNum - 4}`);
            ((_b = this.nodeConnectLineOption) == null ? void 0 : _b.showArrow) && this.arrowPositions.push(`${centerChildH - childrenBoxRect.left} ${lineHeightNum}`);
          } else if (this.mode === "horizon") {
            const centerParentV = childrenBoxRect.top + childrenBoxRect.height / 2;
            const centerChildV = childRect.top + childRect.height / 2;
            const gapV = centerParentV - centerChildV;
            this.connectLinePaths.push(`M 0 ${childrenBoxRect.height / 2} Q ${lineHeightNum / 2} ${childrenBoxRect.height / 2} ${lineHeightNum / 2} ${childrenBoxRect.height / 2 - gapV / 2} Q ${lineHeightNum / 2} ${centerChildV - childrenBoxRect.top} ${lineHeightNum - 4} ${centerChildV - childrenBoxRect.top}`);
            ((_c = this.nodeConnectLineOption) == null ? void 0 : _c.showArrow) && this.arrowPositions.push(`${lineHeightNum} ${centerChildV - childrenBoxRect.top}`);
          }
        }
      }
      this.$nextTick(() => {
        this.$emit("updateConnectLine");
      });
    },
    getChildStyle(index) {
      const childrenLen = this.nodeData[this.treeNodeProp.children] ? this.nodeData[this.treeNodeProp.children].length : 0;
      if (this.mode === "vertical") {
        return { marginRight: index < childrenLen - 1 ? "15px" : null };
      } else {
        return { marginBottom: index < childrenLen - 1 ? "15px" : null };
      }
    },
    onExpandClick() {
      console.log("expand-click");
      if (this.nodeData.expanded === false) {
        this.expanded = this.nodeData.expanded = true;
      } else {
        this.expanded = this.nodeData.expanded = false;
      }
      console.log("expand-click value:", this.nodeData.expanded);
    },
    updateConnectLine() {
      this.$nextTick(() => {
        this.mutationObserverCallback();
      });
    }
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-fce2cb4c"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "classify-tree-node-default" };
const _hoisted_2 = { class: "classify-tree-node-expand-default" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("span", { class: "minus" }, null, -1));
const _hoisted_4 = {
  key: 0,
  class: "minus add"
};
const _hoisted_5 = ["height", "width"];
const _hoisted_6 = ["d", "stroke", "stroke-width"];
const _hoisted_7 = ["d", "stroke", "fill", "transform"];
const _hoisted_8 = {
  key: 0,
  class: "classify-tree-children",
  ref: "childNodesBoxRef"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_TemplateContainer = resolveComponent("TemplateContainer");
  const _component_ClassifyTreeNode = resolveComponent("ClassifyTreeNode", true);
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["classify-tree-node-wraper", _ctx.mode === "vertical" ? "classify-tree-node-wraper-vertical" : _ctx.mode === "horizon" ? "classify-tree-node-wraper-horizon" : null])
  }, [
    createElementVNode("div", {
      class: normalizeClass([
        "classify-tree-node-content",
        _ctx.mode === "vertical" ? "classify-tree-node-content-vertical" : _ctx.mode === "horizon" ? "classify-tree-node-content-horizon" : null
      ]),
      ref: "treeNodeRef"
    }, [
      createElementVNode("div", {
        class: normalizeClass(["classify-tree-node", _ctx.nodeData.class]),
        style: normalizeStyle(_ctx.nodeStyle)
      }, [
        _ctx.slots && _ctx.slots[_ctx.nodeData.slotScope || "default"] ? (openBlock(), createBlock(_component_TemplateContainer, {
          key: 0,
          template: _ctx.slots[_ctx.nodeData.slotScope || "default"],
          data: _ctx.nodeData,
          ref: "treeNodeContentRef"
        }, null, 8, ["template", "data"])) : renderSlot(_ctx.$slots, _ctx.nodeData.slotScope || "default", {
          key: 1,
          data: _ctx.nodeData
        }, () => [
          createElementVNode("div", _hoisted_1, toDisplayString(_ctx.nodeData[_ctx.treeNodeProp.label]), 1)
        ], true)
      ], 6),
      createElementVNode("div", {
        class: normalizeClass([
          "classify-tree-node-expand",
          _ctx.mode === "vertical" ? "classify-tree-node-expand-vertical" : _ctx.mode === "horizon" ? "classify-tree-node-expand-horizon" : null
        ]),
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.onExpandClick && _ctx.onExpandClick(...args))
      }, [
        _ctx.slots && _ctx.slots["expand"] && _ctx.nodeData[_ctx.treeNodeProp.children] && _ctx.nodeData[_ctx.treeNodeProp.children].length > 0 ? (openBlock(), createBlock(_component_TemplateContainer, {
          key: 0,
          template: _ctx.slots["expand"],
          data: _ctx.nodeData.expanded
        }, null, 8, ["template", "data"])) : _ctx.nodeData[_ctx.treeNodeProp.children] && _ctx.nodeData[_ctx.treeNodeProp.children].length > 0 ? renderSlot(_ctx.$slots, "default", {
          key: 1,
          data: _ctx.expanded
        }, () => [
          createElementVNode("div", _hoisted_2, [
            _hoisted_3,
            _ctx.expanded === false ? (openBlock(), createElementBlock("span", _hoisted_4)) : createCommentVNode("", true)
          ])
        ], true) : createCommentVNode("", true)
      ], 2),
      _ctx.showChildren ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["diliver", _ctx.mode === "vertical" ? "diliver-vertical" : _ctx.mode === "horizon" ? "diliver-horizon" : null])
      }, [
        (openBlock(), createElementBlock("svg", {
          height: _ctx.svgStyle.height,
          width: _ctx.svgStyle.width,
          version: "1.1",
          xmlns: "http://www.w3.org/2000/svg"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.connectLinePaths, (path, i) => {
            return openBlock(), createElementBlock("path", {
              d: path,
              key: i,
              stroke: _ctx.nodeChildrenConnectLineOption[i] && _ctx.nodeChildrenConnectLineOption[i].lineColor || "black",
              fill: "transparent",
              "stroke-width": _ctx.nodeChildrenConnectLineOption[i] && _ctx.nodeChildrenConnectLineOption[i].lineWidth || 2,
              "stroke-linecap": "round"
            }, null, 8, _hoisted_6);
          }), 128)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.arrowPositions, (position, i) => {
            return openBlock(), createElementBlock("path", {
              key: i,
              d: `M ${position} m 0 -4 l 3 -3 l -3 7 l -3 -7 l 3 3`,
              stroke: _ctx.nodeChildrenConnectLineOption[i] && _ctx.nodeChildrenConnectLineOption[i].lineColor || "black",
              fill: _ctx.nodeChildrenConnectLineOption[i] && _ctx.nodeChildrenConnectLineOption[i].lineColor || "black",
              "stroke-width": "0.2",
              transform: _ctx.mode === "horizon" ? `rotate(-90, ${position})` : void 0,
              "stroke-linejoin": "miter"
            }, null, 8, _hoisted_7);
          }), 128))
        ], 8, _hoisted_5))
      ], 2)) : createCommentVNode("", true),
      createVNode(Transition, {
        name: "child-contain-box",
        onAfterLeave: _ctx.updateConnectLine,
        onAfterEnter: _ctx.updateConnectLine
      }, {
        default: withCtx(() => [
          _ctx.showChildren ? (openBlock(), createElementBlock("div", _hoisted_8, [
            createVNode(TransitionGroup, { name: "children-box" }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.nodeData[_ctx.treeNodeProp.children], (node, index) => {
                  return openBlock(), createBlock(_component_ClassifyTreeNode, {
                    key: node[_ctx.treeNodeProp.key],
                    "node-data": node,
                    style: normalizeStyle(_ctx.getChildStyle(index)),
                    mode: _ctx.mode,
                    onUpdateConnectLine: _ctx.mutationObserverCallback
                  }, null, 8, ["node-data", "style", "mode", "onUpdateConnectLine"]);
                }), 128))
              ]),
              _: 1
            })
          ], 512)) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["onAfterLeave", "onAfterEnter"])
    ], 2)
  ], 2);
}
var ClassifyTreeNode = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-fce2cb4c"]]);
var classifyTree_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main = defineComponent({
  name: "ClassifyTree",
  props: {
    nodeList: {
      default: () => {
        return [];
      }
    },
    mode: {
      default: "vertical"
    },
    connectLineOption: {
      default: () => ({})
    },
    treeNodeProps: {
      default: () => ({
        label: "label",
        children: "children",
        key: "key"
      })
    }
  },
  setup(props, context) {
    var _a, _b, _c;
    const { connectLineOption, treeNodeProps } = toRefs(props);
    const treeNodeProp = {
      label: ((_a = treeNodeProps.value) == null ? void 0 : _a.label) || "label",
      children: ((_b = treeNodeProps.value) == null ? void 0 : _b.children) || "children",
      key: ((_c = treeNodeProps.value) == null ? void 0 : _c.key) || "key"
    };
    provide("slots", context.slots);
    provide("connectLineOption", connectLineOption);
    provide("treeNodeProp", treeNodeProp);
    return {
      treeNodeProp
    };
  },
  components: {
    ClassifyTreeNode,
    TemplateContainer: _sfc_main$2
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    getChildStyle(index) {
      if (this.mode === "vertical") {
        return { marginRight: index < this.nodeList.length - 1 ? "15px" : null };
      } else {
        return { marginBottom: index < this.nodeList.length - 1 ? "15px" : null };
      }
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ClassifyTreeNode = resolveComponent("ClassifyTreeNode");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["classify-tree-wraper", _ctx.mode === "vertical" ? "classify-tree-wraper-vertical" : _ctx.mode === "horizon" ? "classify-tree-wraper-horizon" : null])
  }, [
    createVNode(TransitionGroup, { name: "tree" }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.nodeList, (node, index) => {
          return openBlock(), createBlock(_component_ClassifyTreeNode, {
            "node-data": node,
            style: normalizeStyle(_ctx.getChildStyle(index)),
            mode: _ctx.mode,
            key: node[_ctx.treeNodeProp.key]
          }, null, 8, ["node-data", "style", "mode"]);
        }), 128))
      ]),
      _: 1
    })
  ], 2);
}
var ClassifyTree = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-601de8f4"]]);
export { ClassifyTree as default };
