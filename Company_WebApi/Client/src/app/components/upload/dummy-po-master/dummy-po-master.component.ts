import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummy-po-master',
  templateUrl: './dummy-po-master.component.html',
  styleUrls: ['./dummy-po-master.component.css']
})
export class DummyPoMasterComponent implements OnInit {

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
