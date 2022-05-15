import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppConstants } from './../../../common/constants/app-constants';
import { IFieldConfig } from './../../../common/model/i-field-config';
import { ApiService } from './../../../common/services/api.service';
import { UtilService } from './../../../common/services/util.service';
import { startWith, map } from 'rxjs/operators';
import { APIConstants } from 'src/app/common/constants/api-constants';

@Component({
  selector: 'app-ae-open-po-master',
  templateUrl: './ae-open-po-master.component.html',
  styleUrls: ['./ae-open-po-master.component.css']
})
export class AeOpenPoMasterComponent implements OnInit {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle: string = "";
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
  updateValueResponse: any = {};

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
  routePath: string = "";
  routeConfig: any = AppConstants.INPUT_VALUES_ADD_OR_EDIT;

  customerNameList: string[] = [];
  filterCustomerNameList: Observable<string[]> | undefined;
  itemCodeList: string[] = [];
  filterItemCodeList: Observable<string[]> | undefined;
  customerNameCtrl: FormControl | undefined;

  formFields: any[] = [];
  formGroup: FormGroup | undefined;
  dateFields: string[] = [];

  constructor(private apiService: ApiService, private utilService: UtilService,
    private activatedRoute: ActivatedRoute) { }



  ngOnInit(): void {
    

    this.routePath = this.activatedRoute.snapshot.url[0].path
    let config = this.routeConfig[this.activatedRoute.snapshot.url[0].path];
    this.jsonLocation = config.jsonLocation;
    this.apiUrl = config.apiUrl;
    this.pageTitle = config.pageTitle;

    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      this.jsonLocation +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      this.jsonLocation +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    let customerListUrl = APIConstants.MISCELLANEOUS_API + "/CustomerList";

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));
    //requests.push(this.apiService.getData(customerListUrl));
    this.showLoader = true;
    this.utilService.getBulkAsyncData(requests).subscribe(responses => {

      this.dateFields = [];
      this.createForm(responses);

      this.apiService.getData(customerListUrl).subscribe(response => {
        this.customerNameList = response;
        this.showLoader = false;
      }, err => {
        console.log("Error in fetching customer name list", err);
        this.showLoader = false;
      });


    }, err => {
      console.log("Error in fetching dummy po field json ", err);
      this.showLoader = false;
    });


  }

  createForm(responses: any[]) {
    let fieldInfo = responses[0];
    let fieldDetails = responses[1];

    this.fieldInfo = fieldInfo;
    this.fieldDetails = fieldDetails;
    let colSize = 4;

    let fields = JSON.parse(JSON.stringify(fieldInfo)).fields;
    fields.shift();

    this.editFields = fieldInfo.primary.map((item: any) => {
      item["value"] = "";
      return item;
    });

    let formGroup: any = {};
    
    this.formFields = this.getFormFields(fields, formGroup, colSize);
    this.formGroup = new FormGroup(formGroup);

  }

  getAPIData(value: string, fieldName: string) {

  }

  onKeyup(event: any, fieldName: string) {

  }

  submitForm() {
    this.formGroup?.markAllAsTouched();
    this.showLoader = true;
    let request = this.formGroup?.value;
    let isChanged = !this.isModify;
    if(this.isModify) {
      isChanged = this.compareObject(request, this.updateValueResponse[0]);
      this.isFormUpdated = isChanged;
    }

    if(this.isModify && this.isFormUpdated && this.isRemarksChanged) {
      isChanged = true;
    } 



    if (this.formGroup?.valid && isChanged) {
      let request = this.formGroup.value;

      request["createddate"] = new Date();
      request["updateddate"] = new Date();
      let api: any = {};

      if (this.isModify) {
        api = this.apiService.putData(this.apiUrl, [request]);
      }
      else {
        api = this.apiService.postData(this.apiUrl, [request]);
      }

      api.subscribe((response: any) => {
        if (response && response.length == 0) {
          if (this.isModify) {
            this.isSuccessAdd = false;
            this.isSuccessUpdate = true;
          }
          else {
            this.isSuccessAdd = true;
            this.isSuccessUpdate = false;
          }
        }
        else {
          if (this.isModify) {
            this.isFailureAdd = false;
            this.isFailureUpdate = true;
          }
          else {
            this.isFailureAdd = true;
            this.isFailureUpdate = false;
          }
        }

        this.formGroup?.reset();
        this.showLoader = false;
      }, (err: any) => {
        this.formGroup?.reset();
        this.showLoader = false;
      });
    }
    else {
      this.showLoader = false;
    }
  }

  getFormFields(fields: string[], formGroup: any, colSize: number = 3) {
    let fieldsLen = fields.length;
    let formFields = [];
    for (let idx = 0; idx < fieldsLen; idx += colSize) {
      let colFields = fields.splice(0, colSize);
      formFields.push(this.getFormConfigFIelds(colFields, formGroup));
    }
    return formFields;
  }

  getFormConfigFIelds(fields: string[], formGroup: any) {
    let fieldDetails = this.fieldDetails;
    return fields.map((item: string) => {

      let validators: ValidatorFn[] = [];
      let fieldConfig = fieldDetails[item];
      if (fieldConfig.required) {
        validators.push(Validators.required);
      }
      if (fieldConfig.length) {
        validators.push(Validators.maxLength(fieldConfig.length));
      }

      if(fieldConfig.type == "date") {
        this.dateFields.push(fieldConfig.name);
      }

      let defaultValue = '';
      if (fieldConfig.default) {
        defaultValue = fieldConfig.default;
      }
      let control = new FormControl(defaultValue, validators);
      if (fieldConfig.name == "customerName") {
        this.customerNameCtrl = control;

        if (this.customerNameCtrl) {
          this.filterCustomerNameList = this.customerNameCtrl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value, this.customerNameList)),
          );
        }

        control.valueChanges.subscribe((value) => {
          this.getItemCodeList(value);
        });

      }
      if (fieldConfig.name == "poitemcode") {

      }

      if (fieldConfig.name == "itemcodeforLoading") {
        this.filterItemCodeList = control.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.itemCodeList)),
        );
      }

      formGroup[fieldConfig.name] = control;

      return fieldConfig
    });
  }

  createForm1(responses: any[]) {
    let fieldInfo = responses[0];
    let fieldDetails = responses[1];
    //this.customerNameList = responses[2];

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
    for (let field of fieldInfo.fields) {
      let fieldConfig: IFieldConfig = fieldDetails[field];
      let group = fieldConfig.group;
      let rowNo = fieldConfig.row;

      if (group) {
        let groupObj = groupInfo[group];
        let formGroup = formGroupInfo[group];

        if (!groupObj) {
          groupObj = {
            rowInfo: {},
            rowIds: []
          }

          formGroup = {};
          groupNames.push(group);

        }

        if (rowNo) {
          let rowKey = "row" + rowNo;
          let fields = groupObj.rowInfo[rowKey];
          if (!fields) {
            fields = [];
            groupObj.rowIds.push(rowKey);
          }
          fields.push(fieldConfig);
          let validators: ValidatorFn[] = [];
          if (fieldConfig.required) {
            validators.push(Validators.required);
          }
          if (fieldConfig.length) {
            validators.push(Validators.maxLength(fieldConfig.length));
          }
          let control = new FormControl('', validators);
          if (fieldConfig.name == "customerName") {
            this.customerNameCtrl = control;

            if (this.customerNameCtrl) {
              this.filterCustomerNameList = this.customerNameCtrl.valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value, this.customerNameList)),
              );
            }

          }
          if (fieldConfig.name == "poitemcode") {
            control.valueChanges.subscribe((value) => {
              this.getItemCodeList(value);
            });
          }

          if (fieldConfig.name == "itemcodeforLoading") {
            this.filterItemCodeList = control.valueChanges.pipe(
              startWith(''),
              map(value => this._filter(value, this.itemCodeList)),
            );
          }
          formGroup[fieldConfig.name] = control;


          groupObj.rowInfo[rowKey] = fields;
          formGroupInfo[group] = formGroup;
        }
        groupInfo[group] = groupObj;
        formGroups[group] = formGroup;
      }
    }

    this.formNames = groupNames;

    for (let group of groupNames) {
      let formGroup = formGroupInfo[group];
      this.formGroups[group] = new FormGroup(formGroup);
    }
    this.groupInfo = groupInfo;

    console.log("group info", this.groupInfo, this.formGroups);
  }

  ngOnChanges(): void {

    this.isItemMaster = this.apiUrl.toLowerCase().endsWith("itemmaster");
    this.isCustomerMaster = this.apiUrl.toLowerCase().endsWith("customermaster");
    this.isComponentMaster = this.apiUrl.toLowerCase().endsWith("componentmaster");
    this.isAssemblyMaster = this.apiUrl.toLowerCase().endsWith("assemblymaster");
    this.isRMMaster = this.apiUrl.toLowerCase().endsWith("itemmasterrm");


  }

  loadAddForm() {
    for (let group of this.formNames) {
      let form = this.formGroups[group];
      if (form.controls["remarks"]) {
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
      if (response) {
        this.updateValueResponse = response;

        let form = this.formGroup;
        let validators = [];
        validators.push(Validators.required);
        form?.controls["remarks"].setValidators([Validators.required]);
        if(response[0].planningLoadDay && response[0].planningLoadDay.length == 1) {
          response[0].planningLoadDay = '';
        }
        for (let field in this.fieldDetails) {
          let fieldConfig: IFieldConfig = this.fieldDetails[field];
          if (fieldConfig.type == "date") {
            response[0][fieldConfig.name] = this.formatDate(new Date(response[0][fieldConfig.name]));
          }
        }
        form?.patchValue(response[0]);
        //form.get('podate').patchValue((new Date()));
        this.showLoader = false;

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
    for (let key in srcObj) {
      if (key != AppConstants.PROP_REMARKS) {
        if (srcObj[key] != targetObj[key]) {
          isChanged = true;
        }
        if (this.isItemMaster) {
          if (key.indexOf("process") > -1) {
            if (srcObj[key] != targetObj[key]) {
              isProcessChanged = true;
            }
          }
        }
      }
    }
    targetObj[""] = targetObj[AppConstants.PROP_REMARKS];
    if (srcObj[AppConstants.PROP_REMARKS] == targetObj[AppConstants.PROP_REMARKS]) {
      this.isRemarksChanged = false;
    }
    else {
      this.isRemarksChanged = true;
    }

    if (isProcessChanged) {
      let processValue = srcObj["processrevisionlevel"].toLowerCase();
      switch (processValue) {
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
    if (this.formNames.length == 1) {
      let form: FormGroup = this.formGroups[this.formNames[0]];
      form.markAllAsTouched();
      request = form.value;
      let isChanged = false;
      if (this.isModify) {
        isChanged = this.compareObject(request, this.updateValueResponse[0]);
        this.isFormUpdated = isChanged;
      }




      if (this.isModify) {
        isChanged = this.isRemarksChanged;
      }
      else {
        isChanged = true;
      }

      if (form.valid && isChanged) {

        for(let key in request) {
          if(this.dateFields.indexOf(key) > -1) {
            let value = request[key];
            if(value) {
              request[key] = this.utilService.convertStringToDate(value);
            }
            
          }
        }
        
        request["createddate"] = new Date();
        request["updateddate"] = new Date();
        let api: any = {};

        if (this.isModify) {
          api = this.apiService.putData(this.apiUrl, [request]);
        }
        else {
          api = this.apiService.postData(this.apiUrl, [request]);
        }
        api.subscribe((response: any) => {
          //this.isSuccess = true;
          this.showLoader = false;
          if (this.isModify) {
            this.editFields = this.editFields.map((item) => {
              item["value"] = "";
              return item;
            })
          }
          if (response) {
            if (response.length == 0) {
              if (this.isModify) {
                this.isSuccessAdd = false;
                this.isSuccessUpdate = true;
              }
              else {
                this.isSuccessAdd = true;
                this.isSuccessUpdate = false;
              }
            }
            else {
              if (this.isModify) {
                this.isFailureAdd = false;
                this.isFailureUpdate = true;
              }
              else {
                this.isFailureAdd = true;
                this.isFailureUpdate = false;
              }
            }
            if (this.formNames.length == 1) {
              let form: FormGroup = this.formGroups[this.formNames[0]];
              request = form.reset();
            }
            else {
              for (let group of this.formNames) {
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
        this.showLoader = false;
      }

    }

  }

  private _filter(value: string, list: string[]): string[] {
    const filterValue = this._normalizeValue(value);
    return list.filter(custName => this._normalizeValue(custName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  getItemCodeList(value: string) {
    this.showLoader = true;
    this.apiService.getData(APIConstants.MISCELLANEOUS_API + "/MatchItemcodeList/" + value)
      .subscribe(result => {
        this.itemCodeList = result;
        console.log("item code list", result);
        this.filterItemCodeList = of(this.itemCodeList);
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
      });

  }

}
