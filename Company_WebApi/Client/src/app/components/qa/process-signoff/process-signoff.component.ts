import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { SharedService } from 'src/app/common/services/shared.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-process-signoff',
  templateUrl: './process-signoff.component.html',
  styleUrls: ['./process-signoff.component.css']
})
export class ProcessSignoffComponent implements OnInit {
  formGroup: FormGroup | undefined;
  processList: string[] = [];
  formDataList: string[] = [];
  showForm: boolean = false;
  type: string = "success";
  alertTitle: string = "Success..!";
  alertMsg: string = "";
  showAlert: boolean = false;
  showLoader: boolean = false;
  isQA: boolean = false;
  loadDay: string = "";
  itemcode: string = "";
  requiredQty: number  = 0;
  approvedQty: number = 0;
  qltyQty: number = 0;
  prodQty: number = 0;
  qty: number = 0;
  maxQty: number = 0;
  disableSubmit: boolean = false;
  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.isQA = this.sharedService.getUserName() == "qa";

    
  }

  scanQR(event: any) {
    this.formDataList.push(event.target.value);
    if (this.formDataList.length == 1) {
      setTimeout(() => {
        let data = this.formDataList[this.formDataList.length - 1];
        let formData = this.utilService.formatQRDataFromText(data);
        this.processList = formData.processList;
        let itemcode = formData.data.find((item) => item.label == "Item Code").value;
        let loadDay = formData.data.find((item) => item.label == "Load Day").value;
        let quantity = formData.data.find((item) => item.label == "Quantity").value;
        
        let qty = 0;
        let qtyData = quantity.replace("B", "");
        qtyData = quantity.split("/");
        
        if (qtyData.length == 2) {
          qty = qtyData[1].trim();
          this.qty = qty;
        }
        else {
          qtyData = quantity.split("-");
          if (qtyData.length == 2) {
            qty = qtyData[1].trim();
            this.qty = qty;
          }
          
        }

        this.loadDay = loadDay;
        this.itemcode = itemcode;
        

        this.createFormGroup(loadDay, itemcode, qty);
        this.showForm = true;
      }, 2500);
    }
  }

  getAPIData(process: string) {
    this.disableSubmit = false;
    this.showLoader = true;
    let requests: Observable<any>[] = [];
    let qryParam = "/" + this.loadDay + "/" + this.itemcode + "/" + process;
    //get ctq required count
    requests.push(this.apiService.getData(APIConstants.API_SCANNED_QLTY_REQUIRED_QTY + qryParam));
    //get ctq approved count from quality team
    requests.push(this.apiService.getData(APIConstants.API_CTQ_QLTY_APPROVED_COUNT + qryParam));
    //get quality sign off received qty count
    requests.push(this.apiService.getData(APIConstants.API_PROCESS_SIGN_OFF_COUNT + qryParam));
     //get quality sign off received qty count
     requests.push(this.apiService.getData(APIConstants.API_PROD_SIGN_OFF_COUNT + qryParam));

    this.utilService.getBulkAsyncData(requests).subscribe(results => {
      console.log("result", results);
      this.populateQty(results);
      this.doCheck();
      this.showLoader = false;
    }, err=> {
      this.showLoader = false;
      console.log(err);
    })
  }

  populateQty(results: any[]) {
    if(results.length > 0) {
      if(results[0] && results[0].length > 0) {
        if(results[0][0]) {
          this.requiredQty = parseInt(results[0][0]);
        }
        else {
          this.requiredQty = 0;
        }
      }
    }


    if(results.length > 1) {
      if(results[1] && results[1].length > 0) {
        if(results[1][0]) {
          this.approvedQty = parseInt(results[1][0]);
        }
        else {
          this.approvedQty = 0;
        }
      }
    }


    if(results.length > 2) {
      if(results[2] && results[2].length > 0) {
        if(results[2][0]) {
          this.qltyQty = parseInt(results[2][0]);
        }
        else {
          this.qltyQty = 0;
        }
      }
    }

    if(results.length > 3) {
      if(results[3] && results[3].length > 0) {
        if(results[3][0]) {
          this.prodQty = parseInt(results[3][0]);
        }
        else {
          this.prodQty = 0;
        }
      }
    }
  }

  doCheck() {
    if(this.requiredQty !=0 && this.approvedQty != 0) {
      if(this.requiredQty == this.approvedQty) {
        this.maxQty = this.qty - this.prodQty;
      }
      else if(this.qltyQty > 0) {
        if(this.requiredQty > this.approvedQty) {
          this.maxQty = this.qltyQty - this.prodQty;
        }
      }
      else {
        this.disableSubmit = true;
        this.type = "fail";
        this.alertTitle = "Error..!";      
        this.alertMsg = "please complete the process sign-off process";
        this.showAlert = true;
      }
      
    }
    else {
      this.disableSubmit = true;
      if(this.requiredQty == 0) {
        this.alertMsg = "There is no CTQ data for the itemcode";
      }
      else {
        this.alertMsg = "please complete the ctq process";
      }
      this.type = "fail";
      this.alertTitle = "Error..!";      
      this.showAlert = true;
    }
  }
  
  createFormGroup(loadDay: string,
    itemcode: string, totalqty: number) {
    let acceptorName = "Admin";
    let signedDate = this.utilService.dateFormatter({
      value: new Date()
    });
    this.formGroup = new FormGroup({
      'loadday': new FormControl(loadDay),
      'itemcode': new FormControl(itemcode),
      'totalqty': new FormControl(totalqty),
      'receivedqty': new FormControl('', Validators.required),
      'handoverProcessFrom': new FormControl('', Validators.required),
      'handoverProcessTo': new FormControl('', Validators.required),
      'acceptorname': new FormControl(acceptorName),
      'signeddate': new FormControl(signedDate),
    })

    this.formGroup.get("handoverProcessFrom")?.valueChanges.subscribe(value => {
      this.onFromProcessChange(value)
    });
  }

  onFromProcessChange(process: string) {
    if(!this.isQA && process && process.trim().length > 0) {
      this.getAPIData(process);
    }
    
  }

  signOff() {
    if (this.formGroup?.valid) {
      this.showLoader = true;
      
      let url = this.isQA ? APIConstants.API_SAVE_PHYSICAL_QLTY_ACCEPTANCE_QLTY_DATA
      :  APIConstants.API_SAVE_PHYSICAL_QLTY_ACCEPTANCE_PROD_DATA;

      if(this.formGroup.get("receivedqty")?.value > this.maxQty) {
            this.type = "fail";
            this.alertTitle = "Error..!";
            this.alertMsg = "Recived qty should be less then or equal to max qty";
            this.showAlert = true;
            this.showLoader = false;
            
      }
      else {
        this.apiService.postData(url,
          [this.formGroup.value]).subscribe(() => {
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
            console.log(err);
          });
      }
      
      
    }
  }
}
