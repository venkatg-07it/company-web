import { Component, OnInit } from '@angular/core';
import { APIConstants } from 'src/app/common/constants/api-constants';

@Component({
  selector: 'app-grn-master',
  templateUrl: './grn-master.component.html',
  styleUrls: ['./grn-master.component.css']
})
export class GrnMasterComponent implements OnInit {
  
  jsonLocation: string = "grn-master/";  
  pageTitle:string = "GRN Master";  
  apiUrl: string = APIConstants.GRN_MASTER;

  constructor() { }

  ngOnInit(): void {
  }

}
