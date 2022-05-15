import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-po-master',
  templateUrl: './po-master.component.html',
  styleUrls: ['./po-master.component.css']
})
export class PoMasterComponent implements OnInit {

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
