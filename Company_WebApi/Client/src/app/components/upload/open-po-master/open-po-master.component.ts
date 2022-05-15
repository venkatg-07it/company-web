import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-open-po-master',
  templateUrl: './open-po-master.component.html',
  styleUrls: ['./open-po-master.component.css']
})
export class OpenPoMasterComponent implements OnInit {

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
