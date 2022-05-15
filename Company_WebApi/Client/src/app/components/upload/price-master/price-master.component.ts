import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-master',
  templateUrl: './price-master.component.html',
  styleUrls: ['./price-master.component.css']
})
export class PriceMasterComponent implements OnInit {

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
