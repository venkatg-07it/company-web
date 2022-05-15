export class APIConstants {
    
    
    public static HOST_NAME: string = "http://192.168.29.88:5000";
    //public static HOST_NAME: string = "http://localhost:7007";
    //public static HOST_NAME: string = "http://192.168.0.171:5000";
    //public static HOST_NAME: string = "";
    public static LOGIN: string = APIConstants.HOST_NAME + "/login";

    public static ITEM_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/ItemMaster";
    public static ITEM_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME + "/api/ItemMaster";
    public static ITEM_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/ItemMaster";
    public static ITEM_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME + "/api/ItemMaster";

    public static CUSTOMER_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/CustomerMaster";
    public static CUSTOMER_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME + "/api/CustomerMaster";
    public static CUSTOMER_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/CustomerMaster";
    public static CUSTOMER_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME + "/api/CustomerMaster";
    

    public static COMPONENT_MASTER_UPLOAD: string = APIConstants.HOST_NAME +"/api/ComponentMaster";
    public static COMPONENT_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME +"/api/ComponentMaster";
    public static COMPONENT_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/ComponentMaster";
    public static COMPONENT_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME +"/api/ComponentMaster";

    public static ASSEMBLY_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/AssemblyMaster";
    public static ASSEMBLY_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME + "/api/AssemblyMaster";
    public static ASSEMBLY_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/AssemblyMaster";
    public static ASSEMBLY_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME + "/api/AssemblyMaster";

    public static IM_RAW_MAT_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/ItemMasterRM";
    public static IM_RAW_MAT_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME + "/api/ItemMasterRM";
    public static IM_RAW_MAT_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/ItemMasterRM";
    public static IM_RAW_MAT_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME + "/api/ItemMasterRM";

    public static PRICE_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/PriceMaster";
    public static PRICE_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME + "/api/PriceMaster";
    public static PRICE_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/PriceMaster";
    public static PRICE_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME + "/api/PriceMaster";

    public static PO_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/POMaster";
    public static PO_MASTER_ADD_OR_EDIT: string = APIConstants.HOST_NAME + "/api/POMaster";
    public static PO_MASTER_EXPORT: string = APIConstants.HOST_NAME + "/api/POMaster";
    
    public static PO_MASTER_SEARCH_URL: string = APIConstants.HOST_NAME + "/api/POMaster";

    public static TABLE_MASTER_UPLOAD: string = APIConstants.HOST_NAME + "/api/TableMaster";

    public static PO_ITEM_CODE_MATCH: string = APIConstants.HOST_NAME + "/api/POItemCodeMatch";

    public static MISCELLANEOUS_API: string = APIConstants.HOST_NAME + "/api/Miscellaneous";

    public static CONSOLIDATION: string = APIConstants.HOST_NAME + "/api/Consolidation";

    public static DUMMY_CONSOLIDATION: string = APIConstants.HOST_NAME + "/api/DummyConsolidation";

    public static OPEN_PO_MASTER: string = APIConstants.HOST_NAME + "/api/OpenPOMaster";

    public static DUMMY_PO_MASTER: string = APIConstants.HOST_NAME + "/api/DummyMaster";

    public static NESTING_MASTER: string = APIConstants.HOST_NAME + "/api/NestingMaster";

    public static QR_SCANNER: string = APIConstants.HOST_NAME + "/api/QR";

    public static OPERATION: string = APIConstants.HOST_NAME + "/api/Operation/";

    public static MISSING_ASSEMBLY_MASTER: string = APIConstants.HOST_NAME + "/api/Miscellaneous/MissingItemcodeinAssemblyMaster";

    public static MISSING_COMPONENT_MASTER: string = APIConstants.HOST_NAME + "/api/Miscellaneous/MissingItemcodeinComponentMaster";

    public static CHECK_PO: string = APIConstants.HOST_NAME + "/api/Miscellaneous/MissingItemcode";

    public static UPDATE_PRINT_INFO: string = APIConstants.HOST_NAME + "/api/Miscellaneous";

    public static BI_MASTER: string = APIConstants.HOST_NAME + "/api/IndividualBatch";

    public static CTQ_MASTER: string = APIConstants.HOST_NAME + "/api/CTQMaster";

    public static API_SCANNED_QLTY = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedCTQDetails";

    public static API_SAVE_QLTY_DATA = APIConstants.HOST_NAME + "/api/ScannedCTQRecordsQuality";

    public static API_SAVE_PROD_DATA = APIConstants.HOST_NAME + "/api/ScannedCTQRecordsProduction";

    public static API_SAVE_PHYSICAL_QLTY_ACCEPTANCE_PROD_DATA = APIConstants.HOST_NAME + "/api/ScannedPhysicalQtyAcceptanceProduction";

    public static API_SAVE_PHYSICAL_QLTY_ACCEPTANCE_QLTY_DATA = APIConstants.HOST_NAME + "/api/ScannedPhysicalQtyAcceptanceQuality";

    public static API_TRACKING_LIST = APIConstants.HOST_NAME + "/api/Miscellaneous/Processcolor";

    public static API_SAVE_SCANNED_DATA = APIConstants.HOST_NAME + "/api/ScannedRecords";

    public static API_SCANNED_QLTY_REQUIRED_QTY = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedRequiredCTQPercentageCount";

    public static API_SCANNED_QLTY_QTY = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedCTQQualityRecordsCount";

    public static API_SCANNED_PROD_QTY = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedCTQProductionRecordsCount";

    public static API_SCANNED_QTY = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedRecordsCount";


    public static API_UPDATE_RM = APIConstants.HOST_NAME + "/api/Consolidation/PutConsolidatedRMCodeChange";

    public static API_CTQ_QLTY_APPROVED_COUNT = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedApprovedCTQQualityRecordsCount";

    public static API_PROCESS_SIGN_OFF_COUNT = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedPhysicalQtyAcceptanceCountFromCTQQuality";

    public static API_PROD_SIGN_OFF_COUNT = APIConstants.HOST_NAME + "/api/Miscellaneous/ScannedPhysicalQtyAcceptanceCountFromCTQProduction";


    public static GRN_MASTER: string = APIConstants.HOST_NAME + "/api/GRNMaster";

    public static LOC_MASTER: string = APIConstants.HOST_NAME + "/api/LocationMaster";


}