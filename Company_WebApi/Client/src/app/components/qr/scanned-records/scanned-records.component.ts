import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { ExcelService } from 'src/app/common/services/excel.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-scanned-records',
  templateUrl: './scanned-records.component.html',
  styleUrls: ['./scanned-records.component.css']
})
export class ScannedRecordsComponent implements OnInit {
  pageTitle: string = AppConstants.PAGE_TITLE_SCANNED_RECORDS;
  showLoader: boolean = true;
  loadDay: string = "";
  model: string = "";
  isDummyPoMaster: boolean = false;
  loadDayDDList: string[] = [];
  loadDayDropDown: string = "";
  fieldDetails: any = null;
  fieldInfo: any = null;
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  gridData: any[] = [];
  filterData:{ [key: string]: any }[] = [];
  exportData:{ [key: string]: any }[] = [];
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  loadDayForAPI: string = "";

  constructor(private utilService: UtilService,
    private apiService: ApiService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    if(!this.fieldDetails || !this.fieldInfo) {
      this.gridSetup();
    }

    let date = new Date();
    this.model = this.utilService.getFormattedDate(date);
    this.loadDay = this.utilService.getLoadDayFormatDefaultDate(date);

    
    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;
    if(this.isDummyPoMaster) {
      dropdownUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoaddayGroupList/D" + this.loadDay;
    }

    this.fetchLoadDayDD(dropdownUrl);
    
  }

  gridSetup() {
    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_SCANNED_RECORDS +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_SCANNED_RECORDS +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));

    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      this.fieldInfo = responses[0];
      this.fieldDetails = responses[1];

      this.bindGridColumns();
    });
  }

  bindGridColumns() {
    let fieldInfo = this.fieldInfo;
    let fieldDetails = this.fieldDetails;
    let columnDefs = [];

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
          fieldInfo.fields.push(key);
        }
      }

      for (let field of fieldInfo.fields) {
        let fieldConfig: IFieldConfig = fieldDetails[field];
        let columnDef: any = {
          field: fieldConfig.name,
          headerName: fieldConfig.label,
          headerTooltip: fieldConfig.label,
          width: fieldConfig.width
        }
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
      this.fieldDetails = fieldDetails;
      this.fieldInfo = fieldInfo;
    }


  }

  onDateSelect(event: any) {
    this.showLoader = true;
    this.loadDay = this.utilService.getLoadDayFormat(event.year, event.month, event.day);
    this.model = this.utilService.getFormattedDateForCustom(event.year, event.month, event.day);
    this.loadDay = this.loadDay.trim();
    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;
    if (this.isDummyPoMaster) {
      dropdownUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoaddayGroupList/D" + this.loadDay;
    }
    this.fetchLoadDayDD(dropdownUrl);
  }

  fetchLoadDayDD(url: string) {
    this.apiService.getData(url).subscribe(response => {
      this.loadDayDDList = response;
      this.showLoader = false;
    },
      err => {
        this.loadDayDDList = [];
        this.showLoader = false;
      });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  onFilterChanged(params: any): void {
    console.log(params.api?.getDisplayedRowCount());
    console.log(params?.api?.rowModel?.rowsToDisplay)
    this.exportData = params?.api?.rowModel?.rowsToDisplay.map((item: any) => item.data);
    
  }

  loadData() {
    this.showLoader = true;    
    this.loadDayForAPI = this.loadDay + this.loadDayDropDown;
    this.loadDayForAPI = this.loadDayForAPI.trim();
    let url = APIConstants.API_SAVE_SCANNED_DATA + "/" + this.loadDayForAPI;
    this.apiService.getData(url).subscribe(result => {
      this.gridData = result.map((item: any, index: number) => {
        return {
          ...item,
          "sNo": (index + 1)
        }
      });
      this.filterData = this.gridData;
      this.exportData = this.filterData;
      this.showLoader = false;
    },
    err => {
      console.log("error in while fetching scanned data", err);
      this.showLoader = false;
    });

  }

  export() {
    this.showLoader = true;
    let that:any = this;
    setTimeout(function() {
       that.excelService.downloadExcel(that.pageTitle, that.exportData, that.fieldInfo.fields, that.fieldDetails ).subscribe((isDownloaded: boolean) => {
          if(isDownloaded) {
            that.showLoader = false;
          }
        });
    }, 100);
  }
}
