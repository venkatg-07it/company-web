import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app-constants';
import { IFieldConfig } from '../../model/i-field-config';
import { ApiService } from '../../services/api.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
  loadForm: boolean = false;
  isModify: boolean = false;
  searchText: string = "";

  form: FormGroup = new FormGroup({});
  formGroups: any = {};
  formNames: string[] = [];
  groupInfo: any = {};
  formGroupDisplayName: any = AppConstants.FORM_GROUP_TITLES;
  isSuccessAdd: boolean = false;
  isSuccessUpdate: boolean = false;
  isFailureAdd: boolean = false;
  isFailureUpdate: boolean = false;
  editFields: any[] = [];
  updateValueResponse : any = {};

  isItemMaster: boolean = false;
  isCustomerMaster: boolean = false;
  isComponentMaster: boolean = false;
  isAssemblyMaster: boolean = false;
  isRMMaster: boolean = false;
  isItemMasterFinishTypeIssue: boolean = false;
  isRemarksChanged: boolean = true;
  isFormUpdated: boolean = true;
  fieldInfo: any = {};
  fieldDetails: any = {};
  showLoader: boolean = false;

  constructor(private apiService: ApiService, private utilService: UtilService) { }

 

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {

    this.isItemMaster = this.apiUrl.toLowerCase().endsWith("itemmaster");
    this.isCustomerMaster = this.apiUrl.toLowerCase().endsWith("customermaster");
    this.isComponentMaster = this.apiUrl.toLowerCase().endsWith("componentmaster");
    this.isAssemblyMaster = this.apiUrl.toLowerCase().endsWith("assemblymaster");
    this.isRMMaster = this.apiUrl.toLowerCase().endsWith("itemmasterrm");

    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
                        this.jsonLocation + 
                        AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
                        this.jsonLocation + 
                        AppConstants.FILE_NAME_FIELD_DETAILS;

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));
    
    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      
      let fieldInfo = responses[0];
      let fieldDetails = responses[1];

      this.fieldInfo = fieldInfo;
      this.fieldDetails = fieldDetails;

      let groupInfo: any = {};
      let formGroupInfo: any = {};
      let formGroups: any = {};
      let groupNames: string[] = [];
      this.editFields = fieldInfo.primary.map((item: any) => {
        item["value"] = "";
        return item;
      });
      for(let field of fieldInfo.fields) {
        let fieldConfig:IFieldConfig = fieldDetails[field];
        let group = fieldConfig.group;
        let rowNo = fieldConfig.row;

        if(group) {
          let groupObj = groupInfo[group];
          let formGroup = formGroupInfo[group];

          if(!groupObj) {
            groupObj = {
              rowInfo: {},
              rowIds: []
            }
            
            formGroup = {};
            groupNames.push(group);
                
          }

          if(rowNo) {
            let rowKey = "row" + rowNo;
            let fields = groupObj.rowInfo[rowKey];
            if(!fields) {
              fields = [];
              groupObj.rowIds.push(rowKey);
            }
            fields.push(fieldConfig);
            let validators:ValidatorFn[] = [];
            if(fieldConfig.required){
              validators.push(Validators.required);
            }
            if(fieldConfig.length) {
              validators.push(Validators.maxLength(fieldConfig.length));
            }
            formGroup[fieldConfig.name] = new FormControl('', validators);
            
            
            groupObj.rowInfo[rowKey] = fields;
            formGroupInfo[group] = formGroup;
          }
          groupInfo[group] = groupObj;
          formGroups[group] = formGroup;
        }
      }
      this.formNames = groupNames;

      for(let group of groupNames) {
        let formGroup = formGroupInfo[group];
        this.formGroups[group] = new FormGroup(formGroup);
      }
      this.groupInfo = groupInfo;

      console.log("group info", this.groupInfo, this.formGroups);

    });
  }

  loadAddForm() {
    for(let group of this.formNames) {
      let form = this.formGroups[group];   
      if(form.controls["remarks"])    {
        form.controls["remarks"].clearValidators();
      }
      
    }
    this.loadForm = true;
    this.isSuccessAdd = false;
    this.isSuccessUpdate = false;
    this.isFailureAdd = false;
    this.isFailureUpdate = false;
    this.isItemMasterFinishTypeIssue = false;
    this.isRemarksChanged = true;
    this.isFormUpdated = true;
  }

  loadEditForm() {
    this.showLoader = true;
    let queryString = this.editFields.map((item: any) => item.value).join("/");
    this.apiService.getData(this.apiUrl + "/" + queryString).subscribe((response) => {
      /*
      let isTableMaster = this.apiUrl.toLowerCase().endsWith("tablemaster");
      if(isTableMaster) {
        let res = response;
        response = [res];
      }
      */
      if(response) {
        this.updateValueResponse = response;
        for(let group of this.formNames) {
          let form = this.formGroups[group];
          let validators = [];
          validators.push(Validators.required);
          if(form.controls["remarks"]) {
            form.controls["remarks"].setValidators([Validators.required]);
          }
          
          for(let field in this.fieldDetails) {
            let fieldConfig: IFieldConfig = this.fieldDetails[field];
            if(fieldConfig.type == "date") {
              response[0][fieldConfig.name] = this.formatDate(new Date(response[0][fieldConfig.name]));
            }
          }
          console.log("form-edit-value - actual",response);
          console.log("form-edit-value",response[0]);
          form.patchValue(response[0]);
          //form.get('podate').patchValue((new Date()));
          this.showLoader = false;
          
        }
        this.loadForm = true;
        this.isSuccessAdd = false;
        this.isSuccessUpdate = false;
        this.isFailureAdd = false;
        this.isFailureUpdate = false;
        this.isItemMasterFinishTypeIssue = false;
        this.isRemarksChanged = true;
        this.isFormUpdated = true;
      }
    }, err => {
      this.showLoader = false;
    }
    );
    
    
  }

  private formatDate(date: Date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  compareObject(srcObj: any, targetObj: any) {
  
      let isChanged = false;
      let isProcessChanged = false;
      for(let key in srcObj) {
        if(key != AppConstants.PROP_REMARKS) {
          if(srcObj[key] != targetObj[key]) {
            isChanged = true;
          }
          if(this.isItemMaster) {
            if(key.indexOf("process") > -1) {
              if(srcObj[key] != targetObj[key]) {
                isProcessChanged = true;
              }
            }
          }
        }
      }

      if(Object.keys(srcObj).indexOf(AppConstants.PROP_REMARKS) > -1) {
        if(srcObj[AppConstants.PROP_REMARKS] == targetObj[AppConstants.PROP_REMARKS]) {
          this.isRemarksChanged = false;
        }
        else {
          this.isRemarksChanged = true;
        }
      }
      

      if(isProcessChanged) {
        let processValue = srcObj["processrevisionlevel"].toLowerCase();
        switch(processValue) {
          case "a":
            processValue = "b";
            break;
          case "b":
            processValue = "c";
            break;
          case "c":
            processValue = "d";
            break;
          case "d":
            processValue = "e";
            break;
          default:
            processValue = "a";
            break;
        }
      }
      

    return isChanged;
  }

  submit() {
    this.showLoader = true;
    let request: any = {};
    if(this.formNames.length == 1) {
      let form: FormGroup = this.formGroups[this.formNames[0]];
      form.markAllAsTouched();
      request = form.value;
      let isChanged = false;
      if(this.isModify) {
        isChanged = this.compareObject(request, this.updateValueResponse[0] );
        this.isFormUpdated = isChanged;
      }
      
      
      if(this.isItemMaster) {
        let itemFinishFields = [
          "surfacepreparation",
          "primercolour",
          "primerDft",
          "imocolour",
          "imodft",
          "topCoatColour",
          "topCoatDft",
          "specialFinishdetails"
        ];
        
        
        if(this.isItemMaster && request["finishtype"] && request["finishtype"].toString().trim().length > 0) {
          let isFinishData = false;
          for(let field of itemFinishFields) {
            if(request[field].toString().trim().length > 0) {
              isFinishData = true;
            }
          }
          if(!isFinishData) {
            this.isItemMasterFinishTypeIssue = true;
            isChanged = false;
          }
        }
        
      }
      
      if(this.isModify) {
        isChanged = this.isRemarksChanged;
      }
      else {
        isChanged = true;
      }
      
      if(form.valid && isChanged) {
        console.log("valid form");
        
        request["createddate"] = new Date();
        request["updateddate"] = new Date();
        let api: any = {};

        let isTableMaster = this.apiUrl.toLowerCase().endsWith("tablemaster");
        let reqestBody: any = {};
        if(isTableMaster) {
          reqestBody = [request];
        }
        else {
          reqestBody = [request]
        }

        if(this.isModify) {
          api = this.apiService.putData(this.apiUrl, [request]);
        }
        else {
          api = this.apiService.postData(this.apiUrl, [request]);
        }
        api.subscribe((response: any) => {
          //this.isSuccess = true;
          this.showLoader = false;
          if(this.isModify) {
            this.editFields = this.editFields.map((item) => {
              item["value"] = "";
              return item;
            })
          }
          if(response) {
            console.log("dynamic form response", response);
            if(response.length == 0) {
              if(this.isModify) {
                this.isSuccessAdd = false;
                this.isSuccessUpdate = true;
              }
              else {
                this.isSuccessAdd = true;
                this.isSuccessUpdate = false;
              }
            }
            else {
              if(this.isModify) {
                this.isFailureAdd = false;
                this.isFailureUpdate = true;
              }
              else {
                this.isFailureAdd = true;
                this.isFailureUpdate = false;
              }
            }
            if(this.formNames.length == 1) {
              let form: FormGroup = this.formGroups[this.formNames[0]];
              request = form.reset();
            }
            else {
              for(let group of this.formNames) {
                let form: FormGroup = this.formGroups[group];
                request[group] = form.reset();
              }
            }
          }
        }, (err: any) => {
          this.showLoader = false;
        });
      }
      else {
        console.log("invalid form");
        this.showLoader = false;
      }
      
    }
    // else {
    //   let itemForm = this.formGroups["itemMaster"];
    //   let itemCode = itemForm.value["itemCode"];
    //   debugger;
      
    //   for(let group of this.formNames) {
    //     let form: FormGroup = this.formGroups[group];

    //     let data = form.value;

    //     data["createddate"] = new Date();
    //     data["updateddate"] = new Date();
    //     data["itemCode"] = itemCode;
    //     request[group] = [data];
    //   }
    // }
    
    
    
  }
}
