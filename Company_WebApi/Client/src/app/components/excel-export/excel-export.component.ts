import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/common/constants/app-constants';

@Component({
  selector: 'app-excel-export',
  templateUrl: './excel-export.component.html',
  styleUrls: ['./excel-export.component.css']
})
export class ExcelExportComponent implements OnInit {

  jsonLocation: string = "";
  apiUrl: string = "";
  searchUrl: string = "";
  pageTitle: string = "";
  routePath: string="";
  routeConfig: any = AppConstants.INPUT_VALUES_EXCEL_EXPORT;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routePath = this.activatedRoute.snapshot.url[0].path
    let config = this.routeConfig[this.activatedRoute.snapshot.url[0].path];
    this.jsonLocation = config.jsonLocation;
    this.apiUrl = config.apiUrl;
    this.pageTitle = config.pageTitle;
  }

}
