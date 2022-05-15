import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-qr-print-loc',
  templateUrl: './qr-print-loc.component.html',
  styleUrls: ['./qr-print-loc.component.css']
})
export class QrPrintLocComponent implements OnInit {

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
    
    this.bindGridData();
    this.apiService.getData(APIConstants.LOC_MASTER).subscribe(response => {
      this.gridDataList = response.map((item: any, index: number)=> {
        item["sNo"] = index + 1;
        return item;
      });  
      this.filterData = this.gridDataList;
    })

  }

  

  

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  bindGridData() {
    
    let columnDefs = [];
    let columnDef: any = {
      "field": "sNo",
      "headerName": "S.No.",
      "width": 200,
      "filter": "agTextColumnFilter",
      "headerCheckboxSelection": true,
      "headerCheckboxSelectionFilteredOnly": true,
      "checkboxSelection": true
    };
    columnDefs.push(columnDef);
    columnDef = {
      "field": "locnum",
      "headerName": "Location Number",
      "width": 500,
      "filter": "agTextColumnFilter"
    };
    columnDefs.push(columnDef);
    columnDef =  {
      "field": "locdesc",
      "headerName": "Location Description",
      "width": 500,
      "filter": "agTextColumnFilter"
    };
    columnDefs.push(columnDef);

    
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

    let url = APIConstants.LOC_MASTER + "/QRLOCMaster"
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
    let loadDay = nestingEntry.locnum;
    let qtyStr = nestingEntry.qtyStr;
    let itemCode = nestingEntry.locdesc;
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
          <span><b>LOC NUMBER-${loadDay} </b></span>
        </div>
        <div class="centerEleDiv2">
          <span><b>LOC DESC - ${itemCode}</b></span>
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
