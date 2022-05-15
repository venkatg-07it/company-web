import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-customer-master',
  templateUrl: './ae-customer-master.component.html',
  styleUrls: ['./ae-customer-master.component.css']
})
export class AeCustomerMasterComponent  {
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
  
}
