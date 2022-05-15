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
  selector: 'app-tracking-list',
  templateUrl: './tracking-list.component.html',
  styleUrls: ['./tracking-list.component.css']
})
export class TrackingListComponent implements OnInit {
  jsonLocation: string = "";
  apiUrl: string = "";
  pageTitle: string = "TRACKING LIST";

  gridData: any[] = [];
  filterData: { [key: string]: any }[] = [];
  exportData: { [key: string]: any }[] = [];
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  fieldDetails: any = {};
  fieldInfo: any = {};
  searchText: string = "";
  private gridApi: any;
  private gridColumnApi: any;
  frameworkComponents: any;
  loader: boolean = false;
  loadDayDDList: string[] = [];
  loadDayDropDown: string = "";
  loadDay: string = "";
  model: string = "";
  isDummy: boolean = false;
  constructor(private apiService: ApiService,
    private utilService: UtilService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_TRACKING_LIST +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_TRACKING_LIST +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    let date = new Date();
    this.model = this.utilService.getFormattedDate(date);
    this.loadDay = this.utilService.getLoadDayFormatDefaultDate(date);

    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));

    requests.push(this.apiService.getData(dropdownUrl));





    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      this.fieldInfo = responses[0];
      this.fieldDetails = responses[1];
      this.loadDayDDList = responses[2];
      this.createGrid();
    })
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  onSearch() {
    this.doSearch(this.searchText);
  }

  doSearch(searchText: string) {

    let rowData = [];

    if (searchText && searchText.toString().trim().length > 3) {
      for (let row of this.gridData) {
        for (let key in row) {
          if (row[key] && row[key].toString().trim().length > 0) {
            let value: string = row[key].toString().toLowerCase();
            if (value.includes(searchText)) {
              rowData.push(row);
              break;
            }
          }

        }
      }
    }
    else {
      rowData = this.gridData;
    }
    this.filterData = rowData;
    this.exportData = this.filterData;


  }

  export() {
    this.loader = true;
    let that: any = this;
    setTimeout(function () {
      that.excelService.downloadExcel(that.pageTitle, that.exportData, that.fieldInfo.fields, that.fieldDetails).subscribe((isDownloaded: boolean) => {
        if (isDownloaded) {
          that.loader = false;
        }
      });
    }, 100);

  }

  getProcessList() {
    this.loader = true;
    let loadDayForAPI = this.loadDay + this.loadDayDropDown;
    loadDayForAPI = loadDayForAPI.trim();
    let processListUrl = APIConstants.API_TRACKING_LIST + "/" + loadDayForAPI;
    this.apiService.getData(processListUrl).subscribe((response: any) => {
      this.gridData = response.map((item: any, index: number) => {
        item["sNo"] = (index + 1);
        return item;
      });
      this.filterData = this.gridData;
      this.exportData = this.filterData;
      this.loader = false;
    })
  }

  onDateSelect(event: any) {
    this.loader = true;
    this.loadDay = this.utilService.getLoadDayFormat(event.year, event.month, event.day);
    this.model = this.utilService.getFormattedDateForCustom(event.year, event.month, event.day);
    this.loadDay = this.loadDay.trim();
    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;
    if (this.isDummy) {
      dropdownUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoaddayGroupList/D" + this.loadDay;
    }

    this.apiService.getData(dropdownUrl).subscribe(response => {
      this.loadDayDDList = response;
      this.loader = false;
    },
      err => {
        this.loadDayDDList = [];
        this.loader = false;
      });
  }

  createGrid() {
    let columnDefs = [];

    for (let fieldName of this.fieldInfo.fields) {
      let fieldConfig: IFieldConfig = this.fieldDetails[fieldName];

      let columnDef: any = {
        "field": fieldConfig.name,
        "headerName": fieldConfig.label,
        "headerTooltip": fieldConfig.label,
        "width": fieldConfig.width,
        "filter": "agTextColumnFilter"
      };

      if (fieldConfig.name.startsWith("process")) {
        columnDef['cellStyle'] = (params: any) => {          
          if (params.value.trim().length > 0) {
            let name = "color" + fieldConfig.name;
            name = name.replace("process", "");
            return { color: 'white',
              backgroundColor: params.data[name] }
          }

          return null;
        }
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
}







