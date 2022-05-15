import { Component, OnInit } from '@angular/core';
import { APIConstants } from 'src/app/common/constants/api-constants';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showLoader: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  deleteAll(value: string) {
    this.showLoader = true;
    let url = "";
    switch (value) {
      case "CustomerMaster":
        url = APIConstants.CUSTOMER_MASTER_UPLOAD;
        break;
      case "ItemMaster":
        url = APIConstants.ITEM_MASTER_UPLOAD;
        break;
      case "ComponentMaster":
        url = APIConstants.COMPONENT_MASTER_UPLOAD;
        break;
      case "AssemblyMaster":
        url = APIConstants.ASSEMBLY_MASTER_UPLOAD;
        break;
      case "RM":
        url = APIConstants.IM_RAW_MAT_MASTER_UPLOAD;
        break;
      case "PriceMaster":
        url = APIConstants.PRICE_MASTER_UPLOAD;
        break;
      case "POMaster":
        url = APIConstants.PO_MASTER_UPLOAD;
        break;
      case "TableMaster":
        url = APIConstants.TABLE_MASTER_UPLOAD;
        break;
      case "POItemCodeMatch":
        url = APIConstants.PO_ITEM_CODE_MATCH;
        break;
      case "BIMaster":
        url = APIConstants.BI_MASTER;
        break;
      case "CTQMaster":
        url = APIConstants.CTQ_MASTER;
        break;

    }

    this.apiService.deleteData(url).subscribe(() => {
      this.showLoader = false;     

    }, err => {
      this.showLoader = false;
    });
  }

}
