import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ee-po-item-code-match',
  templateUrl: './ee-po-item-code-match.component.html',
  styleUrls: ['./ee-po-item-code-match.component.css']
})
export class EePoItemCodeMatchComponent implements OnInit {

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
