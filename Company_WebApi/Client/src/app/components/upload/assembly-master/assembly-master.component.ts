import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assembly-master',
  templateUrl: './assembly-master.component.html',
  styleUrls: ['./assembly-master.component.css']
})
export class AssemblyMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
}
