import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-table-master',
  templateUrl: './ae-table-master.component.html',
  styleUrls: ['./ae-table-master.component.css']
})
export class AeTableMasterComponent implements OnInit {

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
