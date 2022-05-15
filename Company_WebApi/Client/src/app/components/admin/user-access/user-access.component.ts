import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { SharedService } from 'src/app/common/services/shared.service';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';
// import 'ag-grid-enterprise';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.css']
})
export class UserAccessComponent implements OnInit {

  public columnDefs: ColDef[] = [    
    {field: '', headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, width: 100},
    { field: 'group',},
    { field: 'name1', headerName: 'Name' },
    { field: 'breadcrumb', width: 500 }
  ];
  public defaultColDef: ColDef = {    
    width: 350,
    sortable: true,
    resizable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public rowData!: any[];
  private gridApi: any;

  rowSelection: string = "multiple";
  userNameList: any[] = [];
  filterUserNameList: any[] = [];
  showLoader: boolean = false;
  
  constructor(private sharedService: SharedService, private apiService: ApiService) { }

  ngOnInit(): void {
   // this.rowData = this.sharedService.getMenuGridData();
   this.fetchUsersList();
  }

  onGridReady(params: any) {
    this.gridApi = params.api;

    this.gridApi.forEachNode( (node: any) => {
      console.log("node",node);
      node.setSelected(true);
    });
    
    console.log("rendereded", this.gridApi.getRenderedNodes())    
  
  }

  loadUserAccessGrid() {
    this.rowSelection = 'multiple';
    this.rowData = this.sharedService.getMenuGridData().map(itm => {      
      itm['selected'] = true;
      return itm;
    });
    console.log("row data", this.rowData);
    
    this.gridApi.forEachNode( (node: any) => {
      console.log("node",node);
      node.setSelected(true);
    });

    setTimeout(() => {
      this.gridApi.forEachNode( (node: any) => {
        //console.log("node",node);
        node.setSelected(node.data.selected);
      });
    }, 2000)

  }


  onKeyup(event: any) {
    this.filterUserNameList = this.userNameList.filter((item) => item.userName.toLowerCase().includes(event.target.value.toString().toLowerCase()));
  }

  getAPIData(value: any) {
    console.log("selected value", value);
    // let apiUrl = APIConstants.MISCELLANEOUS_API + "/NestingNumberList/" + value;
    // this.apiService.getData(apiUrl).subscribe(response => {
    //   this.afterFetchNestingAPI(response);
    // }, err => {
    //   console.log("error while fetching nesting number list", err);
    //   this.afterFetchNestingAPI([]);
    // })
  }

  afterFetchNestingAPI(response: any[]) {
    this.rowData = response;    
    this.showLoader = false;
  }

  fetchUsersList() {
    this.filterUserNameList = [
      {userId: "venkat", userName: "Venkatesh G"},
      {userId: "siva", userName: "Siva"}
    ]
  }

}
