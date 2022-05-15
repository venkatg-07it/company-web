import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { SharedService } from 'src/app/common/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headers: any[] = [];
  constructor(private sharedService: SharedService, private apiService: ApiService) {

  }

  get isLoggedIn() {
    return this.sharedService.isLoggedIn();
  }

  ngOnInit(): void {
    let headerUrl = AppConstants.FILE_PATH_UPLOAD +
      "header/header.json";
    this.apiService.getData(headerUrl).subscribe(response => {
      this.constructHeader(response);
    });
  }

  constructHeader(response: any[]) {
    let header: any[] = [];
    let allHeader: any[] = [];
    let accessPath = response.map(itm => itm.link);
    for (let item of response) {
      let name = item.name;
      let groups = name.split("|");
      if (groups && groups.length > 0) {
        let len = groups.length;
        let itm: any = {};
        let menuData = header;
        for (let idx = 0; idx < len; idx++) {
          let headerData: any = menuData.find(itm => itm.name == groups[idx]);          
          if (!headerData) {
            headerData = {
              name: groups[idx],
              data: []
            };            
            menuData.push(headerData);
          }
          if(idx == len -1) {
            headerData["link"] = item.link;
          }
          menuData = headerData.data;
        }
        
      }

      let allHeaderItem: any = {
        ...item
      };
      let groupData = allHeaderItem["name"].split("|");
      allHeaderItem["breadcrumb"] = groupData.join("->");
      allHeaderItem["name1"] = groupData[groupData.length - 1];
      allHeaderItem["group"] = groupData[0];
      allHeader.push(allHeaderItem);
    }
    console.log("header", header);
    this.headers = header;
    this.sharedService.setMenuGridData(allHeader);
    this.sharedService.setAccessPaths(accessPath);
    console.log("access path data", allHeader);
  }



}
