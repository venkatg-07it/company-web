import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/common/constants/app-constants';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  jsonLocation: string = "";
  apiUrl: string = "";
  pageTitle: string = "";
  routePath: string="";
  routeConfig: any = AppConstants.INPUT_VALUES_UPLOAD;
  
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
