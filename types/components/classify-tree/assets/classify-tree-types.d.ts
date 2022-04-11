export interface ClassificationNode {
    label?: string;
    children?: ClassificationNode[] | undefined | null;
    style?: any;
    class?: string | string[];
    expanded?: boolean | undefined | null;
    key?: string | number;
    slotScope?: string;
    connectLineOption?: ConnectLineOption;
    [propName: string]: any;
}
export declare type ConnectLineOption = {
    lineHeight?: string;
    lineColor?: string;
    lineWidth?: string | number;
    showArrow?: boolean;
};
export declare type TreeNodeProps = {
    label?: string;
    children?: string;
    key?: string;
};
export declare type TreeNodeProp = {
    label: string;
    children: string;
    key: string;
};
