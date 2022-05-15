import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { SharedService } from 'src/app/common/services/shared.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-ctq-scan',
  templateUrl: './ctq-scan.component.html',
  styleUrls: ['./ctq-scan.component.css']
})
export class CtqScanComponent implements OnInit {

  @ViewChild('scanQr') scanQr!: ElementRef<HTMLInputElement>;
  formDataList: string[] = [];
  showLoader: boolean = false;
  scannedQRData: any[] = [];
  processList: string[] = [];
  ctqData: any[] = [];
  grid1Data: any[] = [];

  itemCode: string = "";
  loadDay: string = "";
  process: string = "";
  comments: string = "";
  qrNum: string = "";
  qty: string = "";

  ctqResponse: any = {};
  ctqReq: any = {};
  commentsRequired: boolean = false;

  showScannedQRForm: boolean = false;
  type: string = "success";
  alertTitle: string = "Success..!";
  alertMsg: string = "";
  showAlert: boolean = false;
  isQA: boolean = false;
  qtyText: string = "1/1";
  scanQty: string = "0";
  totalQty: string = "0";
  ctqProcessCount: number = 0;
  scanText: string = "";
  nestingNo: string = "";
  processNum: number = 1;
  public isBatch: boolean = false;
  constructor(private utilService: UtilService, private apiService: ApiService,
    private sharedService: SharedService) { }

  ngOnInit(): void {

    //this.showScannedQRForm = true;
    // this.processList = ["LASERCUTTING"];
    // this.itemCode = "29006533";
    // this.loadDay = "21222102";
    // //this.getQtyText();
    this.isQA = this.sharedService.getUserName() == "qa";
  }

  scanQR(event: any) {
    this.formDataList.push(event.target.value);
    if (this.formDataList.length == 1) {
      setTimeout(() => {

        this.showAlert = false;
        let data = this.formDataList[this.formDataList.length - 1];

        if (data && data.trim().length > 0) {
          this.isBatch = false;
          this.ctqData = [];          
          let formData = this.utilService.formatQRDataFromText(data);          
          this.scannedQRData = formData.data;
          this.processList = formData.processList;
          this.formScannedQRData();          
          if ((this.process && this.process.trim().length > 0)
            && (this.itemCode && this.itemCode.trim().length > 0)) {
            this.getCtqDataForProcess();
          }
          this.showScannedQRForm = true;
        }

        this.formDataList = [];

      }, 3000);

    }
  }

  onProcessChange(event: any) {
    if (event.target.value && event.target.value.toString().trim().length > 0) {
      this.process = event.target.value;
      console.log("changed process", this.process);
      this.getCtqDataForProcess();
    }

    //this.getQtyText();

  }

  getCtqDataForProcess() {
    this.showLoader = true;
    let url = APIConstants.API_SCANNED_QLTY + "/" + this.itemCode + "/" + this.process;
    this.apiService.getData(url).subscribe(response => {
      console.log("ctq response", response);
      if (response && response.length > 0) {
        this.ctqResponse = response[0];
        this.ctqReq = {
          ...this.ctqResponse
        }
        this.formCTQData();
      }
      this.showLoader = false;
    }, err => {
      console.log("error in fetching cts data for process", err);
      this.showLoader = false;
    })
  }

  formScannedQRData() {

    let itemcodeData = this.scannedQRData.find((item) => item.label == "Item Code");
    let customerData = this.scannedQRData.find((item) => item.label == "Customer");
    let loadDayData = this.scannedQRData.find((item) => item.label == "Load Day");
    let quantityData = this.scannedQRData.find((item) => item.label == "Quantity");
    let nestingData = this.scannedQRData.find((item) => item.label == "Nesting No");
    let processNumData = this.scannedQRData.find((item) => item.label == "Process No");

    let value = quantityData.value;
    value = value.replace("B", "");
    let qtyData = value.split("/");
    if (qtyData.length == 2) {
        this.qrNum = qtyData[0].trim();
        this.qty = qtyData[1].trim();
    }
    else {
        qtyData = value.split("-");
        if (qtyData.length == 2) {
            this.isBatch = true;
            this.qrNum = qtyData[0].trim();
            this.qty = qtyData[1].trim();
            
        }
    }

    this.nestingNo = nestingData.value;
    this.processNum = parseInt(processNumData.value);

    let gridFields = [
      ["Customer", "Load Day", "Item Code"],
      ["Revision Level", "Drawing", "Date", "Operator"]
    ];

    let grid1Data = [];
    for (let fields of gridFields) {
      let values = [];
      for (let field of fields) {
        switch (field) {
          case "Item Code":
            this.itemCode = itemcodeData.value;
            values.push(itemcodeData.value);
            break;
          case "Customer":
            values.push(customerData.value);
            break;
          case "Load Day":
            this.loadDay = loadDayData.value;
            values.push(loadDayData.value);
            break;
          case "Date":
            values.push(this.utilService.dateFormatter({
              value: new Date()
            }));
            break;
          case "Operator":
            values.push("Admin")
            break;
          case "Revision Level":
            values.push(this.ctqResponse["revisionlevel"]);
            break;
          case "Drawing":
            values.push(this.ctqResponse["drawingprojection"]);
            break;

          default:
            values.push("");
            break;
        }
      }

      grid1Data.push({
        "header": fields,
        "values": values
      })
    }

    if ((this.process && this.process.trim().length > 0)
    && (this.itemCode && this.itemCode.trim().length > 0)
    && (this.loadDay && this.loadDay.trim().length > 0)) {
      this.getQtyText();
  }

    

    this.grid1Data = grid1Data;

  }

