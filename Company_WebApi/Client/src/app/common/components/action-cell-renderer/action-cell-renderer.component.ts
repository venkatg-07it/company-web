import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-action-cell-renderer',
  templateUrl: './action-cell-renderer.component.html',
  styleUrls: ['./action-cell-renderer.component.css']
})
export class ActionCellRendererComponent implements AgRendererComponent {
  
  params: any = {};
  showLoader: boolean = false;
  componentParent: any = {};

  @Output()
  actionEvent = new EventEmitter<boolean>();

  constructor(private apiService: ApiService) { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    console.log("value ", params);
    this.params = params;
    this.componentParent = this.params.context.componentParent;
    console.log(this.componentParent);
  }

  upload() {
    console.log(this.params.data);
    console.log(this.params);
    this.actionEvent.emit(true);
    this.componentParent.showLoader = true;
    
  }
}
