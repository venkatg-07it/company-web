import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bi-master',
  templateUrl: './bi-master.component.html',
  styleUrls: ['./bi-master.component.css']
})
export class BiMasterComponent implements OnInit {

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
