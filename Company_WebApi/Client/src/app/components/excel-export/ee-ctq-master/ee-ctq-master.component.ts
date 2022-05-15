import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-ctq-master',
  templateUrl: './ee-ctq-master.component.html',
  styleUrls: ['./ee-ctq-master.component.css']
})
export class EeCtqMasterComponent implements OnInit {

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
