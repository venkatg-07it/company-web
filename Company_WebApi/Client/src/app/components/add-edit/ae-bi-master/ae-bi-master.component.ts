import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-bi-master',
  templateUrl: './ae-bi-master.component.html',
  styleUrls: ['./ae-bi-master.component.css']
})
export class AeBiMasterComponent implements OnInit {

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
