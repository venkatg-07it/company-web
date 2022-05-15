export interface IFileResponse {
    columnCount?: number;
    mapperFields?: string[];
    colMapper?: { [key: string]: string };
    sheetContent?: { [key: string]: string }[];
}

export interface ISheetContent {

}