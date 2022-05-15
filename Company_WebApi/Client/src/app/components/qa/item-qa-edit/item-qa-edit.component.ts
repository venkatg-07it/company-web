import { typeSourceSpan } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AnchorCellRenderer } from 'src/app/common/components/cell-renderer/anchor-cell-renderer';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { IFieldConfig } from 'src/app/common/model/i-field-config';
import { ApiService } from 'src/app/common/services/api.service';
import { UtilService } from 'src/app/common/services/util.service';

@Component({
  selector: 'app-item-qa-edit',
  templateUrl: './item-qa-edit.component.html',
  styleUrls: ['./item-qa-edit.component.css']
})
export class ItemQaEditComponent implements OnInit {

  gridData: any[] = [];
  filterData: { [key: string]: any }[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: any = {};
  frameworkComponents: any;
  private gridApi: any;
  private gridColumnApi: any;
  fieldDetails: any = {};
  fieldInfo: any = {};
  showLoader: boolean = false;
  showModel: boolean = false;
  item: any = {};
  modelItem: any[] = [];
  processData: any = {};
  qaFormGroup: FormGroup | undefined;
  uiFields: any[] = [];
  success: boolean = false;
  error: boolean = false;
  src: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  isLaser: boolean = false;
  constructor(private apiService: ApiService,
    private utilService: UtilService) { }

  ngOnInit(): void {
    this.frameworkComponents = {
      anchorCellRenderer: AnchorCellRenderer
    };
    this.showLoader = true;
    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_ITEM_MASTER +
      AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
      AppConstants.FILE_PATH_ITEM_MASTER +
      AppConstants.FILE_NAME_FIELD_DETAILS;

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));
    requests.push(this.apiService.getData(APIConstants.ITEM_MASTER_UPLOAD))

