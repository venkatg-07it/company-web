import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-component-master',
  templateUrl: './ae-component-master.component.html',
  styleUrls: ['./ae-component-master.component.css']
})
export class AeComponentMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
  
}