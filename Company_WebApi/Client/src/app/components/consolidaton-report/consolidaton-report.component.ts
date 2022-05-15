import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepicker, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CustomDateAdapter } from 'src/app/common/components/date-util/customDateAdapter';
import { CustomDateParserFormatter } from 'src/app/common/components/date-util/customDateParserFormatter';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { AppConstants } from 'src/app/common/constants/app-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { ExcelService } from 'src/app/common/services/excel.service';
import { UtilService } from 'src/app/common/services/util.service';
@Component({
  selector: 'app-consolidaton-report',
  templateUrl: './consolidaton-report.component.html',
  styleUrls: ['./consolidaton-report.component.css']
  ,
  providers: [{provide: NgbDateAdapter, useClass: CustomDateAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class ConsolidatonReportComponent implements OnInit {

  model: string = "";
  @ViewChild('dp') dp: NgbDatepicker | undefined;
  pageTitle: string = "";
  reportDate: Date | undefined;
  data: any[] = [];
  showLoader: boolean = false;
  fieldInfo: any = {};
  fieldDetails: any = {};
  tabs: any[] = [];
  newVar: any | undefined;
  loadDay: string = "";
  loadDayDropDown: string = "";
  loadDayForAPI: string = "";
  loadDayDDList: string[] = [];
  isDummyPoMaster: boolean = false;
  constructor(private apiService: ApiService, private utilService: UtilService,
    private excelService: ExcelService, private router: Router) { }

  ngOnInit(): void {
    this.isDummyPoMaster = this.router.url.toLowerCase().endsWith("dummy-consolidation-report");
    this.showLoader = true;
    this.pageTitle = AppConstants.PAGE_TITLE_CONSOLIDATION_REPORT;

    let requests: Observable<any>[] = [];
    let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
                          AppConstants.FILE_PATH_CONSOLIDATION_REPORT + 
                          AppConstants.FILE_NAME_FIELD_INFO;
    let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
                          AppConstants.FILE_PATH_CONSOLIDATION_REPORT + 
                          AppConstants.FILE_NAME_FIELD_DETAILS;

    if(this.isDummyPoMaster) {
      this.pageTitle = AppConstants.PAGE_TITLE_DUMMY_CONSOLIDATION_REPORT;

    
      fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
                          AppConstants.FILE_PATH_DUMMY_CONSOLIDATION_REPORT + 
                          AppConstants.FILE_NAME_FIELD_INFO;
      fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
                          AppConstants.FILE_PATH_DUMMY_CONSOLIDATION_REPORT + 
                          AppConstants.FILE_NAME_FIELD_DETAILS;
    }

    let date = new Date();
    this.model = this.utilService.getFormattedDate(date);
    this.loadDay = this.utilService.getLoadDayFormatDefaultDate(date);

    //this.loadDay = this.loadDay.trim();
    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;
    if(this.isDummyPoMaster) {
      dropdownUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoaddayGroupList/D" + this.loadDay;
    }

    requests.push(this.apiService.getData(fieldInfoUrl));
    requests.push(this.apiService.getData(fieldDetailsUrl));
    requests.push(this.apiService.getData(dropdownUrl));

      
    this.utilService.getBulkAsyncData(requests).subscribe(responses => {
        this.fieldInfo = responses[0];
        this.fieldDetails = responses[1];
        this.loadDayDDList = responses[2];
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
      }
    );  
    
    
    
  }
  

  generateReport() {
    console.log("tabs info", this.tabs);
    this.showLoader = true;    
    this.loadDayForAPI = this.loadDay + this.loadDayDropDown;
    this.loadDayForAPI = this.loadDayForAPI.trim();
    this.tabs = [];
    
    if(this.loadDayForAPI) {      
      //const dateParts = this.model.split("-");
      let url = APIConstants.CONSOLIDATION + "/ConsolidateReport/" + this.loadDayForAPI;
      if(this.isDummyPoMaster) {
        url = APIConstants.DUMMY_CONSOLIDATION + "/DummyConsolidateReport/D" + this.loadDayForAPI;
      }

     

      let requests: Observable<any>[] = [];
      requests.push(this.apiService.getData(url));
      

      this.utilService.getBulkAsyncData(requests).subscribe(responses => {
        this.data = responses[0];
      
        let data = responses[0].filter((itm: any) => itm.key !== "ctq-checklist");

        let chkList = responses[0].find((itm: any) => itm.key == "ctq-checklist");

        if(chkList && chkList.value && chkList.value.length == 0) {
          this.data = data;

          for(let item of this.data) {
         
            this.tabs.push({
              "name": item.key,
              "data": item.value.map((item: any, index: number) => {
                item["sNo"] = index + 1;
                return item;
              }),
              "fieldInfo": this.fieldInfo[item.key],
              "fieldDetails": this.fieldDetails[item.key].fields,
              "index": this.tabs.length,
              "title": this.loadDayForAPI + " - " + this.fieldDetails[item.key].title
            });
          }
        }
        else {
          this.data = [chkList];
          this.tabs.push({
            "name": chkList.key,
            "data": chkList.value.map((item: any, index: number) => {
              item["sNo"] = index + 1;
              return item;
            }),
            "fieldInfo": this.fieldInfo[chkList.key],
            "fieldDetails": this.fieldDetails[chkList.key].fields,
            "index": this.tabs.length,
            "title": this.loadDayForAPI + " - " + this.fieldDetails[chkList.key].title
          });
        }

        
        this.showLoader = false;
        

        console.log("tabs info", this.tabs);

      }, err => {
        this.showLoader = false;
      });
      // this.apiService.getData(url)
      // .subscribe(response => {        
      //   this.data = response;
        
        
      // }, err => {
      //   this.showLoader = false;
      // });
      

      // this.reportDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
      // console.log(this.reportDate);
    }
    
  }

  exportAll() {
    this.showLoader = true;
    let that = this;
    let loadDayAPI = this.loadDayForAPI;
    if(this.isDummyPoMaster) {
      loadDayAPI = 'D' + loadDayAPI;
    }
    setTimeout(function() {      
      that.excelService.exportMultiSheet(loadDayAPI, that.data, that.fieldInfo, that.fieldDetails).subscribe((isDownloaded: boolean) => {
          if(isDownloaded) {              
            that.showLoader = false;
          }
      });
  }, 100);

    
  }

  ngAfterViewInit() {
    console.log("date picker", this.dp);
  }

  onDateSelect(event: any) {
    this.showLoader = true;
    this.loadDay = this.utilService.getLoadDayFormat(event.year, event.month, event.day);
    this.model = this.utilService.getFormattedDateForCustom(event.year, event.month, event.day);
    this.loadDay = this.loadDay.trim();
    let dropdownUrl = APIConstants.CONSOLIDATION + "/LoaddayGroupList/" + this.loadDay;
    if(this.isDummyPoMaster) {
      dropdownUrl = APIConstants.DUMMY_CONSOLIDATION + "/DummyLoaddayGroupList/D" + this.loadDay;
    }

    this.apiService.getData(dropdownUrl).subscribe(response => {
      this.loadDayDDList = response;
      this.showLoader = false;
    },
    err => {
      this.loadDayDDList = [];
      this.showLoader = false;
    });
  } 

  onLoad(value: boolean) {
   this.showLoader = value;
  }
}
