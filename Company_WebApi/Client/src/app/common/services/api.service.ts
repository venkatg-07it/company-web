import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExcelUpload } from '../model/RequestBody';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postData(url: string, reqBody: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });
    return this.http.post(url, reqBody, { headers: headers });
  }

  putData(url: string, reqBody: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });
    return this.http.put(url, reqBody, { headers: headers });
  }

  getData(url: string): Observable<any> {
    return this.http.get(url);
  }

  deleteData(url: string): Observable<any> {
    return this.http.delete(url);
  }

  postFile(url: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', file, file.name);
    return this.http.post(url, formData);
  }
}
