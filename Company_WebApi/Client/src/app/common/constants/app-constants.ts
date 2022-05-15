import { APIConstants } from "./api-constants";

export class AppConstants {

    public static MONTHS: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    public static ROUTE_PATH_ITEM_MASTER_UPLOAD = "item-master-upload";
    public static ROUTE_PATH_CUSTOMER_MASTER_UPLOAD = "customer-master-upload";
    public static ROUTE_PATH_COMPONENT_MASTER_UPLOAD = "component-master-upload";
    public static ROUTE_PATH_ASSEMBLY_MASTER_UPLOAD = "assembly-master-upload";
    public static ROUTE_PATH_IM_RAW_MAT_MASTER_UPLOAD = "im-raw-materials-master-upload";
    public static ROUTE_PATH_PRICE_MASTER_UPLOAD = "price-master-upload";
    public static ROUTE_PATH_PO_MASTER_UPLOAD = "po-master-upload";
    public static ROUTE_PATH_OPEN_PO_MASTER_UPLOAD = "open-po-master-upload";
    public static ROUTE_PATH_DUMMY_PO_MASTER_UPLOAD = "dummy-po-master-upload";
    public static ROUTE_PATH_PO_ITEM_CODE_MATCH_UPLOAD = "po-item-code-match-upload";
    public static ROUTE_PATH_BI_MASTER_UPLOAD = "batch-or-individual-master-upload";
    public static ROUTE_PATH_CTQ_MASTER_UPLOAD = "ctq-master-upload";

    public static ROUTE_PATH_ITEM_MASTER_ADD_OR_EDIT = "item-master";
    public static ROUTE_PATH_CUSTOMER_MASTER_ADD_OR_EDIT = "customer-master";
    public static ROUTE_PATH_COMPONENT_MASTER_ADD_OR_EDIT = "component-master";
    public static ROUTE_PATH_ASSEMBLY_MASTER_ADD_OR_EDIT = "assembly-master";
    public static ROUTE_PATH_IM_RAW_MAT_MASTER_ADD_OR_EDIT = "im-raw-materials-master";
    public static ROUTE_PATH_PRICE_MASTER_ADD_OR_EDIT = "price-master";
    public static ROUTE_PATH_PO_MASTER_ADD_OR_EDIT = "po-master";
    public static ROUTE_PATH_OPEN_PO_MASTER_ADD_OR_EDIT = "open-po-master";
    public static ROUTE_PATH_DUMMY_PO_MASTER_ADD_OR_EDIT = "dummy-po-master";
    public static ROUTE_PATH_TABLE_MASTER_ADD_OR_EDIT = "table-master";
    public static ROUTE_PATH_PO_ITEM_CODE_MATCH_ADD_OR_EDIT = "po-item-code-match";
    public static ROUTE_PATH_BI_MASTER_ADD_OR_EDIT = "batch-or-individual-master";

