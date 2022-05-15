import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  login: boolean = false;
  userName: string = "";
  menuGridData: any[] = [];
  accessPaths: string[] = [];

  constructor() { }

  setLogin(login:boolean) {
    this.login = login;
  }

  isLoggedIn() {
    return this.login;
  }

  getUserName() {
    return this.userName;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

  getMenuGridData() {
    return this.menuGridData;
  }

  setMenuGridData(menuGridData: any[]) {
    this.menuGridData = menuGridData;
  }

  getAccessPaths() {
    return this.accessPaths;
  }

  setAccessPaths(accessPaths: string[]) {
    this.accessPaths = accessPaths;
  }

}
