import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { APIConstants } from '../../constants/api-constants';
import { IFileResponse } from '../../model/IFileResponse';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent implements OnInit {
  
  gridData:IFileResponse = {};
  isFileUploaded:boolean = false;
  isSubmitted: boolean = false;
  isModify: boolean = false;
  isError: boolean = false;
  isSuccess: boolean = false;

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle: string= "";
  @Input()
  apiUrl: string= "";

  errMsg: string = "";

  disableSubmit: boolean = false;
  showLoader: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    if(this.apiUrl.toLowerCase().endsWith("pomaster")) {
      this.showLoader = true;
      this.apiService.getData(APIConstants.CHECK_PO).subscribe(response => {
        
        this.disableSubmit = this.checkPOResponse(response);
        this.showLoader = false;
      }, err=> {
        this.showLoader = false;
      })
    }

  }
  
  checkPOResponse(response: any[]) {
    if(response.length > 0) {
      if(response[0].missingItemcodeinAssemblyMaster > 0 || response[0].missingItemcodeinComponentMaster)
      {
        return true;
      }
    }
    return false;
  }
  
  fileResponse(fileResponse:IFileResponse[]) {    
    this.gridData = fileResponse[0];
  }

  fileUploaded(isFileUploaded: boolean) {
    this.isFileUploaded = isFileUploaded;
    this.isSuccess = false;
  }

  optionModify(isModify: boolean) {
    this.isModify = isModify;
  }
  
  onSubmit() {
   this.isSubmitted = true;
  }

  onError(errMsg: string) {
    this.errMsg = errMsg;
    if(errMsg.trim().length > 0) {
      this.isError = true;
    }
  }

  onSuccess(success: boolean) {
    this.isSuccess = success;
    this.isSubmitted = false;
  }

  

}
