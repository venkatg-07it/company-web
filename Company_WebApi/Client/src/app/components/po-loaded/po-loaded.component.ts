import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';

@Component({
  selector: 'app-po-loaded',
  templateUrl: './po-loaded.component.html',
  styleUrls: ['./po-loaded.component.css']
})
export class PoLoadedComponent implements OnInit {

  jsonLocation: string = "";
  apiUrl: string = "";
  pageTitle: string = "";
  routeConfig: any = AppConstants.INPUT_VALUES_EXCEL_EXPORT;
  isDummyPoMaster: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isDummyPoMaster = this.router.url.toLowerCase().endsWith("dummy-po-loaded");
    let config = this.routeConfig[AppConstants.ROUTE_PATH_PO_MASTER_EXPORT];
    this.jsonLocation = config.jsonLocation;

    this.apiUrl = APIConstants.CONSOLIDATION + "/LoadDayList";
    this.pageTitle = "PO LOADED";
    if (this.isDummyPoMaster) {
      this.apiUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoadDayList";
      this.pageTitle = "DUMMY PO LOADED";
      config = this.routeConfig[AppConstants.ROUTE_PATH_DUMMY_PO_MASTER_EXPORT];
      this.jsonLocation = config.jsonLocation;
    }

  }

}
