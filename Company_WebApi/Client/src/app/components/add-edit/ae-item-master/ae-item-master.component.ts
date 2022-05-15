import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ae-item-master',
  templateUrl: './ae-item-master.component.html',
  styleUrls: ['./ae-item-master.component.css']
})
export class AeItemMasterComponent {

  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle:string = "";
  @Input()
  apiUrl: string = "";
  @Input()
  searchUrl: string = "";

}
