import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-item-master',
  templateUrl: './ee-item-master.component.html',
  styleUrls: ['./ee-item-master.component.css']
})
export class EeItemMasterComponent {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";


}
