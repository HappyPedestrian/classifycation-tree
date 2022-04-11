import { ClassificationNode, ConnectLineOption, TreeNodeProps, TreeNodeProp } from './assets/classify-tree-types';
declare const _default: import("vue").DefineComponent<{
    nodeList: {
        default: () => ClassificationNode[];
    };
    mode: {
        default: string;
    };
    connectLineOption: {
        default: () => ConnectLineOption;
    };
    treeNodeProps: {
        default: () => TreeNodeProps;
    };
}, {
    treeNodeProp: TreeNodeProp;
}, {}, {}, {
    getChildStyle(index: number): {
        marginRight: string | null;
        marginBottom?: undefined;
    } | {
        marginBottom: string | null;
        marginRight?: undefined;
    };
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    nodeList: {
        default: () => ClassificationNode[];
    };
    mode: {
        default: string;
    };
    connectLineOption: {
        default: () => ConnectLineOption;
    };
    treeNodeProps: {
        default: () => TreeNodeProps;
    };
}>>, {
    mode: string;
    connectLineOption: ConnectLineOption;
    nodeList: ClassificationNode[];
    treeNodeProps: TreeNodeProps;
}>;
export default _default;
