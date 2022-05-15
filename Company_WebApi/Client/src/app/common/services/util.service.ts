import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { AppConstants } from '../constants/app-constants';
import * as moment from 'moment';
import { DatepickerServiceInputs } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-service';


@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  public getJSON(jsonUrl: string): Observable<any> {
    return this.http.get(jsonUrl);
  }

  convertStringToDate(val: string) {
    if (val && val.trim().length > 0) {
      let dateParts = val.split("-");
      if (dateParts.length == 3) {
        let day = parseInt(dateParts[0]);
        let month = parseInt(dateParts[0]) - 1;
        let year = parseInt(dateParts[0]);

        return this.getDateForPayLoad(new Date(day, month, year));
      }
    }
    let date = new Date();
    return this.getDateForPayLoad(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  }
  getAlphabetByNumber(num: number) {
    var ordA = 'A'.charCodeAt(0);
    var ordZ = 'Z'.charCodeAt(0);
    var len = ordZ - ordA + 1;

    var s = "";
    while (num >= 0) {
      s = String.fromCharCode(num % len + ordA) + s;
      num = Math.floor(num / len) - 1;
    }
    return s;
  }

  getBulkAsyncData(reqests: Observable<any>[]): Observable<any[]> {
    return forkJoin(reqests);
  }

  getFormattedDate(date: Date) {
    let year = date.getFullYear();
    let month = AppConstants.MONTHS[date.getMonth()];
    let day = ('0' + date.getDate()).slice(-2);
    return day + "-" + month + "-" + year;
  }


  getFormattedDateForCustom(year: any, month: any, day: any) {

    day = ('0' + day).slice(-2);
    return day + "-" + AppConstants.MONTHS[month - 1] + "-" + year;
  }

  getLoadDayFormatDefaultDate(date: Date) {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return this.getLoadDayFormat(year, month, day);
  }

  getLoadDayFormat(year: any, month: any, day: any) {
    year = year.toString().substring(2);
    let monthDay = ('0' + day).slice(-2) + ('0' + month).slice(-2);
    let loadDayFormat = "";
    if (parseInt(month) <= 3) {
      loadDayFormat = (parseInt(year) - 1) + "" + year + monthDay;
    }
    else {
      loadDayFormat = year + "" + (parseInt(year) + 1) + monthDay;
    }
    return loadDayFormat;
  }

  dateFormatter(params: any) {

    if (params && params.value) {
      return moment(params.value).format('DD-MMM-YYYY HH:mm:ss');
    }
    else {
      return null;
    }

  }

  convertUTCDateToLocalDate(params: any) {

    if (params && params.value) {
      let date = new Date(params.value);
      var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

      var offset = date.getTimezoneOffset() / 60;
      var hours = date.getHours();

      newDate.setHours(hours - offset + 1);

      return moment(newDate).format('DD-MMM-YYYY HH:mm:ss');
    }
    else {
      return null;
    }

  }

  getExcelDateTime(serial: any) {

    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  getDateToString(date: Date) {
    let dt: any = date.getDate();
    if (dt.toString().length == 1) {
      dt = '0' + dt;
    }
    let month: any = date.getMonth() + 1;
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    return `${year}-${month}-${dt}T${hour}:${min}:${sec}.000Z`;


  }


  getDateForPayLoad(value: any) {
    let date = new Date(value);
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());;
    date.setUTCHours(24, 0, 0, 0);
    return date;
  }

  getDateFilterParams() {
    return filterParams;
  }

  getLoadDayToDate(loadDay: string) {

    let year = "";
    let day = loadDay.substring(2);
    let month = loadDay.substring(2);

    if (parseInt(month) > 3) {
      year = "20" + loadDay.substring(0, 2);
    }
    else {
      year = "20" + loadDay.substring(2);
    }

    return new Date(parseInt(year), parseInt(month), parseInt(day));
  }

  getDaysBetween2Dates(from: Date, to: Date) {
    let diff = to.getTime() - from.getTime();
    return diff / (1000 * 3600 * 24);
  }

  formatQRDataFromText(qrData: string) {
    let result: any[] = [];
    let processList = [];
    
    let obj: any = {
      "CUST": "Customer",
      "LOADDAY": "Load Day",
      "ITEMCODE": "Item Code",
      "DESCRIPTION": "Item Desc",
      "NESTING": "Nesting No",   
      "PROCESSNUM": "Process No",     
      "QTY": "Quantity",
      "P1": "Process 1",
      "P2": "Process 2",
      "P3": "Process 3",
      "P4": "Process 4",
      "P5": "Process 5",
      "P6": "Process 6",
      "P7": "Process 7",
      "P8": "Process 8",
      "P9": "Process 9",
      "P10": "Process 10",
      "P11": "Process 11",
      "P12": "Process 12",
      "P13": "Process 13",
      "P14": "Process 14",
      "P15": "Process 15"
    }
    
    let qrDataList = qrData.toString().trim().split(",");

    for(let entry of qrDataList) {
      let item = entry.trim().split("|");
      let key = "";
      let value = "";
      if(item.length > 1) {
        key = item[0];
        value = item[1];
      }
      else if(item.length > 0){
        key = item[0];
      }
      let label = obj[key];
      if(label) {
        result.push({
          label: label,
          value: value
        });
  
        if(!(label.startsWith("Process No")) && (label.startsWith("Process ")) && value) {
          processList.push(value);
        }
      }
      
    }

    return {
      data: result,
      processList: processList
    };
  }

  formatQRDataFromTextForScan(qrData: string) {
    let result: any =  {};
    let processList = [];
    
    let obj: any = {
      "LOC_NUM": "locnum",
      "LOC_DESC": "locdesc",
      "GRN_DATE": "grndate",
      "PO_NUM":"poorMonumber",
      "VENDOR_NAME": "vendorname",
      "PART_NUM": "partnumber",
      "PART_DESC": "partdesc",      
      "RECV_QTY": "recvQty"   
    }
    
    let qrDataList = qrData.toString().trim().split(",");

    for(let entry of qrDataList) {
      let item = entry.trim().split("|");
      let key = "";
      let value = "";
      if(item.length > 1) {
        key = item[0];
        value = item[1];
      }
      else if(item.length > 0){
        key = item[0];
      }
      let label = obj[key];
      if(label) {
        result[label]= value;
        
      }
      
    }

    return result;
  }

}

const filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: Date) => {

    let sourceDate = new Date(
      filterLocalDateAtMidnight.getFullYear(),
      filterLocalDateAtMidnight.getMonth(),
      filterLocalDateAtMidnight.getDate(),
      1,
      1,
      1,
      0);

    let targetDate = new Date(
      cellValue.getFullYear(),
      cellValue.getMonth(),
      cellValue.getDate(),
      1,
      1,
      1,
      0
    );

    if (sourceDate.getTime() == targetDate.getTime()) {
      return 0;
    }
    if (targetDate.getTime() < sourceDate.getTime()) {
      return -1;
    }
    if (targetDate.getTime() > sourceDate.getTime()) {
      return 1;
    }
    return -1;
  },
};
