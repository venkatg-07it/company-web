import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { ExcelService } from 'src/app/common/services/excel.service';

@Component({
  selector: 'app-missing-list',
  templateUrl: './missing-list.component.html',
  styleUrls: ['./missing-list.component.css']
})
export class MissingListComponent implements OnInit {

  gridData: any[] = [];
  filterData:{ [key: string]: any }[] = [];
  exportData:{ [key: string]: any }[] = [];
  defaultColDef: any = {};
  columnDefs: ColDef[] = [];
  frameworkComponents: any;
  private gridApi: any;
  private gridColumnApi: any;

  isAssembly: boolean = false;
  isComponent: boolean = false;
  pageTitle: string = "";
  apiUrl: string = "";
  showLoader: boolean = false;
  fieldDatails: any = {};
  fieldInfo: any = {};

  constructor(private router: Router, private apiService: ApiService,
    private excelService: ExcelService) { }

  ngOnInit(): void {    

    this.fieldInfo["fields"] = ["Item Code"]
    this.fieldDatails = {
      "Item Code":{
        "label": "Item Code",
        "name": "itemcode"
      },
    }

    let columnDefs = [
      {
        field: "itemcode",
        headerName: "Item Code",
        headerTooltip: "Item Code",
        width: 1000        
      }
    ];

    this.defaultColDef = {      
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    };

    switch(this.router.url) {
      case "/missing-assembly":
        this.isAssembly = true;
        this.pageTitle = "MISSING ITEM CODE IN ASSEMBLY MASTER"
        this.apiUrl = APIConstants.MISSING_ASSEMBLY_MASTER;
        break;
      case "/missing-component":
        this.pageTitle = "MISSING ITEM CODE IN COMPONENT MASTER"
        this.isComponent = true;
        this.apiUrl = APIConstants.MISSING_COMPONENT_MASTER;
        break;        
    }
    this.columnDefs = columnDefs;
    this.showLoader = true;
    this.apiService.getData(this.apiUrl).subscribe(response => {
      this.gridData = response;
      this.exportData = this.gridData;
      this.showLoader = false;
    }, err => {
      this.gridData = [];
      this.showLoader = false;
    })
    
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.columnDefs);
  }

  onFilterChanged(params: any): void {
    console.log(params.api?.getDisplayedRowCount());
    console.log(params?.api?.rowModel?.rowsToDisplay)
    this.exportData = params?.api?.rowModel?.rowsToDisplay.map((item: any) => item.data);   
    
  }

  export() {
    this.showLoader = true;
    let that:any = this;
    setTimeout(function() {
       that.excelService.downloadExcel(that.pageTitle, that.exportData, that.fieldInfo.fields, that.fieldDatails ).subscribe((isDownloaded: boolean) => {
          that.showLoader = false;
        });
    }, 100);
  }

}
