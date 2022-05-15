import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-im-raw-mat-master',
  templateUrl: './im-raw-mat-master.component.html',
  styleUrls: ['./im-raw-mat-master.component.css']
})
export class ImRawMatMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";

}