    public static ROUTE_PATH_ITEM_MASTER_EXPORT = "item-master-export";
    public static ROUTE_PATH_CUSTOMER_MASTER_EXPORT = "customer-master-export";
    public static ROUTE_PATH_COMPONENT_MASTER_EXPORT = "component-master-export";
    public static ROUTE_PATH_ASSEMBLY_MASTER_EXPORT = "assembly-master-export";
    public static ROUTE_PATH_IM_RAW_MAT_MASTER_EXPORT = "im-raw-materials-master-export";
    public static ROUTE_PATH_PRICE_MASTER_EXPORT = "price-master-export";
    public static ROUTE_PATH_PO_MASTER_EXPORT = "po-master-export";
    public static ROUTE_PATH_OPEN_PO_MASTER_EXPORT = "open-po-master-export";
    public static ROUTE_PATH_DUMMY_PO_MASTER_EXPORT = "dummy-po-master-export";
    public static ROUTE_PATH_TABLE_MASTER_EXPORT = "table-master-export";
    public static ROUTE_PATH_PO_ITEM_CODE_MATCH_EXPORT = "po-item-code-match-export";
    public static ROUTE_PATH_NESTING_MASTER_EXPORT = "nesting-master-export";
    public static ROUTE_PATH_BI_MASTER_EXPORT = "batch-or-individual-master-export";
    public static ROUTE_PATH_CTQ_MASTER_EXPORT = "ctq-master-export";

    
    public static FILE_PATH_ITEM_MASTER: string = "item-master/";
    public static FILE_PATH_CUSTOMER_MASTER: string = "customer-master/";
    public static FILE_PATH_COMPONENT_MASTER: string = "component-master/";
    public static FILE_PATH_ASSEMBLY_MASTER: string = "assembly-master/";
    public static FILE_PATH_IM_RAW_MAT_MASTER: string = "im-raw-mat-master/";
    public static FILE_PATH_PRICE_MASTER: string = "price-master/";
    public static FILE_PATH_PO_MASTER: string = "po-master/";
    public static FILE_PATH_CTQ_MASTER: string = "ctq-master/";
    public static FILE_PATH_OPEN_PO_MASTER: string = "open-po-master/";
    public static FILE_PATH_DUMMY_PO_MASTER: string = "dummy-po-master/";
    public static FILE_PATH_TABLE_MASTER: string = "table-master/";
    public static FILE_PATH_CONSOLIDATION_REPORT: string = "consolidation-report/";
    public static FILE_PATH_DUMMY_CONSOLIDATION_REPORT: string = "dummy-consolidation-report/";
    public static FILE_PATH_PO_ITEM_CODE_MATCH: string = "po-item-code-match/";
    public static FILE_PATH_NESTING_MASTER: string = "nesting-master/";
    public static FILE_PATH_BI_MASTER: string = "batch-or-individual-master/";
    public static FILE_PATH_NON_LASER_PRINT: string = "non-laser-print/";
    public static FILE_PATH_TRACKING_LIST: string = "tracking-list/";
    public static FILE_PATH_SCANNED_RECORDS: string = "scanned-records/";
    
    public static FILE_NAME_FIELD_DETAILS: string = "field_details.json";
    public static FILE_NAME_FIELD_INFO: string = "field_info.json";
    public static FILE_NAME_CONSOLIDATION_REPORT: string = "consolidate-report.json";

    public static FILE_PATH_UPLOAD: string = "./../../../../assets/json/";

    public static ERR_MSG_MISSING_MANDATORY_FIELDS: string = "Mandatory fields are missing ";
    public static ERR_MSG_INVALID_LENGTH_FIELDS: string = "Fields length has exceeded ";
    public static ERR_MSG_MISSING_NUMBER_FIELDS: string = "Invalid number in the field ";
    
    public static ERR_MSG_CUSTOMER_MASTER: string = "Invalid customer data";
    public static ERR_MSG_ITEM_MASTER: string = "Invalid customer code";
    public static ERR_MSG_ITEM_MASTER_RM: string = "Invalid item code or rm code";
    public static ERR_MSG_COMPONENT_MASTER: string = "Invalid item code are not in the raw materials";
    public static ERR_MSG_ASSEMBLY_MASTER: string = "Invalid item code are not in the item master";
    public static ERR_MSG_PRICE_MASTER: string = "Invalid customer code or item code or price";
    public static ERR_MSG_PO_MASTER: string = "Invalid customer code or item code";
    public static ERR_MSG_DUMMY_PO_MASTER: string = "Invalid customer code or item code";
    public static ERR_MSG_OPEN_PO_MASTER: string = "Invalid customer code or item code";

    public static ERR_MSG_ASSEMBLY_MASTER_LESS_ENTRY: string = "Assembly number should have more than one component";

    public static PAGE_TITLE_ITEM_MASTER_UPLOAD: string = "ITEM MASTER UPLOAD";
    public static PAGE_TITLE_CUSTOMER_MASTER_UPLOAD: string = "CUSTOMER MASTER UPLOAD";
    public static PAGE_TITLE_COMPONENT_MASTER_UPLOAD: string = "COMPONENT MASTER UPLOAD";
    public static PAGE_TITLE_ASSEMBLY_MASTER_UPLOAD: string = "ASSEMBLY MASTER UPLOAD";
    public static PAGE_TITLE_IM_RAW_MAT_MASTER_UPLOAD: string = "ITEM MASTER RAW MATERIALS UPLOAD";
    public static PAGE_TITLE_PRICE_MASTER_UPLOAD: string = "PRICE MASTER UPLOAD";
    public static PAGE_TITLE_PO_MASTER_UPLOAD: string = "PO MASTER UPLOAD";
    public static PAGE_TITLE_OPEN_PO_MASTER_UPLOAD: string = "OPEN PO MASTER UPLOAD";
    public static PAGE_TITLE_DUMMY_PO_MASTER_UPLOAD: string = "DUMMY PO MASTER UPLOAD";
    public static PAGE_TITLE_PO_ITEM_CODE_MATCH_UPLOAD: string = "PO ITEM CODE MATCH UPLOAD";
    public static PAGE_TITLE_BI_MASTER_UPLOAD: string = "BATCH OR INDIVIDUAL MASTER UPLOAD";
    public static PAGE_TITLE_CTQ_MASTER_UPLOAD: string = "CTQ MASTER UPLOAD";

