
export interface IFieldConfig {
    name: string;
    type: string;
    label?: string;
    length?: number;
    required?: true;
    value?: any;
    disabled?: boolean;
    row?: number;
    col?: number;
    group?: string;
    width?: number;
    pinned?: boolean;
    hide?: true;
    isPrimary?: true;
    default?: string;
    readonly?: boolean;
}
