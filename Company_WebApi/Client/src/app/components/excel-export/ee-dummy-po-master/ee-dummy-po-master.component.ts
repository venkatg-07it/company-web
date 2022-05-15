import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-dummy-po-master',
  templateUrl: './ee-dummy-po-master.component.html',
  styleUrls: ['./ee-dummy-po-master.component.css']
})
export class EeDummyPoMasterComponent implements OnInit {

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
