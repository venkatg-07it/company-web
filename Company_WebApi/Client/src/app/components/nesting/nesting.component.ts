import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BtnCellRenderer } from 'src/app/common/components/cell-renderer/btn-cell-renderer';



@Component({
  selector: 'app-nesting',
  templateUrl: './nesting.component.html',
  styleUrls: ['./nesting.component.css']
})
export class NestingComponent implements OnInit {

  model: string = "";
  @ViewChild('dp') dp: NgbDatepicker | undefined;
  pageTitle: string = "";
  loadDayDDList: string[] = [];
  showLoader: boolean = false;
  loadDay: string = "";
  loadDayDropDown: string = "";


  nestingData: any[] = [];
  filteredNestingData: any[] = [];


  nestingItem: any = {};
  nestingEdit: boolean = false;
  btnClicked: boolean = false;

  btnText: string = "Add";
  apiUrl: string = "";

  isDataUploaded: boolean = false;
  isSuccess: boolean = false;
  isFailure: boolean = false;
  errMsg: string = "";
  loadNestingForm: boolean = false;

  columnDefs: ColDef[] = [];
  defaultColDef: any = {};
  fieldDatails: any = {};
  fieldInfo: any = {};
  frameworkComponents: any;
  private gridApi: any;
  private gridColumnApi: any;

  formGroup: FormGroup | undefined;
  editFormGroup: FormGroup | undefined;
  formFields: any[] = [];
  editformFilterFields: any[] = [];

  rmSizeList: any[] = [];
  filterRmSizeList: any[] = [];
  rmCodeList: any[] = [];
  filterRmCodeList: any[] = [];
  itemCodeList: string[] = [];
  filterItemCodeList: string[] = [];
  itemCodeData: any[] = [];
  isModify: boolean = false;
  isDummy: boolean = false;
  disableSubmit: boolean = true;

  totalQty:number = 0;

  constructor(private apiService: ApiService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.apiUrl = APIConstants.NESTING_MASTER;
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer
    };

