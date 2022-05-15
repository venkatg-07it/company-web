import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AppConstants } from "./../../constants/app-constants";

@Injectable()
export class CustomDateParserFormatter {
  
  parse(value: string): any
  {
    
    if(!value) {
        return null;
    }
    
    if (value)
    {
        let parts=value.split('/');
        return {year:+parts[0],month:+parts[1],day:+parts[2]} as NgbDateStruct
    }
     

  }
  format(date: NgbDateStruct): any
  {
    
    return date? ('0'+date.day).slice(-2) + "-" + AppConstants.MONTHS[date.month - 1] + "-" + date.year : null;
  }
}