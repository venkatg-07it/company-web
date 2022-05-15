import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-im-raw-mat-master',
  templateUrl: './ae-im-raw-mat-master.component.html',
  styleUrls: ['./ae-im-raw-mat-master.component.css']
})
export class AeImRawMatMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
}
