import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-po-master',
  templateUrl: './ee-po-master.component.html',
  styleUrls: ['./ee-po-master.component.css']
})
export class EePoMasterComponent implements OnInit {

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
