import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Grid } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app-constants';
import { IFieldConfig } from '../../model/i-field-config';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel.service';
import { UtilService } from '../../services/util.service';
import { AgGridDateComponentComponent } from '../ag-grid-date-component/ag-grid-date-component.component';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.css']
})
export class GridViewComponent implements OnInit {

  @Input()
  apiUrl: string = "";
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle: string = "";

  gridData: any[] = [];
  filterData:{ [key: string]: any }[] = [];
  exportData:{ [key: string]: any }[] = [];
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  fieldDatails: any = {};
  fieldInfo: any = {};
  loader: boolean = false;
  showMachineColumn: boolean = false;
  showCheckBox: boolean = false;
  searchText: string = "";
  fields: any = {};
  private gridApi: any;
  private gridColumnApi: any;
  frameworkComponents: any;
  showTotalPrice: boolean = false;
  totalPrice: number = 0;

  constructor(private apiService: ApiService,
    private utilService: UtilService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.apiUrl.toLowerCase().endsWith("itemmaster")) {
      this.showCheckBox = true;
    }
    if(this.apiUrl.toLowerCase().endsWith("pomaster") || this.apiUrl.toLowerCase().endsWith("loaddaylist")) {
      this.showTotalPrice = true;
    }
    if(this.gridData.length == 0){
      this.loader = true;
      this.apiService.getData(this.apiUrl).subscribe((response) => {        
        this.gridData = response.map((item: any, index: number) => {
          item["sNo"] = (index + 1);
          if(item["totalSalePrice"] && !isNaN(item["totalSalePrice"])) {            
            this.totalPrice += parseInt(item["totalSalePrice"]);
          }
          
          return item;
        });
        for(let item of this.gridData) {
          for(let key in item) {
            if(this.fields["date"] && this.fields["date"].indexOf(key) > -1) {
              item[key] = new Date(item[key]);
            }
          }
        }
        this.filterData = this.gridData;
        this.exportData = this.gridData;
        this.loader = false;
        
      }, err => {
        this.loader = false;
      })
    }

    if(this.jsonLocation) {
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
        let columnDefs = [];
        let dateFields: string[] = [];

        if(fieldDetails["Repeated Columns"]) {
          let repeatedColumns = fieldDetails["Repeated Columns"];
          let fieldsSize = repeatedColumns.size;
          let fields = repeatedColumns.fields;
          let fieldsNames = fieldInfo.repeatedFields;
          
          for(let idx = 1; idx <= fieldsSize; idx++) {
            for(let fieldName of fieldsNames) {
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

        for(let field of fieldInfo.fields) {
          let fieldConfig: IFieldConfig = fieldDetails[field];
          let columnDef: any = {
            field: fieldConfig.name,
            headerName: fieldConfig.label,
            headerTooltip: fieldConfig.label,
            width: fieldConfig.width
          }
          if(fieldConfig.pinned) {
            columnDef["pinned"] = true;
          }
          if(fieldConfig.hide){
            columnDef["hide"] = true;
          } 
          if(fieldConfig.type == "date") {
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
        this.fields["date"] = dateFields;
        //columnDefs[0].hide = true;
        this.columnDefs = columnDefs;
        this.fieldDatails = fieldDetails;
        this.fieldInfo = fieldInfo;

      });
      
      //this.columnDefs[0].hide = true;
      const gridOptions = {
        defaultColDef: this.defaultColDef,
        columnDefs: this.columnDefs
      };
      //this.gridOptions = gridOptions;
      //this.frameworkComponents = { agDateInput: AgGridDateComponentComponent };
    }

    
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  onChange() {
    //console.log("checked", value);
    let columnDef = this.columnDefs.map((value) => {
      if(value.field?.startsWith("machine")) {
        value.hide = !this.showMachineColumn
      }
      
      return value;
    });
    
    this.gridApi.setColumnDefs(columnDef);
  }

  onFilterChanged(params: any): void {
    console.log(params.api?.getDisplayedRowCount());
    console.log(params?.api?.rowModel?.rowsToDisplay)
    this.exportData = params?.api?.rowModel?.rowsToDisplay.map((item: any) => item.data);
    this.totalPrice = 0;
    this.exportData.forEach(item => {
      if(item["totalSalePrice"] && !isNaN(item["totalSalePrice"])) {            
        this.totalPrice += parseInt(item["totalSalePrice"]);
      }    
      
    })
    console.log("export daa", this.exportData);
  }

  onSearch() {
    this.doSearch(this.searchText);
  }

  doSearch(searchText: string) {
    
    let rowData = [];
    
    if(searchText && searchText.trim().length >  3) {
      for(let row of this.gridData) {
        for(let key in row) {
          let value:string = row[key].toString().toLowerCase();
          if(value.includes(searchText)) {
            rowData.push(row);
            break;
          }
        }
      }
    }
    else {
      rowData = this.gridData;
    }
    this.filterData = rowData;
    this.exportData = this.filterData;

    this.exportData.forEach(item => {
      if(item["totalSalePrice"] && !isNaN(item["totalSalePrice"])) {            
        this.totalPrice += parseInt(item["totalSalePrice"]);
      }
    });
  }

  export() {
    this.loader = true;
    let that:any = this;
    setTimeout(function() {
       that.excelService.downloadExcel(that.pageTitle, that.exportData, that.fieldInfo.fields, that.fieldDatails ).subscribe((isDownloaded: boolean) => {
          if(isDownloaded) {
            that.loader = false;
          }
        });
    }, 100);
   
  }
}

const filterParams = {
  comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
    const dateAsString = cellValue;
    const dateParts = dateAsString.split('/');
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return -1;
  },
};
