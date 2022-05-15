import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { APIConstants } from '../../constants/api-constants';
import { AppConstants } from '../../constants/app-constants';
import { IFieldConfig } from '../../model/i-field-config';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel.service';
import { UtilService } from '../../services/util.service';
import { AnchorCellRenderer } from '../cell-renderer/anchor-cell-renderer';

@Component({
  selector: 'app-cr-report',
  templateUrl: './cr-report.component.html',
  styleUrls: ['./cr-report.component.css']
})
export class CrReportComponent implements OnInit {

  @Input()
  reportDate: Date | undefined;
  @Input()
  reportName: string | undefined;
  @Input()
  data: any[] = [];
  @Input()
  fieldDetails: any;
  @Input()
  fieldInfo: any;
  @Input()
  title: string = "";

  @Output()
  loader = new EventEmitter<boolean>();

  rowData: any[] = [];
  filterData: any[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: any = {};

  pageTitle: string = "";
  rowSelection: string = "";
  success: boolean = false;
  submitted: boolean = false;
  showLoader = false;
  searchText: string = "";
  fields: any = {};

  private gridApi: any;
  private gridColumnApi: any;

  frameworkComponents: any;

  showModel: boolean = false;
  modelItem: any = {};

  rmCode: string = "";
  rmDesc: string = "";
  oldRmCode: string = "";

  type: string = "success";
  alertTitle: string = "Success..!";
  alertMsg: string = "";
  showAlert: boolean = false;

  constructor(private utilService: UtilService,
    private excelService: ExcelService,
    private apiService: ApiService) { }

  ngOnInit(): void {

    this.frameworkComponents = {
      anchorCellRenderer: AnchorCellRenderer
    };
    // this.rowData = [];

    // let requests: Observable<any>[] = [];
    // let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
    //                       AppConstants.FILE_PATH_CONSOLIDATION_REPORT + 
    //                       AppConstants.FILE_NAME_FIELD_INFO;
    // let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
    //                       AppConstants.FILE_PATH_CONSOLIDATION_REPORT + 
    //                       AppConstants.FILE_NAME_FIELD_DETAILS;

    //   requests.push(this.apiService.getData(fieldInfoUrl));
    //   requests.push(this.apiService.getData(fieldDetailsUrl));

    //   this.utilService.getBulkAsyncData(requests).subscribe(responses => {
    //     if(this.reportName) {          
    //       this.fieldInfo = responses[0][this.reportName];
    //       this.fieldDetails = responses[1][this.reportName].fields;          

    //     }

    //   }
    // );

  }
  ngOnChanges() {

    // let data = this.data.filter(item => item.key == this.reportName);
    // if(data.length > 0) {
    // this.rowData = data[0].value.map((item: any, index: number) => {
    //   item["sNo"] = index + 1;
    //   return item;
    // });

    // }
    this.bindGridData(this.fieldInfo, this.fieldDetails);
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }



  bindGridData(fieldInfo: any, fieldDetails: any) {
    let columnDefs = [];
    let dateFields = [];
    for (let fieldName of fieldInfo.fields) {
      let fieldConfig: IFieldConfig = fieldDetails[fieldName];
      let columnDef: any = {
        "field": fieldConfig.name,
        "headerName": fieldConfig.label,
        "width": fieldConfig.width,
        "filter": "agTextColumnFilter"
      };

      if (fieldConfig.type == 'date') {
        dateFields.push(fieldConfig.name);
        columnDef["valueFormatter"] = this.utilService.dateFormatter;
        columnDef['filter'] = 'agDateColumnFilter';
        columnDef['filterParams'] = this.utilService.getDateFilterParams();
      }

      if (fieldConfig.name.startsWith("process")) {
        columnDef['cellStyle'] = (params: any) => {
          console.log("params ", params)
          if (params.value.trim().length > 0) {
            let name = "color" + fieldConfig.name;
            name = name.replace("process", "");
            return { color: params.data[name] }
          }

          return null;
        }
      }

      if (fieldConfig.name == "rmCode" && this.reportName == 'component-list') {
        let that = this;
        columnDef["cellRenderer"] = "anchorCellRenderer";
        columnDef["cellRendererParams"] = {
          that: that,
          clicked: function (field: any) {
            this.that.openPopup(field);
          }
        };
      }

      columnDefs.push(columnDef);

    }
    this.fields["date"] = dateFields;
    this.defaultColDef = {
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };

    this.columnDefs = columnDefs;


    for (let item of this.data) {
      for (let key in item) {
        if (this.fields["date"] && this.fields["date"].indexOf(key) > -1) {
          item[key] = new Date(item[key]);
        }
      }
    }
    this.rowData = this.data;
    this.filterData = this.rowData;
    //this.rowData = sampleData;

  }

  openPopup(data: any) {
    this.showAlert = false;
    this.showModel = true;
    this.modelItem = JSON.parse(JSON.stringify(data.data));
    this.rmCode = this.modelItem["rmCode"];
    this.rmDesc = this.modelItem["rmDescription"];
    this.oldRmCode = this.modelItem["rmCode"];
  }

  storeRM() {
    
    this.modelItem["rmCode"] = this.rmCode;
    this.modelItem["rmDescription"] = this.rmDesc;
    let itemcode = this.modelItem["itemcode"];

    let loadDay = this.title.split("-")[0].trim();

    let url = APIConstants.API_UPDATE_RM + "/"
          + loadDay + "/"+  itemcode + "/" +  this.oldRmCode + "/" +this.rmCode + "/" + this.rmDesc;

    this.apiService.putData(url, [this.modelItem])
    .subscribe((result) => {
      this.type = "success";
          this.alertTitle = "Success..!";
          this.alertMsg = "Data uploaded successfully..!";
          this.showAlert = true;
          this.showLoader = false;
    }, err => {
      this.type = "fail";
      this.alertTitle = "Error..!";
      this.alertMsg = "Error in uploading data";
      this.showAlert = true;
      this.showLoader = false;
    })
    
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
    this.loader.emit(true);
    let that: any = this;

    setTimeout(function () {
      let rowData: any[] = [];
      that.gridApi.forEachNodeAfterFilter((node: any) => {
        rowData.push(node.data);
      });
      that.excelService.downloadExcelReport(that.title, that.reportName, rowData, that.fieldInfo.fields, that.fieldDetails).subscribe((isDownloaded: boolean) => {
        if (isDownloaded) {
          that.loader.emit(false);
        }
      });
    }, 100);
  }

  closePopup() {
    this.showModel = false;
    this.showAlert = false;
  }

}
