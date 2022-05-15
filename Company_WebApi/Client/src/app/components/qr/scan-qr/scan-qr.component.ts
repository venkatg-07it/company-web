import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css']
})
export class ScanQrComponent implements OnInit {

  qrText: string = "";
  formDataList: string[] = [];
  showLoader: boolean = false;
  gridData: any[] = [];
  filterData: { [key: string]: any }[] = [];
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  processList: string[] = [];
  private gridApi: any;
  private gridColumnApi: any;
  process: string = "";
  type: string = "success";
  alertTitle: string = "Success..!";
  alertMsg: string = "";
  showAlert: boolean = false;
  batchOrIndividual: string = "";
  nestingNo: string = "";
  fieldDetails: any = null;
  fieldInfo: any = null;

  constructor(private utilService: UtilService, private apiService: ApiService) { }

  ngOnInit(): void {
    if (!this.fieldDetails || !this.fieldInfo) {
      this.gridSetup();
    }
  }

  scanQR(event: any) {
    this.formDataList.push(event.target.value);
    if (this.formDataList.length == 1) {
      setTimeout(() => {

        this.showAlert = false;
        let data = this.formDataList[this.formDataList.length - 1];
        if (data && data.trim().length > 0) {
          let formData = this.utilService.formatQRDataFromTextForScan(data);
          let scanData = formData.data;

          let value = scanData["quantity"];
          value = value.replace("B", "");
          let qtyData = value.split("/");
          if (qtyData.length == 2) {
            scanData["position"] = qtyData[0].trim();
            scanData["qty"] = qtyData[1].trim();
            scanData["batchOrIndividual"] = "I";
          }
          else {
            qtyData = value.split("-");
            if (qtyData.length == 2) {
              scanData["position"] = qtyData[0].trim();
              scanData["qty"] = qtyData[1].trim();
              scanData["batchOrIndividual"] = "B";
            }

          }
          scanData["sNo"] = this.gridData.length + 1;
          this.processList = formData.processList;

          if (this.gridData.filter((item) =>
            (item.position == scanData.position)
            && (item.processNum == scanData.processNum)).length == 0) {
            let gridData = this.gridData;
            gridData.push(scanData);
            this.gridData = gridData;
            this.filterData = this.gridData;
          }

          this.qrText = "";
          this.formDataList = [];

          if (this.gridApi) {
            this.gridApi.setRowData(this.gridData);
          }

        }

      }, 3000);

    }
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
            "type": "text",
            "hide": true
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



  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  submit() {
    this.showLoader = true;
    if (this.process != "") {
      let data = this.gridData.map((item) => {
        item["process"] = this.process;
        return item;
      });
      let url = APIConstants.API_SAVE_SCANNED_DATA;

      this.apiService.postData(url, data)
        .subscribe(response => {
          if (response && response.length > 0) {
            if (response[0].toString().toLowerCase() == "success") {
              this.type = "success";
              this.alertTitle = "Success..!";
              this.alertMsg = "Data uploaded successfully..!";
            }
            else {
              this.type = "fail";
              this.alertTitle = "Error..!";
              this.alertMsg = "Invalid Process";
            }
          }
          else {
            this.type = "fail";
            this.alertTitle = "Error..!";
            this.alertMsg = "Error in uploading data";
          }

          this.showAlert = true;
          this.showLoader = false;
          this.gridData = [];
          this.filterData = [];
        }, err => {
          this.type = "fail";
          this.alertTitle = "Error..!";
          this.alertMsg = "Error in uploading data";
          this.showAlert = true;
          this.showLoader = false;
          this.gridData = [];
          this.filterData = [];
        });
    }
    else {
      this.type = "fail";
      this.alertTitle = "Error..!";
      this.alertMsg = "Please select process";
      this.showAlert = true;
      this.showLoader = false;
    }

  }

}
