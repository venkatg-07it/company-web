import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-bi-master',
  templateUrl: './ee-bi-master.component.html',
  styleUrls: ['./ee-bi-master.component.css']
})
export class EeBiMasterComponent implements OnInit {

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
