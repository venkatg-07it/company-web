import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-table-master',
  templateUrl: './ee-table-master.component.html',
  styleUrls: ['./ee-table-master.component.css']
})
export class EeTableMasterComponent implements OnInit {

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
