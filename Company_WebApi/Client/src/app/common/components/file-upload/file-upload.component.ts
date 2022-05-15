import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as JSZip from 'jszip';
import { Observable } from 'rxjs';
import { IFileResponse } from 'src/app/common/model/IFileResponse';
import { AppConstants } from '../../constants/app-constants';
import { IFieldConfig } from '../../model/i-field-config';
import { ApiService } from '../../services/api.service';
import { ExcelService } from '../../services/excel.service';
import { UtilService } from '../../services/util.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  @Output()
  fileResponse = new EventEmitter<IFileResponse[]>();
  @Output()
  fileUploaded = new EventEmitter<boolean>();
  @Output()
  modify = new EventEmitter<boolean>();
  @Output()
  submit = new EventEmitter<boolean>();
  @Input()
  jsonLocation: string = "";
  @Input()
  pageTitle: string = "";
  @Input()
  isError:boolean = false;

  fieldDetails: any;
  fieldInfo: any;
  isModify: boolean = false;
  disableSubmit: boolean = true;
  
  constructor(private apiService: ApiService, 
    private utilService: UtilService,
    private excelService: ExcelService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.jsonLocation) {
      let requests: Observable<any>[] = [];
      let fieldInfoUrl = AppConstants.FILE_PATH_UPLOAD +
                          this.jsonLocation + 
                          AppConstants.FILE_NAME_FIELD_INFO;
      let fieldDetailsUrl = AppConstants.FILE_PATH_UPLOAD +
                          this.jsonLocation + 
                          AppConstants.FILE_NAME_FIELD_DETAILS;

      requests.push(this.apiService.getData(fieldInfoUrl));
      requests.push(this.apiService.getData(fieldDetailsUrl));
      this.utilService.getBulkAsyncData(requests).subscribe(responses => {
        let fieldInfo = responses[0];
        let fieldDetails = responses[1];

        if(fieldDetails["Repeated Columns"]) {
          let repeatedColumns = fieldDetails["Repeated Columns"];
          let fieldsSize = repeatedColumns.size;
          let fields = repeatedColumns.fields;
          let fieldsNames = fieldInfo.repeatedFields;
          
          for(let idx = 1; idx <= fieldsSize; idx++) {
            for(let fieldName of fieldsNames) {
              let field = fields[fieldName];
              let key = field.label + " " + idx;
              fieldDetails[key] = {
                "label": key,
                "name": field.name + idx,
                "width": 200,
                "type": "text",
                "required": true
              }
              fieldInfo.fields.push(key);
            }
          }
        }

        this.fieldInfo = fieldInfo;
        this.fieldDetails = fieldDetails;
      });
    }    
  }

  selectFile(event: any): void {
    this.fileUploaded.emit(true);
    this.modify.emit(this.isModify);
    this.fileResponse.emit([]);
    JSZip.loadAsync(event.target.files[0]).then(response => {
      this.loadExcelContent(response.files);
    });

  }

  downloadTemplate() {
    this.excelService.downloadExcelTemplate(this.pageTitle, this.fieldInfo.fields)
    .subscribe(isDownloaded => {
      if(isDownloaded) {
        console.log("File downloaded successfully");
      }
    })
  }

  onSubmit() {
    this.submit.emit(true);
    this.fileResponse.emit([]);
  }


  loadExcelContent(files: {[key: string]: JSZip.JSZipObject;}) {
      let sheetId = 1;
      let contents = [];

      contents.push(files["xl/sharedStrings.xml"].async("string"));
      
      while(true) {
        let sheetName = "xl/worksheets/sheet" + sheetId + ".xml";
        let sheet = files[sheetName];
        if(sheet) {
          contents.push(sheet.async("string"))
        }
        else {
          break;
        }
        sheetId++;
      }
      contents.push(files["xl/styles.xml"].async("string"))

      Promise.all(contents).then(values => {
        let response = this.extractExcelFiles(values);
        this.fileResponse.emit(response);
        this.fileUploaded.emit(false);
      });
  }

  extractExcelFiles(contents: string[]): IFileResponse[]{
    let parser = new DOMParser();
    let response: IFileResponse[] = [];
    let sharedStrings: string[] = this.getSharedStringsContent(contents[0], parser);
    let length = contents.length;

    for(let idx = 1; idx < length; idx++) {
      response.push(
        this.getSheetContent(
          contents[idx],
          parser,
          sharedStrings
        )
      );
    }
    return response;
  }
  
  getSharedStringsContent(content: string, parser: DOMParser): string[] {
    let xmlObject = parser.parseFromString(content, "text/xml");
    let childNodes = xmlObject.getElementsByTagName("si");
    let length = childNodes.length;
    let sharedStrings: string[] = [];  
    for(let idx = 0; idx < length; idx++) {
      let value = childNodes[idx].textContent;
      value = value ? value : "";
      sharedStrings.push(value);
    }
    return sharedStrings;
  }

  getSheetContent(content: string, 
                  parser: DOMParser,
                  sharedStrings: string[]): IFileResponse {
    let xmlObject = parser.parseFromString(content, "text/xml");
    let rowNodes = xmlObject.getElementsByTagName("row");
    let response: IFileResponse = {};
    if(rowNodes.length > 1) {
      response = this.getColumnMetaData(rowNodes[0], sharedStrings);
      response.sheetContent = this.getRowDatas(
        rowNodes,
        response.columnCount,
        sharedStrings,
        response.mapperFields
      );
      this.disableSubmit = false;
    }
    

    return response;
  }

  getColumnMetaData(headerRow: Element, sharedStrings: string[]): IFileResponse {
    
    let headerCols = headerRow.getElementsByTagName("c");
    let columnCount = headerCols.length;
    let colKeys = [];
    let colMapper: { [key: string]: string } = {};

    for(let colIdx = 0; colIdx < columnCount; colIdx++) {
      let colVal = headerCols[colIdx].textContent;
      
      if(colVal) {
        let colTitle = sharedStrings[parseInt(colVal)];
        colTitle = colTitle.trim();
        let fieldConfig: IFieldConfig = this.fieldDetails[colTitle];
        if(fieldConfig) {
          let colKey = fieldConfig.name;
          if(colTitle && colKey) {
            colKeys.push(colKey);
            colMapper[colKey] = colTitle;
          }
          else {
            console.log("Invalid Column Name", colTitle);
          }
        }
        else {
          console.log("title", colTitle);
        }
        
        
      }
      
    }
    return {
      columnCount: columnCount,
      mapperFields: colKeys,
      colMapper: colMapper
    }

  }

  getRowDatas(rowNodes: HTMLCollectionOf<Element>,
              columnCount: number = 0,
              sharedStrings: string[],
              colKeys: string[] = []
              ) {
    let rowLength = rowNodes.length;
    let sheetContent = [];

    for(let rowIdx = 1; rowIdx < rowLength; rowIdx++) {
      let colNodes = rowNodes[rowIdx].getElementsByTagName("c");
      let rowData = this.getRowData(
        colNodes,
        rowIdx,
        columnCount,
        sharedStrings,
        colKeys
      );
      let isValid = false;
      for(let key in rowData) {
        let value = rowData[key];
        value = value.trim();
        if(value) {
          isValid = true;
          break;
        }
      }
      if(isValid) {
        sheetContent.push(
          rowData
        );
      }
      
    }

    return sheetContent;
  }

  getRowData(colNodes: HTMLCollectionOf<Element>, 
              rowIdx: number, 
              columnCount: number,
              sharedStrings: string[],
              colKeys: string[]
              ) {
    let rIdx = rowIdx + 1;
    let colData: { [key: string]: string } = {};
    
    for(let colIdx = 0, columnIndex = 0; colIdx < columnCount; colIdx++){
      columnIndex = this.getColumnData(
        colNodes,
        colIdx,
        rIdx,
        columnIndex,
        sharedStrings,
        colKeys,
        colData
      );
    }

    return colData;
  }

  getColumnData(colNodes: HTMLCollectionOf<Element>, 
                colIdx: number, 
                rIdx: number, 
                columnIndex: number,
                sharedStrings: string[],
                colKeys: string[],
                colData: { [key: string]: string }) {
    let cIdx = this.getAlphabetByNumber(colIdx) + rIdx;
    let colNode = colNodes[columnIndex];
    let colValue = "";
    
    if(colNode && colNode.getAttribute("r") == cIdx) {
      let colContent = colNode.textContent;
      if(colContent) {
        
        if(colNode.hasAttribute("t")) {
          let value =  sharedStrings[parseInt(colContent)];
          colValue = value ? value : "";
        }
        // else if(colNode.hasAttribute("s") && colNode.getAttribute("s")=="21") {
        //   //console.log(colNode);
        //   //colValue = new Date((parseInt(colContent) - (25567 + 2)) * 86400 * 1000).toLocaleString();
          
        // }
        else {          
          
          colValue = colContent;
        }
        
      }
      else {
        colValue = "";
      }
      columnIndex++;
    }
    else if(!colNode) {
      colValue = "";
    }

    let colKey = colKeys[colIdx];
    if(colKey) {
      colData[colKey] = colValue;
    }
    else {
      console.log("Invalid col key", colKey);
    }

    return columnIndex;
  }

  getAlphabetByNumber(num: number) {
    var ordA = 'A'.charCodeAt(0);
    var ordZ = 'Z'.charCodeAt(0);
    var len = ordZ - ordA + 1;

    var s = "";
    while(num >= 0) {
      s = String.fromCharCode(num % len + ordA) + s;
      num = Math.floor(num / len) - 1;
    }
    return s;
  }

}
