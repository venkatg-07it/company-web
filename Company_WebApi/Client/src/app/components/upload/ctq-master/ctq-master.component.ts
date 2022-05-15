import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ctq-master',
  templateUrl: './ctq-master.component.html',
  styleUrls: ['./ctq-master.component.css']
})
export class CtqMasterComponent implements OnInit {

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
