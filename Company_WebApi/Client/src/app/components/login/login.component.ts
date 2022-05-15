import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';
import { SharedService } from 'src/app/common/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = "";
  password: string = "";

  constructor(private apiService: ApiService, 
    private sharedService: SharedService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    //this.sharedService.setLogin(true);
    debugger;
    if((this.userName == "admin" && this.password =="admin") ||
      (this.userName == "qa" && this.password =="qa")
    ){
      this.sharedService.setUserName(this.userName);
      this.sharedService.setLogin(true);
      this.router.navigate(['/home']);
    }
    //this.router.navigate(['/home']);
    // this.apiService.postData(APIConstants.LOGIN, { "username": this.userName, "password": this.password})
    // .subscribe(response => {
    //   this.sharedService.setLogin(true);
    //   this.router.navigate(['/home'])
    // }, err => {
    //   //this.sharedService.setLogin(false);
    //   this.sharedService.setLogin(true);
    //   this.router.navigate(['/home'])
    // });
  }

  clear() {
    this.userName = "";
    this.password = "";
  }
}
