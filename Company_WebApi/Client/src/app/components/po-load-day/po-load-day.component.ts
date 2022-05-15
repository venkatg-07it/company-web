import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { timingSafeEqual } from 'crypto';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

//let sampleData = [{"sNo":"1","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1001","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"KM610249G06","itemcodeforLoading":"KM610249G06","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"5","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"},{"sNo":"2","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1002","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"KM51458950G01","itemcodeforLoading":"KM51458950G01","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"6","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"},{"sNo":"3","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1003","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"KM51458950G02","itemcodeforLoading":"KM51458950G02","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"4","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"},{"sNo":"4","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1004","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"EA092A009G12L01L17L62L71L81","itemcodeforLoading":"EA092A009G12L01L17L62L71L81","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"8","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"}];

@Component({
  selector: 'app-po-load-day',
  templateUrl: './po-load-day.component.html',
  styleUrls: ['./po-load-day.component.css']
})
export class PoLoadDayComponent implements OnInit {

  rowData: any[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: any = {};
  fieldDetails: any;
  fieldInfo: any;
  pageTitle: string = "";
  rowSelection: string = "";
  success: boolean = false;
  submitted: boolean = false;
  showLoader = false;
  uploadSuccess: boolean = false;
  serverErr: boolean = false;
  private gridApi: any;
  private gridColumnApi: any;
  totalPrice: number = 0;

  frameworkComponents: any;
  isDummyPoMaster: boolean = false;

  constructor(private utilService: UtilService,
    private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.isDummyPoMaster = this.router.url.toLowerCase().endsWith("dummy-po-load-day");

    this.pageTitle = AppConstants.PAGE_TITLE_LOAD_DAY_LIST;
    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_PO_MASTER +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_PO_MASTER +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    if (this.isDummyPoMaster) {
      this.pageTitle = AppConstants.PAGE_TITLE_DUMMY_LOAD_DAY_LIST;

      fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
        AppConstants.FILE_PATH_DUMMY_PO_MASTER +
        AppConstants.FILE_NAME_FIELD_INFO;
      fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
        AppConstants.FILE_PATH_DUMMY_PO_MASTER +
        AppConstants.FILE_NAME_FIELD_DETAILS;
    }

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));

    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      let fieldInfo = responses[0];
      let fieldDetails = responses[1];
      this.bindGridData(fieldInfo, fieldDetails);
    }
    );

    let url = APIConstants.CONSOLIDATION + "/UnLoadDayList";
    if(this.isDummyPoMaster) {
      url = APIConstants.DUMMY_CONSOLIDATION + "/DummyUnLoadDayList";
    }
    this.apiService.getData(url).subscribe(data => {
      this.rowData = data;
      this.totalPrice = 0;
      this.rowData.forEach(item => {
        if (item["totalSalePrice"] && !isNaN(item["totalSalePrice"])) {
          this.totalPrice += parseInt(item["totalSalePrice"]);
        }

      })
    }, err => {
      //this.rowData = [];
      console.log(err);
    });

  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  ngOnChanges(): void {
    console.log(this.fieldInfo, this.fieldDetails);
  }

  bindGridData(fieldInfo: any, fieldDetails: any) {
    let columnDefs = [];
    for (let fieldName of fieldInfo.fields) {
      let fieldConfig: IFieldConfig = fieldDetails[fieldName];


      let columnDef: any = {
        "field": fieldConfig.name,
        "headerName": fieldConfig.label,
        "headerTooltip": fieldConfig.label,
        "width": fieldConfig.width,
        "filter": "agTextColumnFilter"
      };

      if (fieldConfig.name == "sNo") {
        columnDef["headerCheckboxSelection"] = true;
        columnDef["headerCheckboxSelectionFilteredOnly"] = true;
        columnDef["checkboxSelection"] = true;
      }
      columnDefs.push(columnDef);

      if (fieldConfig.type == "date") {
        columnDef['filter'] = 'agDateColumnFilter';
        columnDef["valueFormatter"] = this.utilService.dateFormatter;
        columnDef['filterParams'] = this.utilService.getDateFilterParams();
      }

    }

    this.defaultColDef = {
      width: 150,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };

    this.columnDefs = columnDefs;
    //this.rowData = sampleData;
    this.rowSelection = 'multiple';
  }

  onFilterChanged(params: any): void {
    let exportData = params?.api?.rowModel?.rowsToDisplay.map((item: any) => item.data);
    this.totalPrice = 0;
    exportData.forEach((item: any) => {
      if (item["totalSalePrice"] && !isNaN(item["totalSalePrice"])) {
        this.totalPrice += parseInt(item["totalSalePrice"]);
      }

    });

  }

  loadDay() {
    this.submitted = true;
    this.showLoader = true;

    this.success = false;
    this.uploadSuccess = false;
    this.serverErr = false;

    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node: any) => node.data);
    let planningLoadDay = this.utilService.getLoadDayFormatDefaultDate(new Date());
    selectedData = selectedData.map((item: any) => {
      item["planningLoadDay"] = planningLoadDay;
      if(this.isDummyPoMaster) {
        item["planningLoadDay"] = 'D' + planningLoadDay;
      }
      
      let customerServiceLoadDay = item["customerServiceLoadDay"];
      if (customerServiceLoadDay) {
        let loadDate = this.utilService.getLoadDayToDate(planningLoadDay);
        let custLoadDate = this.utilService.getLoadDayToDate(customerServiceLoadDay);
        let days = this.utilService.getDaysBetween2Dates(custLoadDate, loadDate);
        item["ageing"] = days;
      }
      else {
        item["ageing"] = 0;
      }
      return item;
    });


    let rowData: any[] = [];
    this.gridApi.forEachNodeAfterFilter((node: any) => {
      if (!node.selected) {
        rowData.push(node.data);
      }
    });

    let url = APIConstants.PO_MASTER_UPLOAD + "/" + planningLoadDay;
    if(this.isDummyPoMaster) {
      url = APIConstants.DUMMY_PO_MASTER + "/D" + planningLoadDay;
    }
    this.apiService.putData(url, selectedData)
      .subscribe((item: any) => {
        this.showLoader = false;
        this.success = true;
        this.uploadSuccess = true;
        if (item.length > 0) {
          rowData = rowData.concat(item).map((item, index) => {
            item["sNo"] = index + 1;
            return item;
          });
          this.uploadSuccess = false;

        }
        this.rowData = rowData;

      }, err => {
        this.showLoader = false;
        this.success = false;
        this.serverErr = true;
      });
  }

  reject() {

  }
}

