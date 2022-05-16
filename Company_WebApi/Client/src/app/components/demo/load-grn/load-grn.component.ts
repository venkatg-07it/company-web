import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-load-grn',
  templateUrl: './load-grn.component.html',
  styleUrls: ['./load-grn.component.css']
})
export class LoadGrnComponent implements OnInit {

  formDataListLoc: string[] = [];
  formDataListGrn: string[] = [];
  locationData: any = {};
  showLoader: boolean = false;
  fieldInfo: any = {};
  fieldDetails: any = {};
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  frameworkComponents: any;
  gridDataList: any[] = [];
  filterData: any[] = [];
  locQR: string = "";
  grnQR: string = "";
  private gridApi: any;
  private gridColumnApi: any;
  type: string = "success";
  alertTitle: string = "Success..!";
  alertMsg: string = "";
  showAlert: boolean = false;

  constructor(private utilService: UtilService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.showLoader = true;
    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      "grn-master/" +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      "grn-master/" +
      AppConstants.FILE_NAME_FIELD_DETAILS;

   

    


    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));
    


    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      this.fieldInfo = responses[0];
      this.fieldDetails = responses[1];
      this.bindGridData();
      this.showLoader = false;
    },
      err => {
        this.showLoader = false;
      }
    );
  }

  onLocQRChange(event: any) {
    console.log("event", event.target.value);
    this.formDataListLoc.push(event.target.value);
    console.log("event pushed");
    if (this.formDataListLoc.length == 1) {
      setTimeout(() => {
        console.log("event entered");
        let data = this.formDataListLoc[this.formDataListLoc.length - 1];
        console.log("event entered", data);
        if (data && data.trim().length > 0) {
          let formData = this.utilService.formatQRDataFromTextForScan(data);
          console.log("formData", formData);
          this.locationData = formData;
          this.formDataListLoc = [];
          this.locQR = "";
        }
      }, 3000);
    }
  }

  onGrnQRChange(event: any) {
    this.formDataListGrn.push(event.target.value);
    if (this.formDataListGrn.length == 1) {
      setTimeout(() => {
        let data = this.formDataListGrn[this.formDataListGrn.length - 1];
        if (data && data.trim().length > 0) {
          let formData = this.utilService.formatQRDataFromTextForScan(data);
          
          formData["location"] = this.locationData.locnum;

          if (this.gridDataList.filter((item) =>
            (item.grndate == formData.grndate)
            && (item.poorMonumber == formData.poorMonumber)
            && (item.vendorname == formData.vendorname)
            && (item.partnumber == formData.partnumber)
            && (item.recvQty == formData.recvQty)).length == 0) {
            let gridData = this.gridDataList;
            gridData.push(formData);
            this.gridDataList = gridData;
            this.filterData = this.gridDataList;
          }

          this.grnQR = "";
          this.formDataListGrn = [];

          if (this.gridApi) {
            this.gridApi.setRowData(this.gridDataList);
          }
          this.formDataListGrn = [];
        }
      }, 3000);
    }
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }


  bindGridData() {
    let fieldInfo = this.fieldInfo;
    let fieldDetails = this.fieldDetails;
    let columnDefs = [];

    for (let fieldName of fieldInfo.fields) {
      let fieldConfig: IFieldConfig = fieldDetails[fieldName];
      let columnDef: any = {
        "field": fieldConfig.name,
        "headerName": fieldConfig.label,
        "width": fieldConfig.width,
        "filter": "agTextColumnFilter"
      };

      if (fieldConfig.type == "date") {
        columnDef['filter'] = 'agDateColumnFilter';
        columnDef["valueFormatter"] = this.utilService.convertUTCDateToLocalDate;
        columnDef['filterParams'] = this.utilService.getDateFilterParams();
      }

      if (fieldConfig.name == "sNo") {
        columnDef["headerCheckboxSelection"] = true;
        columnDef["headerCheckboxSelectionFilteredOnly"] = true;
        columnDef["checkboxSelection"] = true;
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

  addLoc() {
    this.showLoader = true;
    this.apiService.putData(APIConstants.GRN_MASTER, this.gridDataList)
    .subscribe((response) => {
      console.log("success", response);
      this.type = "success";
      this.alertTitle = "Success..!";
      this.alertMsg = "Data stored successfully..!";
      this.gridDataList = [];
      this.filterData = [];
      this.showLoader = false;
      this.showAlert = true;
    }, err => {
      this.type = "success";
      this.alertTitle = "Success..!";
      this.alertMsg = "Data stored successfully..!";
      this.gridDataList = [];
      this.filterData = [];
      this.showLoader = false;
      this.showAlert = true;
    });
  }

}
