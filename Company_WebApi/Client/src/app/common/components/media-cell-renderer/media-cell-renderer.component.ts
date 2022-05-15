import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-cell-renderer',
  templateUrl: './media-cell-renderer.component.html',
  styleUrls: ['./media-cell-renderer.component.css']
})
export class MediaCellRendererComponent implements AgRendererComponent {
  value: string = "";
  private params: any = {};
  constructor() { }
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
    this.params = params;
  }

  selectFile(event: any): void {
    this.getBase64(event.target.files[0]).subscribe((value) => {
      this.value = value;
      this.params.value = value;
      this.params.data[this.params.colDef.field] = value;
    })
  }

  getBase64(file: any): Observable<string> {
    return Observable.create((observer: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const name = file.name;
      const lastDot = name.lastIndexOf('.');
      const ext = name.substring(lastDot + 1);
      this.params.data[this.params.colDef.field + "type"] = ext;
      reader.onload = () => observer.next(reader.result);
    });
    // return new Promise((resolve, reject) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => resolve(reader.result);
    //   reader.onerror = error => reject(error);
    // });
  }

  edit() {
    this.value = "";
  }
}
