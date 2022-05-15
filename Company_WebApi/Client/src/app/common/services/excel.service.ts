import { Injectable } from '@angular/core';
import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { Observable } from 'rxjs';
import { IFieldConfig } from '../model/i-field-config';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService { 

  excelColor: any = {
    "red":"FF0000",
    "green":"008000",
    "pink":"FFC0CB",
    "blue":"0000FF",
    "yellow":"FFFF00",
    "brown":"A52A2A"    
  }

  constructor(private utilService: UtilService) { }

  downloadExcelTemplate(fileName: string, headers: string[]): Observable<boolean> {
    return Observable.create((observer: any) => {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Sheet1');

      this.bindHeaders(headers, worksheet, 1);
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fileName + '.xlsx');
        observer.next(true);
      },
      err => {
        observer.next(false);
      });
    });
  
  }

  downloadExcelReport(title: string, fileName: string, data: any[], headers: string[], fieldDetails: any): Observable<boolean> {
    return Observable.create((observer: any) => {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Sheet1');
      this.bindTitle(title,headers.length, worksheet, 1);
      this.bindHeaders(headers, worksheet, 2);
      this.bindData(data, headers, fieldDetails, worksheet, 3);


      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fileName + '.xlsx');
        observer.next(true);
      },
      err => {
        observer.next(false);
      })
    })
  }

  downloadExcel(fileName: string, data: any[], headers: string[], fieldDetails: any): Observable<boolean> {
    return Observable.create((observer: any) => {
      let workbook = new Workbook();
      let worksheet = workbook.addWorksheet('Sheet1');

      this.bindHeaders(headers, worksheet, 1);
      this.bindData(data, headers, fieldDetails, worksheet, 2);


      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fileName + '.xlsx');
        observer.next(true);
      },
      err => {
        observer.next(false);
      })
    })
    
  } 

  exportMultiSheet(fileName: string, data: any[], allFieldInfo: any, allFieldDetails: any): Observable<boolean> {
    return Observable.create((observer: any) => {
      let workbook = new Workbook();
      for(let item of data) {        
        let sheetName = item.key;
        let worksheet = workbook.addWorksheet(sheetName);
        let headers = allFieldInfo[sheetName].fields;
        let fieldDetails = allFieldDetails[sheetName].fields;
        let title = fileName + ' - ' + allFieldDetails[sheetName].title;
        this.bindTitle(title, headers.length, worksheet, 1);
        this.bindHeaders(headers, worksheet, 2);
        this.bindData(item.value, headers, fieldDetails, worksheet, 3);   
      }
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fileName + '.xlsx');
        observer.next(true);
      },
      err => {
        observer.next(false);
      })
    });
  }
  bindTitle(title: string, size: number, worksheet: Worksheet, row: number) {
    let cellIndex = this.utilService.getAlphabetByNumber(size - 1);
    let titleRow = worksheet.getCell('A1');
    titleRow.value = title;
    titleRow.alignment = { 
      vertical: 'middle', 
      horizontal: 'center',
      wrapText: true
    }
    titleRow.font = {
      bold: true,      
      size: 24,
    }

    worksheet.mergeCells('A1:'+ cellIndex +'1');
  }

  bindHeaders(headers: string[], worksheet: Worksheet, row: number) {
    let idx = 0;
    for(let header of headers) {
      let cellIndex = this.utilService.getAlphabetByNumber(idx);
      let headerRow = worksheet.getCell(cellIndex + row);
      headerRow.value = header;
      headerRow.alignment = { 
        vertical: 'middle', 
        horizontal: 'center',
        wrapText: true
      }
      
      headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4167B8' },
        bgColor: { argb: '' }
      }
      headerRow.font = {
        bold: true,
        color: { argb: 'FFFFFF' },
        size: 12,
      }

      worksheet.getColumn((idx + 1)).width = 20;
      idx++;
    }
  }

  bindData(data: any[], headers: string[], fieldDetails: any, worksheet: Worksheet, row: number) {
    let idx = row;
    
    for(let item of data) {
      let cidx = 0;
      for(let header of headers) {
        let fieldObject: IFieldConfig = fieldDetails[header];
        
        let value = item[fieldObject.name];
        if(value instanceof Date) {
          value = this.utilService.dateFormatter({"value": value});
        }
        let colorCode = "";
        if (fieldObject.name.startsWith("process")) {
          if(value && value.toString().trim().length > 0) {
            let name = "color" + fieldObject.name;
            name = name.replace("process", "");
            if(item[name]) {
              let colorName = item[name].toLowerCase();
              colorCode = this.excelColor[colorName];
            }
            
          }
        }

        let cellIndex = this.utilService.getAlphabetByNumber(cidx);
        let headerRow = worksheet.getCell(cellIndex + idx);
        headerRow.value = value;
        headerRow.alignment = { 
          vertical: 'middle',         
          wrapText: true
        }
    
        headerRow.font = {
          size: 12,
        }

        if(colorCode) {
          headerRow.font.color = {
            argb: 'FFFFFF'
          }

          headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: colorCode },
            bgColor: { argb: colorCode }
          }
        }
        cidx++;
      }
      idx++;
    }
  }
}