    public static PAGE_TITLE_ITEM_MASTER_EXPORT: string = "ITEM MASTER EXPORT";
    public static PAGE_TITLE_CUSTOMER_MASTER_EXPORT: string = "CUSTOMER MASTER EXPORT";
    public static PAGE_TITLE_COMPONENT_MASTER_EXPORT: string = "COMPONENT MASTER EXPORT";
    public static PAGE_TITLE_ASSEMBLY_MASTER_EXPORT: string = "ASSEMBLY MASTER EXPORT";
    public static PAGE_TITLE_IM_RAW_MAT_MASTER_EXPORT: string = "ITEM MASTER RAW MATERIALS UPLOAD";
    public static PAGE_TITLE_PRICE_MASTER_EXPORT: string = "PRICE MASTER EXPORT";
    public static PAGE_TITLE_PO_MASTER_EXPORT: string = "PO MASTER EXPORT";
    public static PAGE_TITLE_OPEN_PO_MASTER_EXPORT: string = "OPEN PO MASTER EXPORT";
    public static PAGE_TITLE_DUMMY_PO_MASTER_EXPORT: string = "DUMMY PO MASTER EXPORT";
    public static PAGE_TITLE_TABLE_MASTER_EXPORT: string = "TABLE MASTER EXPORT";
    public static PAGE_TITLE_PO_ITEM_CODE_MATCH_EXPORT: string = "PO ITEM CODE MATCH EXPORT";
    public static PAGE_TITLE_NESTING_MASTER_EXPORT: string = "NESTING MASTER EXPORT";
    public static PAGE_TITLE_BI_MASTER_EXPORT: string = "BATCH OR INDIVIDUAL MASTER EXPORT";
    public static PAGE_TITLE_CTQ_MASTER_EXPORT: string = "CTQ MASTER EXPORT";

    public static PAGE_TITLE_ITEM_MASTER: string = "ITEM MASTER";
    public static PAGE_TITLE_CUSTOMER_MASTER: string = "CUSTOMER MASTER";
    public static PAGE_TITLE_COMPONENT_MASTER: string = "COMPONENT MASTER";
    public static PAGE_TITLE_ASSEMBLY_MASTER: string = "ASSEMBLY MASTER";
    public static PAGE_TITLE_IM_RAW_MAT_MASTER: string = "ITEM MASTER RAW MATERIALS";
    public static PAGE_TITLE_PRICE_MASTER: string = "PRICE MASTER";
    public static PAGE_TITLE_PO_MASTER: string = "PO MASTER";
    public static PAGE_TITLE_OPEN_PO_MASTER: string = "OPEN PO MASTER";
    public static PAGE_TITLE_DUMMY_PO_MASTER: string = "DUMMY PO MASTER";
    public static PAGE_TITLE_TABLE_MASTER: string = "TABLE MASTER";
    public static PAGE_TITLE_PO_ITEM_CODE_MATCH: string = "PO ITEM CODE MATCH";
    public static PAGE_TITLE_BI_MASTER: string = "BATCH OR INDIVIDUAL MASTER";

    public static PAGE_TITLE_PO_APPROVAL: string = "PO APPROVAL";
    public static PAGE_TITLE_LOAD_DAY_LIST: string = "PO LOAD DAY LIST";
    public static PAGE_TITLE_LOADED_DAY_LIST: string = "PO LOADED LIST";
    public static PAGE_TITLE_DUMMY_PO_APPROVAL: string = "DUMMY PO APPROVAL";
    public static PAGE_TITLE_DUMMY_LOAD_DAY_LIST: string = "DUMMY PO LOAD DAY LIST";
    public static PAGE_TITLE_DUMMY_LOADED_DAY_LIST: string = "DUMMY PO LOADED LIST";
    public static PAGE_TITLE_CONSOLIDATION_REPORT: string = "CONSOLIDATION REPORT";
    public static PAGE_TITLE_DUMMY_CONSOLIDATION_REPORT: string = "DUMMY CONSOLIDATION REPORT";
    public static PAGE_TITLE_NESTING: string = "NESTING";
    public static PAGE_TITLE_CTQ_MASTER: string = "CTQ MASTER";

