import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ActionCellRendererComponent } from 'src/app/common/components/action-cell-renderer/action-cell-renderer.component';
import { MediaCellRendererComponent } from 'src/app/common/components/media-cell-renderer/media-cell-renderer.component';

@Component({
  selector: 'app-item-image-upload',
  templateUrl: './item-image-upload.component.html',
  styleUrls: ['./item-image-upload.component.css']
})
export class ItemImageUploadComponent implements OnInit {

  filterData:{ [key: string]: any }[] = [];
  columnDefs: ColDef[] = [];
  frameworkComponents: any = {};
  defaultColDef: any = {};
  gridApi: any;
  showLoader= false;
  context: any = {};

  constructor() { }

  ngOnInit(): void {
    this.context= {
      componentParent: this
    }
    let columnDefs = [];
    columnDefs.push({
      "field": "sNo",
      "headerName": "S.No",
      "width": 100
    });
    columnDefs.push({
      "field": "itemCode",
      "headerName": "Item Code",
      "width": 200
    });
    columnDefs.push({
      "field": "image1",
      "headerName": "Image 1",
      "width": 465,
      "cellRenderer": "mediaCellRenderer"
    });
    columnDefs.push({
      "field": "image2",
      "headerName": "Image 2",
      "width": 465,
      "cellRenderer": "mediaCellRenderer"
    });
    columnDefs.push({
      "field": "action",
      "headerName": "Action",
      "width": 100,
      "cellRenderer": "actionCellRenderer"
    });

    this.columnDefs = columnDefs;

    this.frameworkComponents = {
      "mediaCellRenderer": MediaCellRendererComponent,
      "actionCellRenderer" : ActionCellRendererComponent
    }

    let filterData = [];
    filterData.push({
      "sNo": 1,
      "itemCode": 101,
      "image1": "Image 1",
      "image2": "Image 2",
      "action": "Submit"
    });

    filterData.push({
      "sNo": 1,
      "itemCode": 102,
      "image1": "Image 1",
      "image2": "Image 2",
      "action": "Submit"
    });

    this.filterData = filterData;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;    
    this.gridApi.setColumnDefs(this.columnDefs);
    this.gridApi["customParam"] = {
      componentParent: this
    }
  }

  actionEvent() {
    alert("clicked");
  }
}
