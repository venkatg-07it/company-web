import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-im-raw-mat-master',
  templateUrl: './ee-im-raw-mat-master.component.html',
  styleUrls: ['./ee-im-raw-mat-master.component.css']
})
export class EeImRawMatMasterComponent {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
}