  formCTQData() {
    this.formScannedQRData();
    let isData = true;
    let idx = 1;
    let ctqData = [];
    do {
      let ctqItem = {
        "sNo": idx,
        "dim": this.ctqResponse["dim" + idx],
        "min": this.ctqResponse["min" + idx],
        "max": this.ctqResponse["max" + idx],
        "specifiedmin": this.ctqResponse["specifiedmin" + idx],
        "specifiedmax": this.ctqResponse["specifiedmax" + idx],
        "process": this.process,
        "observed": ""
      }
      ctqData.push(ctqItem);
      idx++;
      isData = (this.ctqResponse["dim" + idx]) ? true : false;
    } while (isData);
    this.ctqProcessCount = idx;
    this.ctqData = ctqData;
    console.log("formed ctq data", this.ctqData);
  }
  onChangeObservedValue(event: any, id: string) {
    this.ctqReq["observed" + id] = event.target.value;
  }
  onCommentsChange(event: any) {
    this.comments = event.target.value;
    if (this.comments.trim().length > 0) {
      this.commentsRequired = false;
    }
  }

  getQtyText() {
    this.getTotalQty();

  }

  getTotalQty() {
    let url = APIConstants.API_SCANNED_QLTY_REQUIRED_QTY
      + "/" + this.loadDay
      + "/" + this.itemCode
      + "/" + this.process;
    this.apiService.getData(url).subscribe(response => {
      if (response && response.length > 0) {
        this.totalQty = response[0];
        this.getScanQty();
        this.createQtyText();
      }
    });

  }

  getScanQty() {
    let url = (this.isQA ? APIConstants.API_SCANNED_QLTY_QTY : APIConstants.API_SCANNED_PROD_QTY)
      + "/" + this.loadDay
      + "/" + this.itemCode
      + "/" + this.process;

    if (this.isQA) {
      this.getProdQtyForQA();
    }
    else {
      this.checkScanningProcess();
    }

    this.apiService.getData(url).subscribe(response => {

      if (response && response.length > 0) {
        this.scanQty = response[0];
        if (this.scanQty >= this.totalQty) {

          this.alertMsg = "Already Scanned required CTQ";
          this.alertTitle = "Error..!";
          this.type = "fail";
          this.showAlert = true;
          this.scanText = "";
        }


        this.createQtyText();
      }
    });
  }

  checkScanningProcess() {
    let url = APIConstants.API_SCANNED_QTY
      + "/" + this.loadDay + "/" + this.itemCode + "/" + this.process;

    this.apiService.getData(url).subscribe(result => {
      if (result && result.length > 0) {
        if (result[0] < this.qty) {
          this.alertMsg = "Please complete scanning process..!";
          this.alertTitle = "Error..!";
          this.type = "fail";
          this.showAlert = true;
          this.scanText = "";
          this.showScannedQRForm = false;
        }
      }
    })
  }

  getProdQtyForQA() {
    let url = APIConstants.API_SCANNED_PROD_QTY
      + "/" + this.loadDay
      + "/" + this.itemCode
      + "/" + this.process;

    this.apiService.getData(url).subscribe(response => {
      if (response && response.length > 0) {
        if (response[0] < this.totalQty) {

          this.alertMsg = "CTQ Production check is not completed";
          this.alertTitle = "Error..!";
          this.type = "fail";
          this.showAlert = true;
          this.scanText = "";
          this.showScannedQRForm = false;
        }
      }
    });
  }


  createQtyText() {
    this.qtyText = this.scanQty + "/" + this.totalQty;
  }


  submit(type: string) {
    if(this.isBatch) {
      this.qty = (parseInt(this.scanQty) + 1).toString();
    }
    this.ctqReq["loadDay"] = this.loadDay;
    this.ctqReq["itemcode"] = this.itemCode;
    this.ctqReq["position"] = this.qrNum;
    this.ctqReq["qty"] = this.qty;
    this.ctqReq["nestingno"] = this.nestingNo;
    this.ctqReq["processNum"] = this.processNum;
    this.ctqReq["Scanneddate"] = new Date();
    this.ctqReq["Inspectorname"] = "Admin";
    this.ctqReq["status"] = type;
    this.ctqReq["remarks"] = this.comments;
    this.ctqReq["ldayIcodeProcPos"] = "test";

    let missedMandatoryFields: boolean = false;

    for (let idx = 1; idx < this.ctqProcessCount; idx++) {
      if (!this.ctqReq["observed" + idx] || this.ctqReq["observed" + idx].toString().trim().length == 0) {
        missedMandatoryFields = true;
      }
    }
    let qtyError: boolean = false;
    if (this.scanQty == this.totalQty) {
      qtyError = true;
    }

    if (type !== 'Approved') {
      if (this.comments.trim().length == 0) {
        this.commentsRequired = true;
      }
    }
    let url = this.isQA ? APIConstants.API_SAVE_QLTY_DATA : APIConstants.API_SAVE_PROD_DATA;
    if (!this.commentsRequired && !qtyError && !missedMandatoryFields) {
      this.apiService.postData(url, [this.ctqReq])
        .subscribe(response => {
          this.type = "success";
          this.alertTitle = "Success..!";
          this.alertMsg = "Data uploaded successfully..!";
          this.showAlert = true;
          this.scanText = "";
          this.ctqData = [];
          this.scanQr.nativeElement.focus();
        }, err => {
          this.type = "fail";
          this.alertTitle = "Error..!";
          this.alertMsg = "Error in uploading data";
          this.showAlert = true;
          this.scanText = "";
          this.ctqData = [];
          this.scanQr.nativeElement.focus();
        })

    }

    if (qtyError || missedMandatoryFields) {
      this.alertMsg = qtyError ? "Already Scanned required CTQ" : "Mandatory fields are missing..!";
      this.showAlert = true;
      this.type = "fail";
      this.alertTitle = "Error..!";
      this.scanText = "";
    }
  }
}
