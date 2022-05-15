import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AnchorCellRenderer } from 'src/app/common/components/cell-renderer/anchor-cell-renderer';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

//let sampleData = [{"sNo":"1","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1001","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"KM610249G06","itemcodeforLoading":"KM610249G06","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"5","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"},{"sNo":"2","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1002","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"KM51458950G01","itemcodeforLoading":"KM51458950G01","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"6","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"},{"sNo":"3","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1003","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"KM51458950G02","itemcodeforLoading":"KM51458950G02","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"4","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"},{"sNo":"4","customerName":"TRANQUIL  POWER SYSTEM PVT LTD","customerCode":"CUS0019","ponumber":"P1004","podate":"2021-10-25T00:00:00.000Z","pomodifiedDate":"","potype":"","poscanedImage":"","hsncode":"","salesOrderNumber":"","poitemcode":"EA092A009G12L01L17L62L71L81","itemcodeforLoading":"EA092A009G12L01L17L62L71L81","itemdescription":"","revisionLevel":"","unitCostorBasicPrice":"","podeliveryDate":"","podeliveryQty":"8","totalSalePrice":"","uom":0,"suom":0,"taxset":"","taxclass":"","fullAddress":"","realisticDeliveryDate":"","remarks":"","customerServiceLoadDay":"","planningLoadDay":"","ageing":"","samrajInvoiceDate":"","dispatchedQty":"","dispatch100PercentorPartial":"","cot":"","liveorRetired":"","createddate":"2021-11-16T08:02:46.865Z","updateddate":"2021-11-16T08:02:46.865Z"}];
@Component({
  selector: 'app-po-approval',
  templateUrl: './po-approval.component.html',
  styleUrls: ['./po-approval.component.css']
})
export class PoApprovalComponent implements OnInit {

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
  dateFields: string[] = [];
  pdfSrc: SafeResourceUrl | undefined;

  private gridApi: any;
  private gridColumnApi: any;
  totalPrice: number = 0;
  isDummyPoMaster: boolean = false;
  frameworkComponents: any;
  showModel: boolean = false;
  modelItem: any[] = [];
  src: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  comments: string = "";
  commentsRequired: boolean = false;

  constructor(private utilService: UtilService,
    private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.frameworkComponents = {
      anchorCellRenderer: AnchorCellRenderer
    };

    this.isDummyPoMaster = this.router.url.toLowerCase().endsWith("dummy-po-approval");
    //let isDummyPOMaster = this.router.url.toLowerCase().endsWith("dummy-po-approval");
    // let isOpemPOMaster = this.apiUrl.toLowerCase().endsWith("openmaster");


    this.pageTitle = AppConstants.PAGE_TITLE_PO_APPROVAL;
    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_PO_MASTER +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_PO_MASTER +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    if (this.isDummyPoMaster) {
      this.pageTitle = AppConstants.PAGE_TITLE_DUMMY_PO_APPROVAL;
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
      this.fieldDetails = fieldDetails;
      this.fieldInfo = fieldInfo;
      this.bindGridData(fieldInfo, fieldDetails);
    }
    );
    let apiUrl = APIConstants.CONSOLIDATION + "/UnApprovedList";

    if(this.isDummyPoMaster) {
      apiUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyUnApprovedList";
    }

    this.apiService.getData(apiUrl).subscribe(data => {
      this.rowData = data;
      this.validateData(this.rowData);
    }, err => {
      //this.rowData = [];
      console.log(err);
    });


