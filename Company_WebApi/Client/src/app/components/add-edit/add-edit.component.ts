import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/common/constants/app-constants';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  jsonLocation: string = "";
  apiUrl: string = "";
  searchUrl: string = "";
  pageTitle: string = "";
  routePath: string="";
  routeConfig: any = AppConstants.INPUT_VALUES_ADD_OR_EDIT;
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routePath = this.activatedRoute.snapshot.url[0].path
    let config = this.routeConfig[this.activatedRoute.snapshot.url[0].path];
    console.log("route config", this.routeConfig);
    this.jsonLocation = config.jsonLocation;
    this.apiUrl = config.apiUrl;
    this.pageTitle = config.pageTitle;
  }

}
