import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-price-master',
  templateUrl: './ae-price-master.component.html',
  styleUrls: ['./ae-price-master.component.css']
})
export class AePriceMasterComponent implements OnInit {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
