import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-assembly-master',
  templateUrl: './ee-assembly-master.component.html',
  styleUrls: ['./ee-assembly-master.component.css']
})
export class EeAssemblyMasterComponent {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";


}