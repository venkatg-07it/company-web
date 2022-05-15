import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-assembly-master',
  templateUrl: './ae-assembly-master.component.html',
  styleUrls: ['./ae-assembly-master.component.css']
})
export class AeAssemblyMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
  
}
