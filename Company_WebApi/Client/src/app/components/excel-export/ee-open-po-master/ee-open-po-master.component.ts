import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-open-po-master',
  templateUrl: './ee-open-po-master.component.html',
  styleUrls: ['./ee-open-po-master.component.css']
})
export class EeOpenPoMasterComponent implements OnInit {

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
