import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { AeCtqMasterComponent } from './components/add-edit/ae-ctq-master/ae-ctq-master.component';
import { AeDummyPoMasterComponent } from './components/add-edit/ae-dummy-po-master/ae-dummy-po-master.component';
import { AeOpenPoMasterComponent } from './components/add-edit/ae-open-po-master/ae-open-po-master.component';
import { AePoMasterComponent } from './components/add-edit/ae-po-master/ae-po-master.component';
import { AdminComponent } from './components/admin/admin.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { UserAccessComponent } from './components/admin/user-access/user-access.component';
import { ConsolidatonReportComponent } from './components/consolidaton-report/consolidaton-report.component';
import { AddGrnComponent } from './components/demo/add-grn/add-grn.component';
import { AddLocComponent } from './components/demo/add-loc/add-loc.component';
import { GrnMasterComponent } from './components/demo/grn-master/grn-master.component';
import { LoadGrnComponent } from './components/demo/load-grn/load-grn.component';
import { LocMasterComponent } from './components/demo/loc-master/loc-master.component';
import { QrPrintGrnComponent } from './components/demo/qr-print-grn/qr-print-grn.component';
import { QrPrintLocComponent } from './components/demo/qr-print-loc/qr-print-loc.component';
import { DummyNestingComponent } from './components/dummy-nesting/dummy-nesting.component';
import { EeCtqMasterComponent } from './components/excel-export/ee-ctq-master/ee-ctq-master.component';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { HomeComponent } from './components/home/home.component';
import { ItemImageUploadComponent } from './components/item-image-upload/item-image-upload.component';
import { LoginComponent } from './components/login/login.component';
import { MissingListComponent } from './components/missing-list/missing-list.component';
import { NestingComponent } from './components/nesting/nesting.component';
import { PoApprovalComponent } from './components/po-approval/po-approval.component';
import { PoLoadDayComponent } from './components/po-load-day/po-load-day.component';
import { PoLoadedComponent } from './components/po-loaded/po-loaded.component';
import { CtqScanComponent } from './components/qa/ctq-scan/ctq-scan.component';
import { ItemQaEditComponent } from './components/qa/item-qa-edit/item-qa-edit.component';
import { ProcessSignoffComponent } from './components/qa/process-signoff/process-signoff.component';
import { TrackingListComponent } from './components/qa/tracking-list/tracking-list.component';
import { QrGenerateComponent } from './components/qr-generate/qr-generate.component';
import { NonLaserPrintComponent } from './components/qr/non-laser-print/non-laser-print.component';
import { PrintQrComponent } from './components/qr/print-qr/print-qr.component';
import { RePrintQrComponent } from './components/qr/re-print-qr/re-print-qr.component'; 
import { ScanQrComponent } from './components/qr/scan-qr/scan-qr.component';
import { ScannedRecordsComponent } from './components/qr/scanned-records/scanned-records.component';
import { CtqMasterComponent } from './components/upload/ctq-master/ctq-master.component';
import { UploadComponent } from './components/upload/upload.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuard] },
  { path: 'item-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'customer-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'component-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'assembly-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'im-raw-materials-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'price-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'po-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'open-po-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'dummy-po-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'po-item-code-match-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'batch-or-individual-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'ctq-master-upload', component: UploadComponent, canActivate: [RouteGuard] },
  { path: 'item-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'customer-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'component-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'assembly-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'im-raw-materials-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'price-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'po-master', component: AePoMasterComponent, canActivate: [RouteGuard] },
  { path: 'open-po-master', component: AeOpenPoMasterComponent, canActivate: [RouteGuard] },
  { path: 'dummy-po-master', component: AeDummyPoMasterComponent, canActivate: [RouteGuard] },
  { path: 'table-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'po-item-code-match', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'batch-or-individual-master', component: AddEditComponent, canActivate: [RouteGuard] },
  { path: 'ctq-master', component: AeCtqMasterComponent, canActivate: [RouteGuard] },
  { path: 'item-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'customer-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'component-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'assembly-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'im-raw-materials-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'price-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'po-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'open-po-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'dummy-po-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'table-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'nesting-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'po-item-code-match-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'batch-or-individual-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'ctq-master-export', component:  ExcelExportComponent, canActivate: [RouteGuard] },
  { path: 'admin', component:  AdminComponent, canActivate: [RouteGuard] },
  { path: 'item-image-upload', component:  ItemImageUploadComponent, canActivate: [RouteGuard] },  

  { path: 'po-approval', component:  PoApprovalComponent, canActivate: [RouteGuard] },
  { path: 'po-load-day', component:  PoLoadDayComponent, canActivate: [RouteGuard] },
  { path: 'po-loaded', component:  PoLoadedComponent, canActivate: [RouteGuard] },

  { path: 'dummy-po-approval', component:  PoApprovalComponent, canActivate: [RouteGuard] },
  { path: 'dummy-po-load-day', component:  PoLoadDayComponent, canActivate: [RouteGuard] },
  { path: 'dummy-po-loaded', component:  PoLoadedComponent, canActivate: [RouteGuard] },

  { path: 'consolidation-report', component:  ConsolidatonReportComponent, canActivate: [RouteGuard] },
  { path: 'dummy-consolidation-report', component:  ConsolidatonReportComponent, canActivate: [RouteGuard] },
  { path: 'nesting', component:  NestingComponent, canActivate: [RouteGuard] },
  { path: 'dummy-nesting', component:  DummyNestingComponent, canActivate: [RouteGuard] },

  { path: 'qa-item-master', component:  ItemQaEditComponent, canActivate: [RouteGuard] },
  { path: 'qa-ctq-scan', component:  CtqScanComponent, canActivate: [RouteGuard] },
  { path: 'qa-process-signoff', component:  ProcessSignoffComponent, canActivate: [RouteGuard] },
  { path: 'mr-tracking-list', component:  TrackingListComponent, canActivate: [RouteGuard] },

  { path: 'missing-assembly', component:  MissingListComponent, canActivate: [RouteGuard] },
  { path: 'missing-component', component:  MissingListComponent, canActivate: [RouteGuard] },

  { path: 'qr-print', component: PrintQrComponent, canActivate: [RouteGuard] },
  { path: 'qr-re-print', component: RePrintQrComponent, canActivate: [RouteGuard] },
  { path: 'non-laser-print', component: NonLaserPrintComponent, canActivate: [RouteGuard] },
  { path: 'qr-scan', component: ScanQrComponent, canActivate: [RouteGuard] },
  { path: 'qr-scanned-records', component: ScannedRecordsComponent, canActivate: [RouteGuard] },

  { path: 'user-access', component: UserAccessComponent, canActivate: [RouteGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [RouteGuard] },



  { path: 'grn-master', component: GrnMasterComponent, canActivate: [RouteGuard] },
  { path: 'location-master', component: LocMasterComponent, canActivate: [RouteGuard] },
  { path: 'add-grn', component: AddGrnComponent, canActivate: [RouteGuard] },
  { path: 'add-loc', component: AddLocComponent, canActivate: [RouteGuard] },
  { path: 'qr-print-grn', component: QrPrintGrnComponent, canActivate: [RouteGuard] },
  { path: 'qr-print-loc', component: QrPrintLocComponent, canActivate: [RouteGuard] },
  { path: 'load-grn', component: LoadGrnComponent, canActivate: [RouteGuard] },

  { path: '', redirectTo:'/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