    public static PAGE_TITLE_SCANNED_RECORDS: string = "SCANNED RECORDS";

    public static PROP_REMARKS: string = "remarks";
    public static ERR_MSG_DUPLICATE_RECORD: string = "Duplicate record";


    public static FORM_GROUP_TITLES: {[key: string]: string} = {
        // "itemMaster": "ITEM MASTER",
        "itemMasterProcessFlow": "PROCESS FLOW",
        "itemMasterFinishFlow": "FINISH FLOW",
        "itemMasterQA": "QUALITY ANALYSIS",
        "itemMasterAddon": "ADD-ON FIELDS",
        //"itemMasterImage": "IMAGES"
    }
    public static INPUT_VALUES_UPLOAD: {[key: string]: {}} = {
        [AppConstants.ROUTE_PATH_ITEM_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_ITEM_MASTER,
            "apiUrl": APIConstants.ITEM_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ITEM_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_CUSTOMER_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_CUSTOMER_MASTER,
            "apiUrl": APIConstants.CUSTOMER_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_CUSTOMER_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_COMPONENT_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_COMPONENT_MASTER,
            "apiUrl": APIConstants.COMPONENT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_COMPONENT_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_ASSEMBLY_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_ASSEMBLY_MASTER,
            "apiUrl": APIConstants.ASSEMBLY_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ASSEMBLY_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_IM_RAW_MAT_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_IM_RAW_MAT_MASTER,
            "apiUrl": APIConstants.IM_RAW_MAT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_IM_RAW_MAT_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_PRICE_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_PRICE_MASTER,
            "apiUrl": APIConstants.PRICE_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_PRICE_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_PO_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_PO_MASTER,
            "apiUrl": APIConstants.PO_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_PO_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_OPEN_PO_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_OPEN_PO_MASTER,
            "apiUrl": APIConstants.OPEN_PO_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_OPEN_PO_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_DUMMY_PO_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_DUMMY_PO_MASTER,
            "apiUrl": APIConstants.DUMMY_PO_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_DUMMY_PO_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_PO_ITEM_CODE_MATCH_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_PO_ITEM_CODE_MATCH,
            "apiUrl": APIConstants.PO_ITEM_CODE_MATCH,
            "pageTitle": AppConstants.PAGE_TITLE_PO_ITEM_CODE_MATCH_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_BI_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_BI_MASTER,
            "apiUrl": APIConstants.BI_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_BI_MASTER_UPLOAD,
        },
        [AppConstants.ROUTE_PATH_CTQ_MASTER_UPLOAD] : {
            "jsonLocation": AppConstants.FILE_PATH_CTQ_MASTER,
            "apiUrl": APIConstants.CTQ_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_CTQ_MASTER_UPLOAD,
        }
    }
    public static INPUT_VALUES_ADD_OR_EDIT: {[key: string]: {}} = {
        [AppConstants.ROUTE_PATH_ITEM_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_ITEM_MASTER,
            "apiUrl": APIConstants.ITEM_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ITEM_MASTER,
            "searchUrl": APIConstants.ITEM_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_CUSTOMER_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_CUSTOMER_MASTER,
            "apiUrl": APIConstants.CUSTOMER_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_CUSTOMER_MASTER,
            "searchUrl": APIConstants.CUSTOMER_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_COMPONENT_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_COMPONENT_MASTER,
            "apiUrl": APIConstants.COMPONENT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_COMPONENT_MASTER,
            "searchUrl": APIConstants.COMPONENT_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_ASSEMBLY_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_ASSEMBLY_MASTER,
            "apiUrl": APIConstants.ASSEMBLY_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_ASSEMBLY_MASTER,
            "searchUrl": APIConstants.ASSEMBLY_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_IM_RAW_MAT_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_IM_RAW_MAT_MASTER,
            "apiUrl": APIConstants.IM_RAW_MAT_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_IM_RAW_MAT_MASTER,
            "searchUrl": APIConstants.IM_RAW_MAT_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_PRICE_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_PRICE_MASTER,
            "apiUrl": APIConstants.PRICE_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_PRICE_MASTER,
            "searchUrl": APIConstants.PRICE_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_PO_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_PO_MASTER,
            "apiUrl": APIConstants.PO_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_PO_MASTER,
            "searchUrl": APIConstants.PO_MASTER_SEARCH_URL,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_OPEN_PO_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_OPEN_PO_MASTER,
            "apiUrl": APIConstants.OPEN_PO_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_OPEN_PO_MASTER,
            "searchUrl": APIConstants.OPEN_PO_MASTER,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_DUMMY_PO_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_DUMMY_PO_MASTER,
            "apiUrl": APIConstants.DUMMY_PO_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_DUMMY_PO_MASTER,
            "searchUrl": APIConstants.DUMMY_PO_MASTER,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_TABLE_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_TABLE_MASTER,
            "apiUrl": APIConstants.TABLE_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_TABLE_MASTER,
            "searchUrl": APIConstants.TABLE_MASTER_UPLOAD,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_PO_ITEM_CODE_MATCH_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_PO_ITEM_CODE_MATCH,
            "apiUrl": APIConstants.PO_ITEM_CODE_MATCH,
            "pageTitle": AppConstants.PAGE_TITLE_PO_ITEM_CODE_MATCH,
            "searchUrl": APIConstants.PO_ITEM_CODE_MATCH,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
        [AppConstants.ROUTE_PATH_BI_MASTER_ADD_OR_EDIT] : {
            "jsonLocation": AppConstants.FILE_PATH_BI_MASTER,
            "apiUrl": APIConstants.BI_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_BI_MASTER,
            "searchUrl": APIConstants.BI_MASTER,
            "requiredFieldLabel": "Item Code",
            "requiredFieldName": "itemCode"
        },
    }

    public static INPUT_VALUES_EXCEL_EXPORT: {[key: string]: {}} = {
        [AppConstants.ROUTE_PATH_ITEM_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_ITEM_MASTER,
            "apiUrl": APIConstants.ITEM_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_ITEM_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_CUSTOMER_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_CUSTOMER_MASTER,
            "apiUrl": APIConstants.CUSTOMER_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_CUSTOMER_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_COMPONENT_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_COMPONENT_MASTER,
            "apiUrl": APIConstants.COMPONENT_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_COMPONENT_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_ASSEMBLY_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_ASSEMBLY_MASTER,
            "apiUrl": APIConstants.ASSEMBLY_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_ASSEMBLY_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_IM_RAW_MAT_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_IM_RAW_MAT_MASTER,
            "apiUrl": APIConstants.IM_RAW_MAT_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_IM_RAW_MAT_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_PRICE_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_PRICE_MASTER,
            "apiUrl": APIConstants.PRICE_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_PRICE_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_PO_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_PO_MASTER,
            "apiUrl": APIConstants.PO_MASTER_EXPORT,
            "pageTitle": AppConstants.PAGE_TITLE_PO_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_OPEN_PO_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_OPEN_PO_MASTER,
            "apiUrl": APIConstants.OPEN_PO_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_OPEN_PO_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_DUMMY_PO_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_DUMMY_PO_MASTER,
            "apiUrl": APIConstants.DUMMY_PO_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_DUMMY_PO_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_TABLE_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_TABLE_MASTER,
            "apiUrl": APIConstants.TABLE_MASTER_UPLOAD,
            "pageTitle": AppConstants.PAGE_TITLE_TABLE_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_PO_ITEM_CODE_MATCH_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_PO_ITEM_CODE_MATCH,
            "apiUrl": APIConstants.PO_ITEM_CODE_MATCH,
            "pageTitle": AppConstants.PAGE_TITLE_PO_ITEM_CODE_MATCH_EXPORT,
        },
        [AppConstants.ROUTE_PATH_NESTING_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_NESTING_MASTER,
            "apiUrl": APIConstants.NESTING_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_NESTING_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_BI_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_BI_MASTER,
            "apiUrl": APIConstants.BI_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_BI_MASTER_EXPORT,
        },
        [AppConstants.ROUTE_PATH_CTQ_MASTER_EXPORT] : {
            "jsonLocation": AppConstants.FILE_PATH_CTQ_MASTER,
            "apiUrl": APIConstants.CTQ_MASTER,
            "pageTitle": AppConstants.PAGE_TITLE_CTQ_MASTER_EXPORT,
        }  
      
    }
}