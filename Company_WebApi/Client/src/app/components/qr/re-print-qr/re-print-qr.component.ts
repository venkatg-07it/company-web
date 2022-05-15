import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-re-print-qr',
  templateUrl: './re-print-qr.component.html',
  styleUrls: ['./re-print-qr.component.css']
})
export class RePrintQrComponent implements OnInit {

  model: string = "";
  loadDayDropDown: string = "";
  loadDayDDList: string[] = [];
  showLoader:boolean = false;
  loadDay: string = "";
  isDummyPoMaster: boolean = false;
  showForm: boolean = false;
  formGroup: FormGroup | undefined;
  qrData: any[] = [];
  itemCodeWithCountList: any[] = [];
  itemCodeList: string[] = [];
  filterItemCodeList: string[] = [];
  qtyReadOnly: boolean = true;

  success: boolean = false;
  error: boolean = false;
  errMsg: string = "";
  pageCount: number = 0;

  constructor(private utilService: UtilService, private apiService: ApiService) { }

  ngOnInit(): void {
    let date = new Date();
    this.model = this.utilService.getFormattedDate(date);
    this.loadDay = this.utilService.getLoadDayFormatDefaultDate(date);

    this.formGroup = new FormGroup({      
      "itemcode": new FormControl('', [Validators.required]),
      "quantity": new FormControl('', [Validators.required]),
      "totalQuantity": new FormControl('0', [Validators.required])
    });

    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;

    this.apiService.getData(dropdownUrl).subscribe((response) => {
      this.loadDayDDList = response;
    })
  }



  onDateSelect(event: any){    
    this.loadDay = this.utilService.getLoadDayFormat(event.year, event.month, event.day);
    this.model = this.utilService.getFormattedDateForCustom(event.year, event.month, event.day);
    this.loadDay = this.loadDay.trim();

    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;

    this.apiService.getData(dropdownUrl).subscribe((response) => {
      this.loadDayDDList = response;
    })
    
  }

  loadForm() {
    this.showForm = true;
    let url = APIConstants.MISCELLANEOUS_API + "/NestingItemcodeList/" + this.loadDay;
    this.showLoader = true;
    this.success = false;
    this.error = false;
    
    this.apiService.getData(url).subscribe((response)=> {
      if(response && response.length > 0) {
        this.itemCodeWithCountList = response;
        this.processResponse();
        
      }
    },
    err => {
      console.log("error in while fetching item-code in re-print ", err);
      this.errMsg = "Unable to fetch item code";
      this.error = true;
      this.itemCodeWithCountList = [
        {"itemcode": "Item Code 1", "count": 5},
        {"itemcode": "Item Code 2", "count": 3}
      ];
      this.processResponse();
    })
  }

  processResponse() {
    this.itemCodeList = this.itemCodeWithCountList.map((item) => item.itemcode);
    this.filterItemCodeList = this.itemCodeList;
    this.showLoader = false;
  }

  selectLoadDay() {
    this.loadDay = this.loadDayDropDown + this.loadDay;
    
  }

  addFormData() {
    // let formValue = this.formGroup?.value;
    // let sNo = 1;
    // let len = this.qrData.length;
    // if(len > 0) {
    //   sNo = this.qrData[len - 1].sNo + 1;
    // }
    // formValue["loadday"] = this.loadDay;
    // formValue["sNo"] = sNo;
    // this.qrData.push(this.formGroup?.value);
    // this.formGroup?.patchValue({
    //   "quantity": ""
    // });
    this.showLoader = true;
    let data = this.formGroup?.value;
    let itemcode = data.itemcode;
    let qty = data.quantity;
    let url = APIConstants.MISCELLANEOUS_API + "/NestingRePrintDetails/" + this.loadDay + "/" + itemcode + "/" + qty;
    this.apiService.getData(url).subscribe(result => {
      this.showLoader = false;
      if(result.length > 0) {
        this.iterateResponse(result);
      }
      else {
        this.error = true;
        this.errMsg = "There is no printing data for this Itemcode"
      }
      
    }, err => {
      this.showLoader = false;
      console.log("error in fetching reprint data");
    })
    
  }

  deleteQrData(item: any) {
    let data = this.qrData;
    data = data.filter((itm)=> itm.sNo !== item.sNo);
    this.qrData = data;
  }

  onKeyup(event: any){
    this.filterItemCodeList = this.itemCodeList.filter((item) => item.toLowerCase().includes(event.target.value.toString().toLowerCase()));
  }

  getAPIData(value: string) {
    let data = this.itemCodeWithCountList.find((item) => item.itemcode == value).qty;

    let validators:ValidatorFn[] = [];
    validators.push(Validators.max(data));
    validators.push(Validators.min(1));

    this.formGroup?.get("quantity")?.setValidators(validators);
    this.formGroup?.patchValue({
      "totalQuantity": data
    })
    this.qtyReadOnly = false;
  }

  submit() {
    this.qtyReadOnly = true;
    this.showLoader = true;
    this.formGroup?.reset();
    this.qrData = [];
    let url = "";
    this.apiService.postData(url, this.qrData).subscribe((response) => {
      this.qrData = [];
      this.success = true;
      this.showLoader = false;
      this.showForm = false;
    }, err => {
      console.log(err);
      this.error = true;      
      this.errMsg = "Generating re-print!";
      this.qrData = [];
      this.showLoader = false;
      this.showForm = false;
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
