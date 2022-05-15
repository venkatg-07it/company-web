import { Component, OnInit } from '@angular/core';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-print-qr',
  templateUrl: './print-qr.component.html',
  styleUrls: ['./print-qr.component.css']
})
export class PrintQrComponent implements OnInit {
  apiUrl: string = "";
  imgSrc: SafeResourceUrl | undefined;

  loadDayList: string[] = [];
  filterLoadDayList: string[] = [];
  nestingNoList: string[] = [];
  filterNestingNoList: string[] = [];
  formGroup: FormGroup | undefined;
  src: string = "";
  showLoader: boolean = false;
  
  pageCount: number = 0;
  

  constructor(private apiService: ApiService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.apiUrl = APIConstants.QR_SCANNER;
    this.formGroup = new FormGroup({
      "loadDay": new FormControl("", []),
      "nestingno": new FormControl("", [])
    });

    let apiUrl = APIConstants.MISCELLANEOUS_API + "/NestingLoadday";

    this.apiService.getData(apiUrl).subscribe(response => {
      this.afterFetchLoadDayAPI(response);
    },
      err => {
        console.log("Error in while fetching nesting loadday", err);
        this.afterFetchLoadDayAPI([]);
      });

    let reqBody: any = {
      "itemcode": "i1",
      "ponumber": "p1"
    }


  }

  onKeyup(event: any, type: string) {
    switch (type) {
      case "loadDay":
        this.filterLoadDayList = this.loadDayList.filter((item) => item.toLowerCase().includes(event.target.value.toString().toLowerCase()));
        break;
      case "nestingno":
        this.filterNestingNoList = this.nestingNoList.filter((item) => item.toLowerCase().includes(event.target.value.toString().toLowerCase()));
        if((!event.target.value) || (event.target.value && event.target.value.length == 0)) {
          this.filterNestingNoList = this.nestingNoList;
        }
        console.log("called here.. keyup" );
        break;
    }
  }

  getAPIData(value: string, type: string) {
    let apiUrl = APIConstants.MISCELLANEOUS_API + "/NestingNumberList/" + value;
    switch (type) {
      case "loadDay":
        this.apiService.getData(apiUrl).subscribe(response => {
          this.afterFetchNestingAPI(response);
        }, err => {
          console.log("error while fetching nesting number list", err);
          this.afterFetchNestingAPI([]);
        })
        break;
    }
  }

  afterFetchLoadDayAPI(response: any[]) {
    this.loadDayList = response;
    this.filterLoadDayList = this.loadDayList;
    this.showLoader = false;
  }

  afterFetchNestingAPI(response: any[]) {
    this.nestingNoList = response;
    this.filterNestingNoList = this.nestingNoList;
    this.showLoader = false;
  }

  submit() {
    this.pageCount = 0;
    this.showLoader = true;
    let apiUrl = APIConstants.MISCELLANEOUS_API + "/NestingPrintDetails/"
      + this.formGroup?.get("loadDay")?.value + "/" + this.formGroup?.get("nestingno")?.value;
    this.apiService.getData(apiUrl).subscribe(response => {
      this.showLoader = false;
      this.iterateResponse(response);
    });
  }

  iterateResponse(response: any[]) {
    let printContent = '';
    for (let nestingEntry of response) {
      // if (nestingEntry.batchOrIndividual == "I") {
      //   printContent += this.generateQRForIndividual(nestingEntry);
      // }
      // else {
      //   printContent += this.generateQRForBatch(nestingEntry);
      // }
      printContent += this.generateQRContent(nestingEntry);
    }
    this.printData(printContent);

    this.apiService.getData(APIConstants.UPDATE_PRINT_INFO).subscribe(response => {
      console.log("print information updated");
    }, err => {
      console.log("error in updating print details");
    });

    let apiUrl = APIConstants.MISCELLANEOUS_API + "/NestingNumberList/" + this.formGroup?.get("loadDay")?.value;
    this.apiService.getData(apiUrl).subscribe(response => {
      this.afterFetchNestingAPI(response);
    }, err => {
      console.log("error while fetching nesting number list", err);
      this.afterFetchNestingAPI([]);
    })
  }

  generateQRForBatch(nestingEntry: any) {
    let imgSrc = nestingEntry.base64Str;
    let loadDay = nestingEntry.planningLoadDay;
    let qtyStr = nestingEntry.nestingQty + "B - " + nestingEntry.qty;
    let itemCode = nestingEntry.itemcode;
    return this.getQRPrintHtmlContent(imgSrc, loadDay, qtyStr, itemCode);
  }

  generateQRContent(nestingEntry: any) {
    let imgSrc = nestingEntry.base64Str;
    let loadDay = nestingEntry.planningLoadDay;
    let qtyStr = nestingEntry.qtyStr;
    let itemCode = nestingEntry.itemcode;
    return this.getQRPrintHtmlContent(imgSrc, loadDay, qtyStr, itemCode);
  }

  generateQRForIndividual(nestingEntry: any) {
    let count = nestingEntry.nestingQty;
    let startIndex = nestingEntry.startPosition;
    let content = '';
    count = 10;
    for (let idx = 0; idx < count; idx++) {
      let imgSrc = nestingEntry.base64Str;
      let loadDay = nestingEntry.planningLoadDay;
      let qtyStr = (startIndex + idx) + "/" + nestingEntry.qty;
      let itemCode = nestingEntry.itemcode;
      content += this.getQRPrintHtmlContent(imgSrc, loadDay, qtyStr, itemCode);
    }
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

  getQRPrintHtmlContent(src: string, loadDay: string, qty: string, itemCode: string) {
    let marginClass = "divFirst";
    marginClass = "margin-top: -5px";
    let imageMargin = "margin-top: 0px";
    if(this.pageCount > 0) {
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
          <span><b>LDDAY-${loadDay} </b></span>&nbsp;&nbsp;<span><b>QTY-${qty}</b></span>   
        </div>
        <div class="centerEleDiv2">
          <span><b>ITEM - ${itemCode}</b></span>
        </div>
      </div>
    `;
    this.pageCount++;
    return content;
  }

}
