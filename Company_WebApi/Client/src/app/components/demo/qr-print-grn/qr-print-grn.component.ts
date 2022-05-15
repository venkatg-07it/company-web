import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-qr-print-grn',
  templateUrl: './qr-print-grn.component.html',
  styleUrls: ['./qr-print-grn.component.css']
})
export class QrPrintGrnComponent implements OnInit {

  model: string = "";
  loadDayDropDown: string = "";
  loadDayDDList: string[] = [];
  showLoader: boolean = false;
  loadDay: string = "";
  showForm: boolean = true;
  success: boolean = false;
  error: boolean = false;
  errMsg: string = "";

  gridDataList: any[] = [];
  filterData: any[] = [];
  private gridApi: any;
  private gridColumnApi: any;
  columnDefs: ColDef[] = [];
  frameworkComponents: any;
  defaultColDef: any = {};
  fieldInfo: any = {};
  fieldDetails: any = {};
  searchText: string = "";
  pageCount: number = 0;
  rowSelection: string = "";

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

    let date = new Date();
    this.model = this.utilService.getFormattedDate(date);
    this.loadDay = this.utilService.getLoadDayFormatDefaultDate(date);

    


    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));
    


    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      this.fieldInfo = responses[0];
      this.fieldDetails = responses[1];
      
      this.showLoader = false;
    },
      err => {
        this.showLoader = false;
      }
    );



  }

  onDateSelect(event: any) {
    let date = `${event.day}-${event.month}-${event.year}`
    this.loadDay = this.utilService.getLoadDayFormat(event.year, event.month, event.day);
    this.model = this.utilService.getFormattedDateForCustom(event.year, event.month, event.day);
    
    let day = event.day;
    let month = event.month;

    if(day.toString().length == 1) {
      day = '0' + day;
    }

    if(month.toString().length == 1) {
      month = '0' + month;
    }

    this.loadDay = `${day}-${month}-${event.year}`;

   

  }

  loadForm() {
    this.showForm = true;
    let loadDay = this.loadDay + this.loadDayDropDown;
    let url = APIConstants.GRN_MASTER + "/" + this.loadDay;
    this.showLoader = true;
    this.success = false;
    this.error = false;

    this.apiService.postData(url, {}).subscribe((response) => {
      this.showLoader = false;
      if (response && response.length > 0) {
        //this.itemCodeWithCountList = response;
        //this.processResponse();
        this.gridDataList = response;
        this.filterData = this.gridDataList;
        
        this.bindGridData();
      }
    },
      err => {
        console.log("error in while fetching item-code in re-print ", err);
        this.errMsg = "Unable to fetch item code";
        this.error = true;
        this.showLoader = false;
        // this.itemCodeWithCountList = [
        //   {"itemcode": "Item Code 1", "count": 5},
        //   {"itemcode": "Item Code 2", "count": 3}
        // ];
        //this.processResponse();
      })
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
    this.rowSelection = 'multiple';
  }

  doSearch(searchText: string) {

    let rowData = [];

    if (searchText && searchText.trim().length > 3) {
      for (let row of this.gridDataList) {
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
      rowData = this.gridDataList;
    }
    this.filterData = rowData;

  }
  onSearch() {
    this.doSearch(this.searchText);
  }

  print() {
    this.showLoader = true;
    let selectedNodes = this.gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node: any) => node.data);

    let rowData: any[] = [];
    this.gridApi.forEachNodeAfterFilter((node: any) => {
      if (!node.selected) {
        rowData.push(node.data);
      }
    });

    let url = APIConstants.GRN_MASTER + "/QRGRNMaster"
    this.apiService.postData(url, selectedData).subscribe(response => {
      this.showLoader = false;
      this.iterateResponse(response);
    })

  }

  iterateResponse(response: any[]) {
    let printContent = '';
    for (let nestingEntry of response) {

      printContent += this.generateQRContent(nestingEntry);
    }
    this.printData(printContent);

    


  }

  generateQRContent(nestingEntry: any) {
    let imgSrc = nestingEntry.base64Str;
    let loadDay = nestingEntry.partnumber;
    let qtyStr = nestingEntry.qtyStr;
    let itemCode = nestingEntry.recvQty;
    return this.getQRPrintHtmlContent(imgSrc, loadDay, qtyStr, itemCode);
  }

  getQRPrintHtmlContent(src: string, loadDay: string, qty: string, itemCode: string) {
    let marginClass = "divFirst";
    marginClass = "margin-top: -5px";
    let imageMargin = "margin-top: 0px";
    if (this.pageCount > 0) {
      //marginClass = "divNotFirst"
      marginClass = "divNotFirstTop"
      marginClass = "margin-top: 10px";
      imageMargin = "margin-top: 0px";

    }

    let content = `
      <div>
        <div class="centerEle" style="${marginClass}">
          <img src=${src} style="width:82px;height:82px;" style="${imageMargin}" />
        </div>
        <div class="centerEleDiv1">
          <span><b>PART NUMBER-${loadDay} </b></span>
        </div>
        <div class="centerEleDiv2">
          <span><b>QTY - ${itemCode}</b></span>
        </div>
      </div>
    `;
    this.pageCount++;
    return content;
  }

  printData(data: string) {
    let popupWin;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html>       
      <head><style>
      .centerEle {
        display: flex;
        justify-content: center;        
    }
    .centerEleDiv1 {
      display: flex;
      justify-content: center;
      font-size: 10px;
      font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif; 
      padding-bottom: 2px;
      font-weight: 900;
  }
  .centerEleDiv2 {
    display: flex;
    justify-content: center;
    font-family: "Century Gothic", CenturyGothic, AppleGothic, sans-serif; 
    font-size: 10px; 
    font-weight: 900;   
}
.divFirst {
  margin: -5px;
}
.divNotFirst {
  
}
.divNotFirstTop {
  margin-top: 100px;
}
    </style>
      </head>
    <body onload="window.print();window.close()">
      <div>${data}</div>      
    </body>
      </html>`
    );
    popupWin?.document.close();
  }

}
