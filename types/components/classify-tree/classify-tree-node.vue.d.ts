import { ClassificationNode, ConnectLineOption } from './assets/classify-tree-types';
declare const _default: import("vue").DefineComponent<{
    nodeData: {
        default: () => ClassificationNode;
    };
    parent: {
        default: () => ClassificationNode | null;
    };
    mode: {
        default: string;
    };
}, {
    slots: Readonly<{
        [name: string]: import("vue").Slot | undefined;
    }> | undefined;
    nodeConnectLineOption: import("vue").Ref<{
        lineHeight?: string | undefined;
        lineColor?: string | undefined;
        lineWidth?: string | number | undefined;
        showArrow?: boolean | undefined;
    } | undefined>;
    treeNodeProp: import("vue").Ref<{
        label: string;
        children: string;
        key: string;
    }>;
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
        default: () => ClassificationNode;
    };
    parent: {
        default: () => ClassificationNode | null;
    };
    mode: {
        default: string;
    };
}>>, {
    parent: ClassificationNode;
    mode: string;
    nodeData: ClassificationNode;
}>;
export default _default;
