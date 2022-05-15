import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-ae-ctq-master',
  templateUrl: './ae-ctq-master.component.html',
  styleUrls: ['./ae-ctq-master.component.css']
})
export class AeCtqMasterComponent implements OnInit {

  pageTitle: string = AppConstants.PAGE_TITLE_CTQ_MASTER;
  fieldDetails: any = {};
  fieldInfo: any = {};
  formFields: any[] = [];
  repeatedFields: IFieldConfig[] = [];

  formGroup: FormGroup | undefined;
  repeatedFormGroup: FormGroup | undefined;
  repeatedFieldData: any[] = [];
  apiUrl: string = APIConstants.CTQ_MASTER;
  showLoader: boolean = false;
  success: boolean = false;
  error: boolean = false;
  successMsg: string = "";
  errMsg: string = "";
  customerNameList: string[] = [];
  filterCustomerNameList: Observable<string[]> | undefined;
  itemCodeList: string[] = [];
  filterItemCodeList: Observable<string[]> | undefined;
  isModify: boolean = false;
  editFields: any[] = [];
  showForm: boolean = false;

  constructor(private utilService: UtilService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.showLoader = true;
    let filePath = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_CTQ_MASTER;
    let fieldInfoUrl = filePath +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = filePath +
      AppConstants.FILE_NAME_FIELD_DETAILS;


    let requests: Observable<any>[] = [];

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));

    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      let fieldInfo = responses[0];
      let fieldDetails = responses[1];

      this.editFields = fieldInfo.primary.map((item: any) => {
        item["value"] = "";
        return item;
      });

      this.fieldInfo = fieldInfo;
      this.fieldDetails = fieldDetails;
      this.showLoader = false;


    }, err => {
      this.showLoader = false;
    }
    );


  }

  loadEditForm() {
    this.showLoader = true;
    let queryString = this.editFields.map((item: any) => item.value).join("/");
    this.apiService.getData(this.apiUrl + "/" + queryString).subscribe((response) => {
      console.log("edit api response : ", response);
      if (response.length == 1) {
        let formData = response[0];
        this.loadDataForEditForm(formData);
       // this.loadAddForm();
        
        // let formGroupData: any = {};
        // let fieldDetails = this.fieldDetails;
        // let fieldInfo = this.fieldInfo;
        // for (let fieldName of fieldInfo.fields) {
        //   let field: IFieldConfig = fieldDetails[fieldName];
        //   formGroupData[field.name] = formData[field.name];
        // }
        // this.formGroup?.patchValue({
        //   "customername": "test"
        // });

        let customerListUrl = APIConstants.MISCELLANEOUS_API + "/CustomerList";

    this.apiService.getData(customerListUrl).subscribe(response => {
      this.customerNameList = response;
      this.showLoader = false;
      this.loadForm();
      this.formGroup?.patchValue(formData);
      console.log("form value", this.formGroup?.value);
      this.showForm = true;
      this.success = false;
      this.error = false;
    }, err => {
      console.log("Error in fetching customer name list", err);
      this.showLoader = false;
      this.loadForm();
      this.showForm = true;
      this.success = false;
      this.error = false;
    });
        //console.log("form data", formGroupData);
        
      }

      this.showLoader = false;
    });
  }


  loadDataForEditForm(formData: any) {
    let fieldDetails = this.fieldDetails;
    let fieldInfo = this.fieldInfo;
    let repeatedFormData = [];

    if (fieldDetails["Repeated Columns"]) {
      let repeatedColumns = fieldDetails["Repeated Columns"];
      let fieldsSize = repeatedColumns.size;
      let fields = repeatedColumns.fields;
      let fieldsNames = fieldInfo.repeatedFields;

      for (let idx = 1; idx <= fieldsSize; idx++) {
        let repeatedFormValue: any = {};
        repeatedFormValue["sNo"] = idx;
        for (let fieldName of fieldsNames) {
          let field = fields[fieldName];
          repeatedFormValue[field.name] = formData[field.name + idx];
        }

        if (repeatedFormValue.process) {
          repeatedFormData.push(repeatedFormValue);
        }
        else {
          break;
        }

      }

      this.repeatedFieldData = repeatedFormData;

    }
  }
  loadAddForm() {


    let customerListUrl = APIConstants.MISCELLANEOUS_API + "/CustomerList";

    this.apiService.getData(customerListUrl).subscribe(response => {
      this.customerNameList = response;
      this.showLoader = false;
      this.loadForm();
      this.showForm = true;
      this.success = false;
      this.error = false;
    }, err => {
      console.log("Error in fetching customer name list", err);
      this.showLoader = false;
      this.loadForm();
      this.showForm = true;
      this.success = false;
      this.error = false;
    });

  }

  loadForm() {
    /*
    if(fieldDetails["Repeated Columns"]) {
      let repeatedColumns = fieldDetails["Repeated Columns"];
      let fieldsSize = repeatedColumns.size;
      let fields = repeatedColumns.fields;
      let fieldsNames = fieldInfo.repeatedFields;
      let iteratedFields = [];
      for(let idx = 1; idx <= fieldsSize; idx++) {
        for(let fieldName of fieldsNames) {
          let field = fields[fieldName];
          iteratedFields.push({
            "label": field.label + " " + idx,
            "name": field.name + idx,
            "width": 200,
            "type": "text"
          })
        }
      }
    }

    */

    this.createFormGroup();
  }

  createFormGroup() {
    let fieldNames = this.fieldInfo.fields;
    let fieldDetails = this.fieldDetails;
    let formGroup: any = {};
    let formFields: IFieldConfig[] = [];
    for (let fieldName of fieldNames) {
      let field: IFieldConfig = fieldDetails[fieldName];
      this.createFormFields(field, formGroup, formFields);
    }

    let fieldsLen = formFields.length;
    let uiFormFields = [];
    let colSize = 4;
    for (let idx = 0; idx < fieldsLen; idx += colSize) {
      let colFields = formFields.splice(0, colSize);
      uiFormFields.push(colFields);
    }

    this.formFields = uiFormFields;
    this.formGroup = new FormGroup(formGroup);

    this.createdNestedFormGroup();

  }

  createdNestedFormGroup() {
    let fieldInfo = this.fieldInfo;
    let fieldDetails = this.fieldDetails;

    let formGroup: any = {};
    let formFields: IFieldConfig[] = [];

    if (fieldDetails["Repeated Columns"]) {
      let repeatedColumns = fieldDetails["Repeated Columns"];
      let fields = repeatedColumns.fields;
      let fieldsNames = fieldInfo.repeatedFields;

      for (let fieldName of fieldsNames) {
        let field = fields[fieldName];
        this.createFormFields(field, formGroup, formFields);
      }

      formGroup["sNo"] = new FormControl('', []);

      this.repeatedFormGroup = new FormGroup(formGroup);
      this.repeatedFields = formFields;

    }
  }

  createFormFields(field: IFieldConfig, formGroup: any, formFields: IFieldConfig[]) {

    let validators = [];
    let defaultValue = "";

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.default) {
      defaultValue = field.default;
    }

    let formControl = new FormControl(defaultValue, validators);

    if (field.name == "customername") {
      this.filterCustomerNameList = formControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, this.customerNameList)),
      );

      formControl.valueChanges.subscribe((value) => {
        this.getItemCodeList(value);
      });
    }

    if(field.name == "itemcode") {
      this.filterItemCodeList= formControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, this.itemCodeList)),
      );
    }

    formGroup[field.name] = formControl;
    formFields.push(field);
  }

  addRepeatedFieldData() {
    if (this.repeatedFormGroup?.valid) {
      let formValue = this.repeatedFormGroup.value;
      let editFormValue = this.repeatedFieldData.find((item) => item.sNo == formValue.sNo);
      if (!editFormValue) {
        let sNo = 1;
        let len = this.repeatedFieldData.length;
        if (len > 0) {
          sNo = (+this.repeatedFieldData[len - 1].sNo) + 1;
        }
        formValue.sNo = sNo;
        this.repeatedFieldData.push(formValue);
      }
      else {
        editFormValue.process = formValue.process;
        editFormValue.dim = formValue.dim;
        editFormValue.min = formValue.min;
        editFormValue.max = formValue.max;
      }

      this.repeatedFormGroup?.reset();
    }

  }

  editRepeatedFormData(formValue: any) {
    this.repeatedFormGroup?.patchValue(formValue);
  }

  delRepeatedFormData(sNo: number) {
    let data = this.repeatedFieldData.filter((item) => item.sNo !== sNo);
    this.repeatedFieldData = data;
  }

  submit() {

    if (this.formGroup?.valid) {
      this.showLoader = true;
      let len = this.repeatedFieldData.length;
      let repeatedFieldsValue: any = {};
      for (let idx = 0; idx < len; idx++) {
        let data = this.repeatedFieldData[idx];
        for (let field of this.repeatedFields) {
          repeatedFieldsValue[field.name + (idx + 1)] = data[field.name];
        }
      }
      let req = this.formGroup.value;
      req = {
        ...req,
        ...repeatedFieldsValue
      }
      let api = this.apiService.postData(this.apiUrl, [req]);
      if(this.isModify) {
        api = this.apiService.putData(this.apiUrl, [req]);
      }

      api.subscribe(response => {
        console.log("api response", response);
        this.showLoader = false;
        this.successMsg = this.isModify ? "Data updated successfully!" : "Data added successfully!";
        this.success = true;
        this.error = false;
        this.afterAPIOperation();
      }, err => {
        console.log("err in inserting ctq data ", err);
        this.showLoader = false;
        this.errMsg = this.isModify ? "Error in updating data" : "Error in adding data";
        this.error = true;
        this.success = false;
        this.afterAPIOperation();
      })
    }
  }

  afterAPIOperation() {
    this.formGroup?.reset();
    this.repeatedFormGroup?.reset();
    this.repeatedFieldData = [];
    if(this.isModify) {
      this.editFields = this.editFields.map((item) => {
        item["value"] = "";
        return item;
      });
    }
    this.showForm = false;
  }

  reset() {

  }

  getAPIData(value: string, fieldName: string) {

  }

  private _filter(value: string, list: string[]): string[] {
    const filterValue = this._normalizeValue(value);
    return list.filter(custName => this._normalizeValue(custName).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value?.toLowerCase()?.replace(/\s/g, '');
  }

  getItemCodeList(value: string) {
    this.showLoader = true;
    this.apiService.getData(APIConstants.MISCELLANEOUS_API + "/MatchItemcodeListForCust/" + value)
      .subscribe(result => {
        this.itemCodeList = result;
        //this.filterItemCodeList = of(this.itemCodeList);
        
        this.filterItemCodeList= this.formGroup?.get("itemcode")?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value, this.itemCodeList)),
        );
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
      });

  }



}
