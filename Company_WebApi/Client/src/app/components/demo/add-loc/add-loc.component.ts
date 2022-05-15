import { Component, OnInit } from '@angular/core';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-add-loc',
  templateUrl: './add-loc.component.html',
  styleUrls: ['./add-loc.component.css']
})
export class AddLocComponent implements OnInit {
  locNum: string = "";
  locDesc: string = "";
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addLoc() {
    this.apiService.postData(APIConstants.LOC_MASTER, [{"locnum": this.locNum, "locdesc": this.locDesc}])
    .subscribe(()=> {
      console.log("success");
    })

  }
}
