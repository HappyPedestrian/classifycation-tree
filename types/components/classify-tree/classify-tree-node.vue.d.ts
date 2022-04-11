import { ClassifyNode, ConnectLineOption, TreeNodeProp } from './assets/classify-tree-types';
declare const _default: import("vue").DefineComponent<{
    nodeData: {
        default: () => ClassifyNode;
    };
    mode: {
        default: string;
    };
}, {
    slots: Readonly<{
        [name: string]: import("vue").Slot | undefined;
    }> | undefined;
    connectLineOption: ConnectLineOption | undefined;
    treeNodeProp: TreeNodeProp;
}, {
    treeNodeElRect: DOMRect;
    connectLinePaths: string[];
    arrowPositions: string[];
    svgStyle: {
        height: string;
        width: string;
    };
    mutationObserver: MutationObserver | null;
    expanded: boolean;
}, {
    nodeStyle(): any | null;
    nodeConnectLineOption(): ConnectLineOption | undefined;
    nodeChildrenConnectLineOption(): ConnectLineOption[];
    showChildren(): any;
}, {
    bindMutationObserver(): void;
    mutationObserverCallback(): void;
    getChildStyle(index: number): {
        marginRight: string | null;
        marginBottom?: undefined;
    } | {
        marginBottom: string | null;
        marginRight?: undefined;
    };
    onExpandClick(): void;
    updateConnectLine(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    nodeData: {
        default: () => ClassifyNode;
    };
    mode: {
        default: string;
    };
}>>, {
    mode: string;
    nodeData: ClassifyNode;
}>;
export default _default;
