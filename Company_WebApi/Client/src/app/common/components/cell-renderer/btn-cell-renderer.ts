import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'btn-cell-renderer',
    template: `
      <button [class]='btnClass' (click)="btnClickedHandler()"><i [class]='iconClass'></i></button>
    `,
  })
  export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
    refresh(params: ICellRendererParams): boolean {
      return true;
    }

    btnClass: string = "btn btn-primary";
    iconClass: string = "fas fa-edit";
   
    private params: any;
  
    agInit(params: any): void {
      this.params = params;
      if(params.colDef.field == "delete") {
        this.btnClass = "btn btn-danger";
        this.iconClass = "fas fa-trash";
      }
    }
  
    btnClickedHandler() {
      this.params.clicked(this.params.data);
    }
  
    ngOnDestroy() {
      // no need to remove the button click handler 
      // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }
  }