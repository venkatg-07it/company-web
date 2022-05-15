import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-nesting-master',
  templateUrl: './ee-nesting-master.component.html',
  styleUrls: ['./ee-nesting-master.component.css']
})
export class EeNestingMasterComponent implements OnInit {

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
