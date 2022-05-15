import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'anchor-cell-renderer',
    template: `
      <a (click)="anchorClickedHandler()" style="text-decoration:underline;color:blue;cursor:pointer">
      {{params?.value}}</a>
    `,
    styles: [
      `
      a {
        text-decoration: underline
      }
      `
    ]
  })
  export class AnchorCellRenderer implements ICellRendererAngularComp, OnDestroy {
    refresh(params: ICellRendererParams): boolean {
      return true;
    }

    btnClass: string = "btn btn-primary";
    iconClass: string = "fas fa-edit";
   
    params: any;
  
    agInit(params: any): void {
      this.params = params;      
      if(params.colDef.field == "delete") {
        this.btnClass = "btn btn-danger";
        this.iconClass = "fas fa-trash";
      }
    }
  
    anchorClickedHandler() {
      this.params.clicked(this.params);
      
    }
  
    ngOnDestroy() {
      // no need to remove the button click handler 
      // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
    }
  }