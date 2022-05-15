import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-customer-master',
  templateUrl: './ee-customer-master.component.html',
  styleUrls: ['./ee-customer-master.component.css']
})
export class EeCustomerMasterComponent {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";


}