    this.commentsRequired = false;

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
    let dateFields: string[] = [];
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
        dateFields.push(fieldConfig.name);
      }

      if (fieldConfig.name == "ponumber") {
        let that = this;
        columnDef["cellRenderer"] = "anchorCellRenderer";
        columnDef["cellRendererParams"] = {
          that: that,
          clicked: function (field: any) {
            this.that.openPdfViewer(field);
          }
        };
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
    this.dateFields = dateFields;
    this.rowSelection = 'multiple';
  }

  openPdfViewer(data: any) {
    
    this.showLoader = true;

    let modelItem: any[] = [];
    for (let fields of this.fieldInfo.modelForm.fields) {
      let fieldsList: any[] = [];
      for (let field of fields) {

        let fieldConfig: IFieldConfig = this.fieldDetails[field];
        if(fieldConfig.type == "date") {
          fieldsList.push(
            this.utilService.dateFormatter({
              value: data.data[fieldConfig.name]
            })
          );
        }
        else {
          fieldsList.push(data.data[fieldConfig.name]);
        }
        
      }
      modelItem.push({
        "headers": fields,
        "values": [fieldsList]
      });
    }
    this.modelItem = modelItem;
    let selectedNodes = this.gridApi.getSelectedNodes()
    for (let node of selectedNodes) {
      let row = node.data;
      node.setSelected(false);
    }
    this.apiService.getData(APIConstants.OPERATION +"/getPoImage/" + data.value).subscribe(response => {
      if (response.length > 0) {
        this.src = "data:application/pdf;base64," + response[0];
        this.showModel = true;
      }
      else {
        console.log("no images");
        this.showLoader = false;
        this.showModel = true;
      }

    }, err => {
      console.log("no images");
      this.showLoader = false;
      this.showModel = true;
    })



  }

  closePopup() {
    this.showModel = false;
  }
  validateData(rowData: any[]) {
    this.totalPrice = 0;



    for (let data of rowData) {

      if (data["totalSalePrice"] && !isNaN(data["totalSalePrice"])) {
        this.totalPrice += parseInt(data["totalSalePrice"]);
      }
      if(data["planningLoadDay"] && data["planningLoadDay"].length == 1) {
        data["planningLoadDay"] = '';
      }
      for (let field in data) {

        if (this.dateFields.indexOf(field) > -1) {
          
         
          data[field] = this.utilService.getDateForPayLoad(data[field]);
          console.log("date", field, data[field]);
        }

      }
      data["createddate"] = new Date(data["createddate"]);
      data["updateddate"] = new Date(data["updateddate"]);
      //updateddate
      //createddate
    }
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

  approve() {
    this.storeData("Approved", "");
  }



  reject() {
    if(this.comments.trim().length > 0) {
      this.commentsRequired = false;
      this.storeData("Rejected", this.comments);
    }
    else {
      this.commentsRequired = true;
    }
  }

  storeData(status: string, remarks: string){
    this.submitted = true;
    this.showLoader = true;
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node: any) => node.data);
    this.validateData(selectedData);
    selectedData = selectedData.map((item: any) => {
      item["status"] = status;
      item["remarks"] = remarks;
      return item;
    });
    let rowData: any[] = [];
    this.gridApi.forEachNodeAfterFilter((node: any) => {
      if (!node.selected) {
        rowData.push(node.data);
      }
    });

    

    let url = APIConstants.PO_MASTER_UPLOAD;
    if(this.isDummyPoMaster) {
      url = APIConstants.DUMMY_PO_MASTER;
    }
    this.apiService.putData(url, selectedData)
      .subscribe((item: any) => {
        this.showLoader = false;
        this.success = true;
        this.rowData = rowData;
      }, err => {
        this.showLoader = false;
        this.success = false;
      });
  }

  afterPdfLoad() {
    this.showLoader = false;
  }
}

const filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => {
    const cellDate = new Date(cellValue);
    console.log(filterLocalDateAtMidnight.getTime(), cellDate.getTime());
    if (
      (filterLocalDateAtMidnight.getDay() === cellDate.getDay()) &&
      (filterLocalDateAtMidnight.getMonth() === cellDate.getMonth()) &&
      (filterLocalDateAtMidnight.getFullYear() === cellDate.getFullYear())) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return -1;
  },
};
