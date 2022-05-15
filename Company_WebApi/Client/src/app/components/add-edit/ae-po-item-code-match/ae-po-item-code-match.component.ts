import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ae-po-item-code-match',
  templateUrl: './ae-po-item-code-match.component.html',
  styleUrls: ['./ae-po-item-code-match.component.css']
})
export class AePoItemCodeMatchComponent implements OnInit {
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