    this.utilService.getBulkAsyncData(requests).subscribe(responses => {

      this.showLoader = false;
      let fieldInfo = responses[0];
      let fieldDetails = responses[1];

      this.gridData = responses[2];
      this.filterData = this.gridData;

      let columnDefs = [];
      let dateFields: string[] = [];

      if (fieldDetails["Repeated Columns"]) {
        let repeatedColumns = fieldDetails["Repeated Columns"];
        let fieldsSize = repeatedColumns.size;
        let fields = repeatedColumns.fields;
        let fieldsNames = fieldInfo.repeatedFields;

        for (let idx = 1; idx <= fieldsSize; idx++) {
          for (let fieldName of fieldsNames) {
            let field = fields[fieldName];
            let key = field.label + " " + idx;
            fieldDetails[key] = {
              "label": key,
              "name": field.name + idx,
              "width": 200,
              "type": "text",
              "required": true
            }
            fieldInfo.fields.push(key);
          }
        }
      }

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

        if (fieldConfig.name == "itemcode") {
          let that = this;
          columnDef["cellRenderer"] = "anchorCellRenderer";
          columnDef["cellRendererParams"] = {
            that: that,
            clicked: function (field: any) {
              this.that.openQAForm(field);
            }
          };
        }

        columnDefs.push(columnDef);
      }

      this.defaultColDef = {
        width: 150,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
      };

      //columnDefs[0].hide = true;
      this.columnDefs = columnDefs;
      this.fieldDetails = fieldDetails;
      this.fieldInfo = fieldInfo;

    }, err => {
      this.showLoader = false;
    });

    //this.columnDefs[0].hide = true;
    const gridOptions = {
      defaultColDef: this.defaultColDef,
      columnDefs: this.columnDefs
    };


  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  openQAForm(data: any) {
    this.item = data.data;
    let formGroup: any = {};
    let editFormFields: any[] = [];
    let qaFormFields = [];
    this.isLaser = false;
    let nonLaser = false;
    
    for (let idx = 1; idx < 16; idx++) {
      let value = this.item["process" + idx];
      if (value) {
        if (value.trim().toLowerCase().includes("laser") ||
          value.trim().toLowerCase().includes("tpp")) {
          this.isLaser = true;
        }
        else {
          nonLaser = true;
        }
      }
    }

    let both = (this.isLaser && nonLaser);
    
    for (let idx = 0; idx < 3; idx++) {
      let fields = this.fieldInfo.qaForm.editableFields[idx];
      let title = "";
      let qaFormRowFields = [];
      for (let field of fields) {
        let fieldConfig: any = this.fieldDetails[field];
        fieldConfig["placeholder"] = fieldConfig.label;
        switch (idx) {
          case 0:
            title = "Laser/TPP";
            if(!both && !this.isLaser) {
              title = "";
            }
            else {
              fieldConfig["required"] = true;
            }
            fieldConfig["placeholder"] = fieldConfig.label.replace(" for Laser/TPP", "");
            fieldConfig.label = fieldConfig["placeholder"];
            if (fieldConfig["placeholder"] && fieldConfig["placeholder"] == "QUALITY FLAG") {
              fieldConfig["placeholder"] = "Y/N";
            }
            
            break;
          case 1:
            title = "Other than Laser/TPP";
            if(!both && this.isLaser) {
              title = "";
            }
            else {
              fieldConfig["required"] = true;
            }
            fieldConfig["placeholder"] = fieldConfig.label.replace(" for Other than Laser/TPP", "");
            fieldConfig.label = fieldConfig["placeholder"];
            if (fieldConfig["placeholder"] && fieldConfig["placeholder"] == "QUALITY FLAG") {
              fieldConfig["placeholder"] = "Y/N";
            }
            break;
          default:
            title = "";
            break;
        }
        
        if(fieldConfig.label == "Qty to be Inspected") {
          fieldConfig.label = "Qty to be Inspected (%)";
        }

        let defaultValue = fieldConfig.default ? fieldConfig.default : "";
        let validators: any = [];
        if (fieldConfig.length) {
          validators.push(Validators.maxLength(fieldConfig.length));
        }
        if(fieldConfig.required) {
          validators.push(Validators.required);
        }


        if (fieldConfig.name == "remarks") {
          validators.push(Validators.required);
        }

        if (data.data[fieldConfig.name]) {
          defaultValue = data.data[fieldConfig.name];
        }

        if((fieldConfig.name == "qtytobeInspectedforLaserOrTpp" 
        && data.data["inspectionCriteriaforLaserOrTpp"] == "Batch Qty")||
        (fieldConfig.name == "qtytobeInspectedforOtherthanLaserOrTpp" 
        && data.data["inspectionCriteriaforOtherthanLaserOrTpp"] == "Batch Qty"))
        {
          validators.push(this.validateQty);
        }





        if(both) {
          if(fieldConfig.name == "qualityFlagforLaserOrTpp" ||
          fieldConfig.name == "qualityFlagforOtherthanLaserOrTpp") {
            defaultValue = "Y";
            fieldConfig["readonly"] = true;
          }
        }
        else if(this.isLaser) {
          if(fieldConfig.name == "qualityFlagforLaserOrTpp") {
            defaultValue = "Y";
            fieldConfig["readonly"] = true;
          }
        }
        else {
          if(fieldConfig.name == "qualityFlagforOtherthanLaserOrTpp") {
            fieldConfig["readonly"] = true;
            defaultValue = "Y";
          }
        }

        let formControl = new FormControl(defaultValue, validators);;
        formGroup[fieldConfig.name] = formControl;

        

        if (fieldConfig.name == "inspectionCriteriaforLaserOrTpp") {

          formControl.valueChanges.subscribe(value => {
            let fld = this.uiFields[0].fields.find((item: any) => item.name == "qtytobeInspectedforLaserOrTpp");
            fld["readonly"] = true;
            if (value == "All") {
              this.qaFormGroup?.patchValue({
                "qtytobeInspectedforLaserOrTpp": 100
              });

            }
            else if(value == "Green channel") {
              this.qaFormGroup?.patchValue({
                "qtytobeInspectedforLaserOrTpp": 0
              })
            }
            else {
              fld["readonly"] = false;
              this.qaFormGroup?.patchValue({
                "qtytobeInspectedforLaserOrTpp": ""
              })
              let validators: any = [this.validateQty];                            
              this.qaFormGroup?.get("qtytobeInspectedforLaserOrTpp")?.setValidators(validators);
              this.qaFormGroup?.updateValueAndValidity();
            }
          })
        }

        if (fieldConfig.name == "inspectionCriteriaforOtherthanLaserOrTpp") {

          formControl.valueChanges.subscribe(value => {
            let fld = this.uiFields[1].fields.find((item: any) => item.name == "qtytobeInspectedforOtherthanLaserOrTpp");
            fld["readonly"] = true;
            if (value == "All") {
              this.qaFormGroup?.patchValue({
                "qtytobeInspectedforOtherthanLaserOrTpp": 100
              })
            }
            else if(value == "Green channel") {
              this.qaFormGroup?.patchValue({
                "qtytobeInspectedforOtherthanLaserOrTpp": 0
              })
            }
            else {
              fld["readonly"] = false;
              this.qaFormGroup?.patchValue({
                "qtytobeInspectedforOtherthanLaserOrTpp": ""
              })
              let validators: any = [this.validateQty];
              this.qaFormGroup?.get("qtytobeInspectedforOtherthanLaserOrTpp")?.setValidators(validators);
            }
          })
        }

        //qaFormRowFields.push(fieldConfig);
        if(both) {
          qaFormRowFields.push(fieldConfig);
        }
        else if(this.isLaser && !fieldConfig.name.includes("OtherthanLaser")) {
          qaFormRowFields.push(fieldConfig);
        }
        else if(!this.isLaser && fieldConfig.name.includes("OtherthanLaser")) {
          qaFormRowFields.push(fieldConfig);
        }
        else if (fieldConfig.name == "remarks") {
          qaFormRowFields.push(fieldConfig);
        }
        
      }

      qaFormFields.push({
        "title": title,
        "fields": qaFormRowFields
      })
    }


    // let fieldsLen = editFormFields.length;
    // let uiFormFields = [];
    // let colSize = 2;
    // for (let idx = 0; idx < fieldsLen; idx += colSize) {
    //   let colFields = editFormFields.splice(0, colSize);
    //   uiFormFields.push(colFields);
    // }

    this.uiFields = qaFormFields;
    this.qaFormGroup = new FormGroup(formGroup);

    let modelItem: any[] = [];
    for (let fields of this.fieldInfo.qaForm.fields) {
      let fieldsList: string[] = [];
      for (let field of fields) {

        let fieldConfig: IFieldConfig = this.fieldDetails[field];
        fieldsList.push(data.data[fieldConfig.name]);
      }
      modelItem.push({
        "headers": fields,
        "values": [fieldsList]
      });
    }
    let headers = ["S.No", "Process", "Machine"];
    let fieldsData = [];
    for (let idx = 1; idx <= 15; idx++) {
      if (data.data["process" + idx]) {
        let itemList = [];
        itemList.push(idx);
        itemList.push(data.data["process" + idx]);
        itemList.push(data.data["machine" + idx]);
        fieldsData.push(itemList);
      }
    }

    modelItem.push({
      "headers": headers,
      "values": fieldsData
    });

    this.apiService.getData(APIConstants.OPERATION + "/getItemImage/" + data.value).subscribe(response => {
      if (response.length > 0) {
        this.src = "data:application/pdf;base64," + response[0];
        this.showModel = true;
      }
      else {
        console.log("no images");
        this.showLoader = false;
        this.showModel = true;
      }

    }, err => {
      console.log("no images");
      this.showLoader = false;
      this.showModel = true;
    })

    //this.showLoader = true;
    this.modelItem = modelItem;

    this.item = data.data;

  }

  closePopup() {
    this.showModel = false;
  }

  afterPdfLoad() {
    this.showLoader = false;
  }

  submitQA() {
    this.showLoader = true;
    if (this.qaFormGroup?.valid) {
      let request = {
        ...this.item,
        ...this.qaFormGroup?.value
      };
      this.apiService.putData(APIConstants.ITEM_MASTER_UPLOAD, [request]).subscribe(() => {
        this.showLoader = false;
        this.success = true;
        this.error = false;
        setTimeout(() => {
          this.success = false;
          this.error = false;
        }, 2000)
      }, err => {
        this.success = false;
        this.error = true;
        console.log("error in updating item qa data", err);
        setTimeout(() => {
          this.success = false;
          this.error = false;
        }, 2000)
      });
    }

  }

  validateQty(c: FormControl) {

    if (c.value && (c.value > 50 || (c.value % 5 != 0))) {
      return {
        inspectedQuantity: {
          valid: false
        }
      }
    }
    return null;
  }

  test(data: any) {
    console.log("logged error", data);
  }

}
