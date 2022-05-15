import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-component-master',
  templateUrl: './ee-component-master.component.html',
  styleUrls: ['./ee-component-master.component.css']
})
export class EeComponentMasterComponent {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";


}
