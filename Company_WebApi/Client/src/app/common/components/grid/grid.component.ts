import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IFileResponse } from 'src/app/common/model/IFileResponse';
import { ColDef } from 'ag-grid-community';
import { UtilService } from '../../services/util.service';
import { AppConstants } from '../../constants/app-constants';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel.service';
import { IFieldConfig } from '../../model/i-field-config';
import { AgGridDateComponentComponent } from '../ag-grid-date-component/ag-grid-date-component.component';
import { APIConstants } from '../../constants/api-constants';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input()
  gridData: IFileResponse = {};

  @Input()
  compName: string = "";

  @Input()
  isFileUploaded: Boolean = false;

  @Input()
  isModify: Boolean = false;

  @Input()
  jsonLocation: string = "";

  @Input()
  isSubmitted: boolean = false;

  @Input()
  apiUrl: string = "";

  @Input()
  pageTitle: string = "";

  @Output()
  error = new EventEmitter<string>();

  @Output()
  success = new EventEmitter<boolean>();

  @Output()
  submit = new EventEmitter<boolean>();

  visibleFields: string[] = [];
  fieldMapper: any = {};
  fieldDetails: any;
  fieldInfo: any;
  defaultColDef: any = {};
  dataLoaded: boolean = false;
  validItems: any[] = [];
  invalidItems: any[] = [];


  columnDefs: ColDef[] = [];

  rowData: { [key: string]: any }[] = [];
  filterData: { [key: string]: any }[] = [];
  showLoader: boolean = false;
  showMachineColumn: boolean = false;
  showCheckBox: boolean = false;
  searchText: string = "";
  private gridApi: any;
  private gridColumnApi: any;

  frameworkComponents: any;

  disableSubmit: boolean = false;

  constructor(private utilService: UtilService,
    private apiService: ApiService,
    private excelService: ExcelService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(): void {

    if (this.apiUrl.toLowerCase().endsWith("itemmaster")) {
      this.showCheckBox = true;
    }
    if (this.jsonLocation && (!this.fieldDetails && !this.fieldInfo)) {
      this.showLoader = true;
      let requests: Observable<any>[] = [];
      let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
        this.jsonLocation +
        AppConstants.FILE_NAME_FIELD_INFO;
      let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
        this.jsonLocation +
        AppConstants.FILE_NAME_FIELD_DETAILS;

      requests.push(this.apiService.getData(fieldInfoUrl));
      requests.push(this.apiService.getData(fieldDetailsUrl));

      this.utilService.getBulkAsyncData(requests).subscribe(responses => {
        let fieldInfo = responses[0];
        let fieldDetails = responses[1];

        this.fieldDetails = fieldDetails;
        this.fieldInfo = fieldInfo;
        this.showLoader = false;
        if (fieldDetails["Repeated Columns"]) {
          let repeatedColumns = fieldDetails["Repeated Columns"];
          let fieldsSize = repeatedColumns.size;
          let fields = repeatedColumns.fields;
          let fieldsNames = fieldInfo.repeatedFields;

          for (let idx = 1; idx <= fieldsSize; idx++) {
            for (let fieldName of fieldsNames) {
              let field = fields[fieldName];
              let key = field.label + " " + idx;
              fieldDetails[key] = {
                "label": key,
                "name": field.name + idx,
                "width": 200,
                "type": "text"
              }

              if (field.name == "process" && idx == 1) {
                fieldDetails[key]["required"] = true;
              }
              fieldInfo.fields.push(key);
            }
          }

          this.fieldDetails = fieldDetails;
          this.fieldInfo = fieldInfo;

        }
      });


    }

    console.log("is file upload", this.isFileUploaded);
    if (this.isFileUploaded) {
      this.filterData = [];
    }
    if (this.isSubmitted) {
      this.showLoader = true;
      //this.excelService.downloadExcel(this.pageTitle, this.invalidItems, this.fieldInfo.fields, this.fieldDetails);
      if (this.validItems.length > 0) {
        if (this.isModify) {
          this.putData();
        }
        else {
          this.postData();
        }

      }



    }
    else if (this.filterData.length == 0) {

      this.bindGridData();
    }

  }


  bindGridData() {
    let mandatoryFields: string[] = [];
    let numberFields: string[] = [];
    let dateFields: string[] = [];
    let lengthConstraints: any = {};
    if (this.gridData && this.gridData.mapperFields && this.gridData.colMapper && this.fieldDetails) {

      let fieldLength = this.gridData.mapperFields.length;
      let columnDefs = [];

      for (let idx = 0; idx < fieldLength; idx++) {
        let columnKey = this.gridData.mapperFields[idx];
        let columnValue = this.gridData.colMapper[columnKey];
        let fieldConfig: IFieldConfig = this.fieldDetails[columnValue];
        let width = fieldConfig.width;
        if (fieldConfig.required) {
          mandatoryFields.push(columnKey);
        }
        if (fieldConfig.type == "number") {
          numberFields.push(fieldConfig.name);
        }
        if (fieldConfig.type == "date") {
          dateFields.push(fieldConfig.name);
        }
        if (fieldConfig.length) {
          lengthConstraints[columnKey] = fieldConfig.length;
        }

        let columnDef: any = {
          "field": columnKey,
          "headerName": columnValue,
          "headerTooltip": columnValue,
          "width": width,
          "filter": "agTextColumnFilter"
        };


        if (fieldConfig.pinned) {
          columnDef["pinned"] = true;
        }
        if (fieldConfig.hide) {
          columnDef["hide"] = true;
        }

        if (fieldConfig.type == "date") {
          columnDef['filter'] = 'agDateColumnFilter';
          columnDef["valueFormatter"] = this.utilService.dateFormatter;
          columnDef['filterParams'] = this.utilService.getDateFilterParams();
        }
        columnDefs.push(columnDef);

      }

      this.defaultColDef = {
        width: 150,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
      };

      this.columnDefs = columnDefs;
    }

    if (this.gridData && this.gridData.sheetContent) {
      this.invalidItems = [];
      this.validItems = [];
      this.rowData = this.gridData.sheetContent.map((item, index) => {
        item["sNo"] = ((index) + 1).toString();
        if (!this.isModify) {
          item["liveorRetired"] = "L";
        }
        return item;
      })

      this.filterData = this.rowData;
      this.dataLoaded = true;
      if (this.isModify) {
        mandatoryFields = mandatoryFields.concat([AppConstants.PROP_REMARKS]);
      }
      else {
        mandatoryFields = mandatoryFields.filter((item) => item != AppConstants.PROP_REMARKS);
      }
      this.validateData(mandatoryFields, lengthConstraints, numberFields, dateFields);
      console.log("data ", this.rowData);

    }
    //this.frameworkComponents = { agDateInput: AgGridDateComponentComponent };
  }

  validateData(mandatoryFields: string[], lengthConstraints: any, numberFields: string[], dateFields: string[]) {

    let isItemMaster = this.apiUrl.toLowerCase().endsWith("itemmaster");
    let isAssemblyMaster = this.apiUrl.toLowerCase().endsWith("assemblymaster");
    let isPoMaster = this.apiUrl.toLowerCase().endsWith("pomaster");
    let mandatoryMissingFieldsIds: string[] = [];
    let validData: any[] = [];
    let inValidData: any[] = [];
    let uniqueData: string[] = [];
    let assemblyNumberInfo: any = {};
    let itemFinishFields = [
      "surfacepreparation",
      "primercolour",
      "primerDft",
      "imocolour",
      "imodft",
      "topCoatColour",
      "topCoatDft",
      "specialFinishdetails"
    ];
    for (let item of this.rowData) {
      let isInvalid = false;
      let uniqueId = "";
      for (let field of this.fieldInfo.primary) {
        uniqueId += item[field.name];
      }
      if (isPoMaster && !this.isModify) {
        item["liveorRetired"] = "L";
      }
      if (isAssemblyMaster) {
        let val = assemblyNumberInfo[item.assemblyNumber]
        if (!assemblyNumberInfo[item.assemblyNumber]) {
          val = 1;
        }
        else {
          val++;
        }
        assemblyNumberInfo[item.assemblyNumber] = val;
      }
      if (uniqueData.indexOf(uniqueId) == -1) {
        uniqueData.push(uniqueId);

        for (let columnData in item) {

          let length = lengthConstraints[columnData];
          if (!item[columnData]) {
            item[columnData] = "";
          }
          if (item[columnData].toString().trim() == "-") {
            item[columnData] = "";
          }

          if (isItemMaster) {
            if (columnData == "process1" || columnData == "processrevisionlevel") {
              if (item["lc2"].toLowerCase() == "b") {
                item[columnData] = "-";
              }
            }
            /** blank values */
            if (columnData == "revisionlevel") {
              if (!item[columnData])
                item[columnData] = "-";
            }
            if (columnData == "processrevisionlevel") {
              if (!item[columnData])
                item[columnData] = "-";
            }



          }

          if (length) {
            if (item[columnData].toString().trim().length > length) {
              item[AppConstants.PROP_REMARKS] = AppConstants.ERR_MSG_INVALID_LENGTH_FIELDS + " " + columnData;;
              isInvalid = true;
              break;
            }
          }

          if (numberFields.indexOf(columnData) > -1) {
            try {
              item[columnData] = Number(item[columnData]);
            }
            catch (e) {
              item[AppConstants.PROP_REMARKS] = AppConstants.ERR_MSG_MISSING_NUMBER_FIELDS + " " + columnData;;
              isInvalid = true;
              break;
            }
          }


          if (mandatoryFields.indexOf(columnData) > -1) {
            if (!item[columnData]) {

              mandatoryMissingFieldsIds.push(item.sNo);
              item[AppConstants.PROP_REMARKS] = AppConstants.ERR_MSG_MISSING_MANDATORY_FIELDS + " " + columnData;
              isInvalid = true;
              break;
            }
          }

          if (dateFields.indexOf(columnData) > -1) {

            if (!item[columnData]) {
              item[columnData] = null;
            }
            else {
              item[columnData] = this.utilService.getExcelDateTime(item[columnData]);  
              item[columnData + '1'] = item[columnData];
            }

          }



        }
      }
      else {
        item[AppConstants.PROP_REMARKS] = AppConstants.ERR_MSG_DUPLICATE_RECORD;
        isInvalid = true;
      }
      if (isItemMaster) {
        if (item["finishtype"] && item["finishtype"].toString().trim().length > 0) {
          let isFinishData = false;
          for (let field of itemFinishFields) {
            if (item[field].toString().trim().length > 0) {
              isFinishData = true;
            }
          }
          if (!isFinishData) {
            isInvalid = true;
            item[AppConstants.PROP_REMARKS] = "Finish operation has mandatory";
          }
        }

      }


      if (isInvalid) {
        inValidData.push(item);
      }
      else {
        validData.push(item);
      }
    }

    if (isAssemblyMaster) {
      let assemblyNumberData: string[] = [];
      for (let key in assemblyNumberInfo) {
        if (assemblyNumberInfo[key] == 1) {
          assemblyNumberData.push(key);
        }
      }
      console.log("duplicate assembly numbers", assemblyNumberData);
      this.validItems = validData.filter((item: any) => assemblyNumberData.indexOf(item.assemblyNumber) == -1);
      this.invalidItems = inValidData.concat(
        validData.filter((item: any) => assemblyNumberData.indexOf(item.assemblyNumber) > -1)
          .map((item: any) => {
            item[AppConstants.PROP_REMARKS] = AppConstants.ERR_MSG_ASSEMBLY_MASTER_LESS_ENTRY;
            return item;
          }));
    }
    else {
      this.validItems = validData;
      this.invalidItems = inValidData;
    }


  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  getRequestBody() {

    let reqData: any[] = [];
    if (this.fieldInfo && this.fieldDetails) {
      if (this.fieldInfo.groups && this.fieldInfo.groups.length > 1) {
        let fieldsByGroup: any = {};
        for (let field of this.fieldInfo.fields) {
          let fieldDetail: IFieldConfig = this.fieldDetails[field];
          let group = fieldDetail.group;
          let type = fieldDetail.type;
          if (group) {
            let fields = fieldsByGroup[group];

            if (!fields) {
              fields = [];
            }
            fields.push(fieldDetail.name);

            fieldsByGroup[group] = fields;
          }

        }
        let groupData: any = {};
        for (let item of this.validItems) {

          for (let group of this.fieldInfo.groups) {
            let fields = fieldsByGroup[group];
            let groupItem: any = {};
            for (let field of fields) {
              groupItem[field] = item[field];
            }
            let data = groupData[group];
            if (!data) {
              data = [];
            }

            groupItem["itemcode"] = item["itemcode"];
            groupItem["createddate"] = new Date();
            groupItem["updateddate"] = new Date();
            data.push(groupItem);
            groupData[group] = data;
          }

        }
        reqData = groupData;
      }
      else {
        reqData = this.validItems;

        reqData = this.validItems.map((item) => {
          let data: any = item;
          data["createddate"] = new Date();
          data["updateddate"] = new Date();
          //data["grndate"] = this.utilService.getDateToString(data["grndate"]);
          return data;
        });

      }
    }
    console.log("req data", reqData);

    return reqData;
  }
  putData() {
    let uniqueCode = this.fieldInfo.primary[0].name;
    let uniqueIdList = this.validItems.map((item) => item[uniqueCode]);
    console.log("unique id list", uniqueIdList);
    this.apiService.postData(this.apiUrl + "/true", uniqueIdList).subscribe(response => {
      console.log("db data", response);
      let isAssemblyMaster = this.apiUrl.toLowerCase().endsWith("assemblymaster");
      let result = [];
      if (!isAssemblyMaster) {
        result = this.compareObjectArray(this.validItems, response);
      }
      else {
        result = this.validItems;
      }

      if (result.length > 0) {
        this.apiService.putData(this.apiUrl, result).subscribe(response => {
          this.afterApiOperation(response, result.length);
        });
      }
      else {
        this.showLoader = false;
      }


    });
  }

  compareObjectArray(source: any[], target: any[]) {
    let length = source.length;
    let result: any[] = [];
    let isItemMaster = this.apiUrl.toLowerCase().endsWith("itemmaster");
    let invalidItems = this.invalidItems;
    for (let idx = 0; idx < length; idx++) {
      let srcObj = source[idx];
      let targetObj = target[idx];
      let isChanged = false;
      let isProcessChanged = false;
      for (let key in srcObj) {
        if (key == AppConstants.PROP_REMARKS) {
          if (srcObj[key] == targetObj[key]) {
            srcObj[AppConstants.PROP_REMARKS] = AppConstants.ERR_MSG_MISSING_MANDATORY_FIELDS;
            invalidItems.push(srcObj);
            break;
          }
        }
        if (key != AppConstants.PROP_REMARKS && key != "sNo") {
          if (srcObj[key] != targetObj[key]) {
            isChanged = true;
          }
          if (isItemMaster) {
            if (key.indexOf("process") > -1) {
              if (srcObj[key] != targetObj[key]) {
                isProcessChanged = true;
              }
            }
          }
        }
      }

      if (isProcessChanged) {
        let processValue = srcObj["processrevisionlevel"].toLowerCase();
        switch (processValue) {
          case "a":
            processValue = "b";
            break;
          case "b":
            processValue = "c";
            break;
          case "c":
            processValue = "d";
            break;
          case "d":
            processValue = "e";
            break;
          default:
            processValue = "a";
            break;
        }
      }
      if (isChanged) {
        result.push(srcObj);
      }
    }
    this.invalidItems = invalidItems;
    return result;
  }
  postData() {
    let reqBody = this.getRequestBody();
    if (reqBody.length > 0) {
      let inputLen = reqBody.length;
      this.isSubmitted = false;
      this.apiService.postData(this.apiUrl, reqBody).subscribe(response => {

        this.afterApiOperation(response, inputLen);
      },
        error => {
          console.log("error", error);
          this.rowData = [];
          this.filterData = this.rowData;
          this.showLoader = false;
          this.success.emit(false);
        });
    }

  }

  afterApiOperation(response: any[], inputLen: number) {
    console.log("response", response);
    this.rowData = this.invalidItems;
    this.filterData = this.rowData;
    //let isItemMaster = this.apiUrl.toLowerCase().endsWith("itemmaster");
    let errMsg = "";

    let isCustomerMaster = this.apiUrl.toLowerCase().endsWith("customermaster");
    let isItemMaster = this.apiUrl.toLowerCase().endsWith("itemmaster");
    let isItemMasterRM = this.apiUrl.toLowerCase().endsWith("itemmasterrm");
    let isComponentMaster = this.apiUrl.toLowerCase().endsWith("componentmaster");
    let isAssemblyMaster = this.apiUrl.toLowerCase().endsWith("assemblymaster");
    let isPriceMaster = this.apiUrl.toLowerCase().endsWith("pricemaster");
    let isPOMaster = this.apiUrl.toLowerCase().endsWith("pomaster");
    let isDummyPOMaster = this.apiUrl.toLowerCase().endsWith("dummymaster");
    let isOpemPOMaster = this.apiUrl.toLowerCase().endsWith("openmaster");

    if (isCustomerMaster) {
      errMsg = AppConstants.ERR_MSG_CUSTOMER_MASTER;
    }
    else if (isItemMaster) {
      errMsg = AppConstants.ERR_MSG_ITEM_MASTER;
    }
    else if (isItemMasterRM) {
      errMsg = AppConstants.ERR_MSG_ITEM_MASTER_RM;
    }
    else if (isComponentMaster) {
      errMsg = AppConstants.ERR_MSG_COMPONENT_MASTER;
    }
    else if (isAssemblyMaster) {
      errMsg = AppConstants.ERR_MSG_ASSEMBLY_MASTER;
    }
    else if (isPriceMaster) {
      errMsg = AppConstants.ERR_MSG_PRICE_MASTER;
    }
    else if (isPOMaster) {
      errMsg = AppConstants.ERR_MSG_PO_MASTER;
    }
    else if (isDummyPOMaster) {
      errMsg = AppConstants.ERR_MSG_DUMMY_PO_MASTER;
    }
    else if (isOpemPOMaster) {
      errMsg = AppConstants.ERR_MSG_OPEN_PO_MASTER;
    }

    response = response.map((item: any) => {
      item[AppConstants.PROP_REMARKS] = errMsg;
      return item;
    });

    this.filterData = this.rowData.concat(response);
    this.invalidItems = this.filterData;

    this.success.emit(!(this.invalidItems.length == inputLen));

    this.showLoader = false;
  }

  onChange() {
    //console.log("checked", value);
    let columnDef = this.columnDefs.map((value) => {
      if (value.field?.startsWith("machine")) {
        value.hide = !this.showMachineColumn
      }

      return value;
    });

    this.gridApi.setColumnDefs(columnDef);
  }

  search(event: any) {
    let searchText = event?.target?.value.toLowerCase();
    setTimeout(() => {
      this.showLoader = true;
      this.doSearch(searchText);
      this.showLoader = false;
    }, 100)

  }

  doSearch(searchText: string) {

    let rowData = [];

    if (searchText && searchText.trim().length > 3) {
      for (let row of this.rowData) {
        for (let key in row) {
          let value: string = row[key].toString().toLowerCase();
          if (value.includes(searchText)) {
            rowData.push(row);
            break;
          }
        }
      }
    }
    else {
      rowData = this.rowData;
    }
    this.filterData = rowData;

  }
  onSearch() {
    this.doSearch(this.searchText);
  }



  export() {
    this.showLoader = true;
    let that: any = this;

    setTimeout(function () {
      let rowData: any[] = [];
      that.gridApi.forEachNodeAfterFilter((node: any) => {
        rowData.push(node.data);
      });
      that.excelService.downloadExcel(that.pageTitle, rowData, that.fieldInfo.fields, that.fieldDetails).subscribe((isDownloaded: boolean) => {
        if (isDownloaded) {
          that.showLoader = false;
        }
      });
    }, 100);

  }

}


