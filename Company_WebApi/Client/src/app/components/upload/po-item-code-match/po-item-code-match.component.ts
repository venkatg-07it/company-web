import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-po-item-code-match',
  templateUrl: './po-item-code-match.component.html',
  styleUrls: ['./po-item-code-match.component.css']
})
export class PoItemCodeMatchComponent implements OnInit {

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
