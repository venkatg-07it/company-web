import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  public columnDefs: ColDef[] = [    
    { field: 'sNo'},
    { field: 'name', headerName: 'Name'},
    { field: 'department'},
    { field: 'loginId', headerName: 'Login ID' },
    { field: 'password' },
    { field: 'liveOrRetired', headerName: 'Live/Retired' },
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

  
  userNameList: any[] = [];
  filterUserNameList: any[] = [];
  showLoader: boolean = false;
  
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onGridReady(params: any) {

  }

  loadGridData() {
    let rowData = [{name: 'Sathyaseelan.A', department: 'Production', loginId: 'Sam0003', password: 'Samraj@123', liveOrRetired: 'L' }];
  }

}
