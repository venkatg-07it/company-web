import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-price-master',
  templateUrl: './ee-price-master.component.html',
  styleUrls: ['./ee-price-master.component.css']
})
export class EePriceMasterComponent implements OnInit {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