    let requests: Observable<any>[] = [];
    let location = "nesting/";
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      location +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      location +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));

    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
      let fieldInfo = responses[0];
      let fieldDetails = responses[1];
      let columnDefs = [];
      let dateFields: string[] = [];
      

      this.fieldDatails = fieldDetails;
      this.fieldInfo = fieldInfo;
      
      for (let field of fieldInfo.fields) {
        let fieldConfig: IFieldConfig = fieldDetails[field];
        let columnDef: any = {
          field: fieldConfig.name,
          headerName: fieldConfig.label,
          headerTooltip: fieldConfig.label,
          width: fieldConfig.width
        }
        if (fieldConfig.pinned) {
          columnDef["pinned"] = true;
        }
        if (fieldConfig.hide) {
          columnDef["hide"] = true;
        }
        if (fieldConfig.type == "date") {
          columnDef['filter'] = 'agDateColumnFilter';
          columnDef["valueFormatter"] = this.utilService.dateFormatter;
          columnDef['filterParams'] = this.utilService.getDateFilterParams();
          dateFields.push(fieldConfig.name);
        }
        columnDefs.push(columnDef);
      }
      this.defaultColDef = {
        width: 150,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
      };
      let that = this;
      let columnDef: any = {
        field: "edit",
        headerName: "Edit",
        headerTooltip: "Edit",
        width: 100,
        pinned: 'right',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          that: that,
          clicked: function (field: any) {
            this.that.editGrid(field);            
          }
        },
      };

      columnDefs.push(columnDef);

      columnDef = {
        field: "delete",
        headerName: "Delete",
        headerTooltip: "Delete",
        width: 100,
        pinned: 'right',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          that: that,
          clicked: function (field: any) {
            this.that.deleteGrid(field);            
          }
        },
      };
      columnDefs.push(columnDef);
      //columnDefs[0].hide = true;
      this.columnDefs = columnDefs;
      this.fieldDatails = fieldDetails;
      this.fieldInfo = fieldInfo;


    });

    this.resetForm();
    this.pageTitle = AppConstants.PAGE_TITLE_NESTING;
    let date = this.utilService.dateFormatter({ value: new Date() });

    this.loadDay = this.utilService.getLoadDayFormatDefaultDate(new Date());
    this.model = date ? date : "";
  }




  editGrid(data: any) {
    this.formGroup?.patchValue(data);
  }

  deleteGrid(data: any) {
    let nestingQty = parseInt(data.nestingQty);
    let processQty = parseInt(data.processQty);
    let totalQty = parseInt(this.formGroup?.get("remaining")?.value);
    totalQty += (nestingQty * processQty);

    let item = this.itemCodeData.filter((item) => item.itemcode == data.itemcode);
    if (item.length > 0) {
      item[0].finalQty = totalQty;

    }
    this.formGroup?.patchValue({
      "remaining": totalQty
    });
    
    if(totalQty == 0) {
      this.disableSubmit = false;
    }
    else {
      this.disableSubmit = true;
    }

    this.nestingData = this.nestingData.filter((item) => item.sNo !== data.sNo);
    this.filteredNestingData = this.nestingData;
    this.gridApi.setRowData(this.filteredNestingData);

  }

  onDateSelect(event: any) {
    this.resetForm();
    this.showLoader = true;
    this.loadDay = this.utilService.getLoadDayFormat(event.year, event.month, event.day);
    this.model = this.utilService.getFormattedDateForCustom(event.year, event.month, event.day);
    this.loadDay = this.loadDay.trim();
    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;

    if(this.isDummy) {
      dropdownUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoaddayGroupList/D" + this.loadDay;
    }

    this.apiService.getData(dropdownUrl).subscribe(response => {
      this.loadDayDDList = response;
      this.showLoader = false;
    },
      err => {
        this.loadDayDDList = [];
        this.showLoader = false;
      });
  }

  loadForm() {
    let loadDay = this.loadDay + this.loadDayDropDown;

    this.createFormGroup();
    this.resetForm();


    

    this.showLoader = true;

    if(this.isDummy) {
      loadDay = 'D' + loadDay;
    }
    this.formGroup?.patchValue({
      "planningLoadDay": loadDay,
      "potype": "Fixed"
    });

    this.editFormGroup?.patchValue({
      "planningLoadDay": loadDay,      
    });

    if(!this.isModify) {
      this.nestingData = [];
      this.filteredNestingData = [];
    }

    let dropdownUrl = APIConstants.MISCELLANEOUS_API + "/NestingRMSizeList/" + loadDay;
    if(this.isDummy) {
      dropdownUrl = APIConstants.MISCELLANEOUS_API + "/DummyNestingRMSizeList/" + loadDay;
    }

    this.apiService.getData(dropdownUrl).subscribe(response => {
      this.rmSizeList = response;
      this.filterRmSizeList = response;
      this.showLoader = false;
      this.loadNestingForm = true;
    },
      err => {
        this.showLoader = false;
        this.loadNestingForm = true;
      });
    

    
  }

  loadEditData() {
    let loadDay = this.loadDay + this.loadDayDropDown;
    
    let dataUrl = this.apiUrl + "/" + loadDay;
    if(this.isDummy) {
      dataUrl = APIConstants.DUMMY_PO_MASTER + "/D" + loadDay;
    }
    this.showLoader = true;
    this.apiService.getData(dataUrl).subscribe(response => {
      let totalQty = 0;
      this.nestingData = response.map((item: any, index: number) => {
        item["sNo"] = index + 1;
        totalQty += parseInt(item["nestingQty"]);
        return item;
      });

      this.formGroup?.patchValue({
        "remaining": 0
      });
      //this.totalQty = totalQty;

      this.filteredNestingData = this.nestingData;
      this.showLoader = false;
      this.loadNestingForm = true;
      this.disableSubmit = false;
    }, err => {
      this.showLoader = false;
      this.loadNestingForm = true;
    });
  }

  createFormGroup() {
    let fieldInfo = this.fieldInfo;
    let fields = JSON.parse(JSON.stringify(fieldInfo)).fields;
    
    let colSize = 3;
    fields.shift();
    let formGroup: any = {};
    let editFilterFormGroup: any = {};
    
    let editFilterFields = [];    
    let editFilterFieldNames = ["Load Day","S1 of RM","RM Code","Item Code"];
    let editFieldNames = ["Nesting Name","Nesting Qty","Process Qty","Remaining"];
    if(this.isModify) {
      editFilterFields = fields.filter((item: string) => editFilterFieldNames.indexOf(item) > -1);
      fields = fields.filter((item: string) => editFieldNames.indexOf(item) > -1);

    }
    if(this.isModify) {
      colSize = 4;
    }
    this.formFields = this.getFormFields(fields, formGroup, colSize);
    this.editformFilterFields = this.getFormFields(editFilterFields, editFilterFormGroup, 4);
    
    formGroup["sNo"] = new FormControl('', []);
    this.formGroup = new FormGroup(formGroup);
    this.editFormGroup = new FormGroup(editFilterFormGroup);
  }


  getFormConfigFIelds(fields: string[], formGroup: any) {
    let fieldDetails = this.fieldDatails;
    return fields.map((item: string) => {

      let validators: ValidatorFn[] = [];
      let fieldConfig = fieldDetails[item];
      if (fieldConfig.required) {
        validators.push(Validators.required);
      }
      if (fieldConfig.length) {
        validators.push(Validators.maxLength(fieldConfig.length));
      }

      formGroup[fieldConfig.name] = new FormControl('', validators);

      return fieldConfig
    });
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

  onKeyup(event: any, fieldName: string) {
    switch (fieldName) {
      case "s1ofRm":
        this.filterRmSizeList = this.rmSizeList.filter((item) => item.toLowerCase().includes(event.target.value.toString().toLowerCase()));
        break;
      case "rmcode":
        this.filterRmCodeList = this.rmSizeList.filter((item) => item.toLowerCase().includes(event.target.value.toString().toLowerCase()));
        break;
      case "itemcode":
        this.filterItemCodeList = this.itemCodeList.filter((item) => item.toLowerCase().includes(event.target.value.toString().toLowerCase()));
        break;
    }

  }
  
  getAPIData(value: string, fieldName: string) {
    this.showLoader = true;
    let loadDay = this.loadDay + this.loadDayDropDown;
    let formGroup = this.isModify ? this.editFormGroup : this.formGroup;
    let dropdownUrl = "";

    if(this.isDummy) {
      loadDay = 'D' + loadDay;
    }
    
    switch (fieldName) {
      case "s1ofRm":
        value = encodeURI(value);
        dropdownUrl = APIConstants.MISCELLANEOUS_API + "/NestingRMCodeList/" + loadDay + "/" + value;

        if(this.isDummy) {
          dropdownUrl = APIConstants.MISCELLANEOUS_API + "/DummyNestingRMCodeList/" + loadDay + "/" + value;
        }
        this.apiService.getData(dropdownUrl).subscribe(response => {
          this.rmCodeList = response;
          this.filterRmCodeList = this.rmCodeList;
          this.showLoader = false;
          
          
          formGroup?.patchValue({
            "rmcode": "",
            "itemcode": ""
          });
        }, err => {
          this.showLoader = false;
        });



        break;
      case "rmcode":
        let rmCode = this.formGroup?.get("s1ofRm")?.value;
        let urlMethod = "/NestingItemCodeListForInsert/";
        if(this.isDummy) {
          urlMethod = "/DummyNestingItemCodeListForInsert/";
        }
        if(this.isModify) {
          urlMethod = "/NestingItemCodeListForUpdate/";
          if(this.isDummy) {
            urlMethod = "/DummyNestingItemCodeListForUpdate/";
          }
          rmCode = this.editFormGroup?.get("s1ofRm")?.value;
        }

        rmCode = encodeURI(rmCode);
        value = encodeURI(value);
        dropdownUrl = APIConstants.MISCELLANEOUS_API + urlMethod + loadDay + "/" + rmCode + "/" + value;

        this.apiService.getData(dropdownUrl).subscribe(response => {
          this.itemCodeData = response;
          this.itemCodeList = this.itemCodeData.map((item: any) => item.itemcode);
          this.filterItemCodeList = this.itemCodeList;
          this.showLoader = false;
          formGroup?.patchValue({            
            "itemcode": ""
          });
        }, err => {
          this.showLoader = false;
        });


        break;
      case "itemcode":
        let data = this.itemCodeData.filter((item) => item.itemcode == value);
        if (data.length > 0) {
          formGroup?.patchValue(
            {
              "remaining": data[0].finalQty
            }
          );

        }
        this.showLoader = false;
        break;
    }
    
  }



  clear() {
    this.resetForm();
    this.nestingItem = {};
    this.btnText = "Add";
  }

  edit(data: any) {
    this.resetForm();
    this.btnClicked = true;
    this.nestingEdit = true;
    this.nestingItem = data;
    this.btnText = "Update";
  }

  delete(data: any) {
    this.resetForm();
    this.nestingData = this.nestingData.filter((item) => item.sNo != data.sNo);
  }

  doSearch(event: any) {
    this.resetForm();
    let rowData = [];
    let searchText = event.target.value;
    if (searchText) {
      for (let row of this.nestingData) {
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
      rowData = this.nestingData;
    }
    this.filteredNestingData = rowData;
  }

  submit() {
    this.showLoader = true;
    if (this.nestingData.length > 0) {
      let url = APIConstants.NESTING_MASTER + "/PostNestingMaster";
      // if(this.isDummy) {
      //   url = APIConstants.DUMMY_PO_MASTER + "/PostDummyNestingMaster";
      // }
      this.apiService.postData(url, this.nestingData).subscribe(response => {

        //this.showLoader = false;
        this.isDataUploaded = true;
        this.isSuccess = true;
        this.itemCodeData = [];
        this.itemCodeList = [];
        this.rmCodeList = [];
        this.formGroup?.reset();
        let loadDay = this.loadDay + this.loadDayDropDown;
        
        if(this.isDummy) {
          loadDay = 'D' + loadDay;
        }

        this.formGroup?.patchValue({
          "planningLoadDay": loadDay,
          "potype": "Fixed"
        });

        this.nestingData = [];
        this.filteredNestingData = this.nestingData;

        let dropdownUrl = APIConstants.MISCELLANEOUS_API + "/NestingRMSizeList/" + loadDay;
        if(this.isDummy) {
          dropdownUrl = APIConstants.MISCELLANEOUS_API + "/DummyNestingRMSizeList/D" + loadDay;
        }
        this.apiService.getData(dropdownUrl).subscribe(response => {
          this.rmSizeList = response;
          this.filterRmSizeList = response;
          this.showLoader = false;
          this.loadNestingForm = true;
        },
          err => {
            this.showLoader = false;
            this.loadNestingForm = true;
          });
      },
        err => {
          this.showLoader = false;
          this.isDataUploaded = true;
          this.isFailure = true;
          this.errMsg = "Error in while uploading data";
        });
    }
    else {
      this.isDataUploaded = true;
      this.showLoader = false;
      this.isFailure = true;
      this.errMsg = "Atleast add one data";
    }

  }

  resetForm() {
    this.isDataUploaded = false;
    this.isSuccess = false;
    this.isFailure = false;
  }



  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  submitForm() {
    let nestingQty = parseInt(this.formGroup?.get("nestingQty")?.value);
    let processQty = parseInt(this.formGroup?.get("processQty")?.value);
    let totalQty = parseInt(this.formGroup?.get("remaining")?.value);
    let itemCode = this.formGroup?.get("itemcode")?.value;

    if(processQty == 0) {
      this.formGroup?.get("processQty")?.setErrors({ "invalidQty": "Invalid Qty" });
    }
    if(nestingQty == 0) {
      this.formGroup?.get("nestingQty")?.setErrors({ "invalidQty": "Invalid Qty" });
    }
    if ((processQty * nestingQty) > totalQty) {
      this.formGroup?.get("nestingQty")?.setErrors({ "incorrect": true });
    }

    this.formGroup?.updateValueAndValidity();
    let rowData = this.nestingData;
    if (this.formGroup?.valid) {
      let data = this.formGroup.value;
      if (rowData.length == 0) {
        data["sNo"] = 1;
        rowData.push(data);
      }
      else {
        if (!data["sNo"]) {
          data["sNo"] = parseInt(rowData[rowData.length - 1].sNo) + 1;
          rowData.push(data);
        }

      }

      //this.formGroup.reset();
      let loadDay = this.loadDay + this.loadDayDropDown;
      totalQty -= (processQty * nestingQty);

      let item = this.itemCodeData.filter((item) => item.itemcode == itemCode);
      if (item.length > 0) {
        item[0].finalQty = totalQty;

      }
      this.formGroup?.patchValue({
        "nestingno": "",
        "nestingQty": "",
        "processQty": "",
        "sNo": "",
        "remaining": totalQty
      });

      if(totalQty == 0) {
        this.disableSubmit = false;
      }
      else {
        this.disableSubmit = true;
      }

      
    }
    else {
      
    }

    this.nestingData = rowData;
    this.filteredNestingData = this.nestingData;
    if (this.gridApi) {
      this.gridApi.setRowData(this.filteredNestingData);
    }

  }


}
