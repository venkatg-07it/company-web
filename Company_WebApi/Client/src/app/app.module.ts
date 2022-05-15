import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './common/components/file-upload/file-upload.component';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './common/components/grid/grid.component';

import { AgGridModule } from 'ag-grid-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExcelUploadComponent } from './common/components/excel-upload/excel-upload.component';
import { ItemMasterComponent } from './components/upload/item-master/item-master.component';
import { ErrorMessageComponent } from './common/components/error-message/error-message.component';
import { HomeComponent } from './components/home/home.component';
import { UploadComponent } from './components/upload/upload.component';
import { AeItemMasterComponent } from './components/add-edit/ae-item-master/ae-item-master.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { TextBoxComponent } from './common/components/text-box/text-box.component';
import { DynamicFormComponent } from './common/components/dynamic-form/dynamic-form.component';
import { AeCustomerMasterComponent } from './components/add-edit/ae-customer-master/ae-customer-master.component';
import { CustomerMasterComponent } from './components/upload/customer-master/customer-master.component';
import { ComponentMasterComponent } from './components/upload/component-master/component-master.component';
import { AeComponentMasterComponent } from './components/add-edit/ae-component-master/ae-component-master.component';
import { ExcelExportComponent } from './components/excel-export/excel-export.component';
import { EeItemMasterComponent } from './components/excel-export/ee-item-master/ee-item-master.component';
import { EeCustomerMasterComponent } from './components/excel-export/ee-customer-master/ee-customer-master.component';
import { EeComponentMasterComponent } from './components/excel-export/ee-component-master/ee-component-master.component';
import { GridViewComponent } from './common/components/grid-view/grid-view.component';
import { AssemblyMasterComponent } from './components/upload/assembly-master/assembly-master.component';
import { EeAssemblyMasterComponent } from './components/excel-export/ee-assembly-master/ee-assembly-master.component';
import { AeAssemblyMasterComponent } from './components/add-edit/ae-assembly-master/ae-assembly-master.component';
import { ImRawMatMasterComponent } from './components/upload/im-raw-mat-master/im-raw-mat-master.component';
import { EeImRawMatMasterComponent } from './components/excel-export/ee-im-raw-mat-master/ee-im-raw-mat-master.component';
import { AeImRawMatMasterComponent } from './components/add-edit/ae-im-raw-mat-master/ae-im-raw-mat-master.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { ItemImageUploadComponent } from './components/item-image-upload/item-image-upload.component';
import { MediaCellRendererComponent } from './common/components/media-cell-renderer/media-cell-renderer.component';
import { ActionCellRendererComponent } from './common/components/action-cell-renderer/action-cell-renderer.component';
import { LoaderComponent } from './common/components/loader/loader.component';
import { PriceMasterComponent } from './components/upload/price-master/price-master.component';
import { PoMasterComponent } from './components/upload/po-master/po-master.component';
import { EePriceMasterComponent } from './components/excel-export/ee-price-master/ee-price-master.component';
import { EePoMasterComponent } from './components/excel-export/ee-po-master/ee-po-master.component';
import { AePriceMasterComponent } from './components/add-edit/ae-price-master/ae-price-master.component';
import { AePoMasterComponent } from './components/add-edit/ae-po-master/ae-po-master.component';
import { ConsolidatonReportComponent } from './components/consolidaton-report/consolidaton-report.component';
import { AgGridDateComponentComponent } from './common/components/ag-grid-date-component/ag-grid-date-component.component';
import { PoApprovalComponent } from './components/po-approval/po-approval.component';
import { CrReportComponent } from './common/components/cr-report/cr-report.component';
import { PoLoadDayComponent } from './components/po-load-day/po-load-day.component';
import { PoLoadedComponent } from './components/po-loaded/po-loaded.component';
import { AeTableMasterComponent } from './components/add-edit/ae-table-master/ae-table-master.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AePoItemCodeMatchComponent } from './components/add-edit/ae-po-item-code-match/ae-po-item-code-match.component';
import { EePoItemCodeMatchComponent } from './components/excel-export/ee-po-item-code-match/ee-po-item-code-match.component';
import { PoItemCodeMatchComponent } from './components/upload/po-item-code-match/po-item-code-match.component';
import { EeTableMasterComponent } from './components/excel-export/ee-table-master/ee-table-master.component';
import { NestingComponent } from './components/nesting/nesting.component';
import { DummyPoUploadComponent } from './components/dummy-po-upload/dummy-po-upload.component';
import { AeDummyPoComponent } from './components/ae-dummy-po/ae-dummy-po.component';
import { DummyPoMasterComponent } from './components/upload/dummy-po-master/dummy-po-master.component';
import { AeDummyPoMasterComponent } from './components/add-edit/ae-dummy-po-master/ae-dummy-po-master.component';
import { OpenPoMasterComponent } from './components/upload/open-po-master/open-po-master.component';
import { AeOpenPoMasterComponent } from './components/add-edit/ae-open-po-master/ae-open-po-master.component';
import { EeOpenPoMasterComponent } from './components/excel-export/ee-open-po-master/ee-open-po-master.component';
import { EeDummyPoMasterComponent } from './components/excel-export/ee-dummy-po-master/ee-dummy-po-master.component';
import { NestingUploadComponent } from './components/nesting-upload/nesting-upload.component';
import { BtnCellRenderer } from './common/components/cell-renderer/btn-cell-renderer';
import { EeNestingMasterComponent } from './components/excel-export/ee-nesting-master/ee-nesting-master.component';
import { QrGenerateComponent } from './components/qr-generate/qr-generate.component';
import { AnchorCellRenderer } from './common/components/cell-renderer/anchor-cell-renderer';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MissingListComponent } from './components/missing-list/missing-list.component';
import { DummyNestingComponent } from './components/dummy-nesting/dummy-nesting.component';
import { BiMasterComponent } from './components/upload/bi-master/bi-master.component';
import { AeBiMasterComponent } from './components/add-edit/ae-bi-master/ae-bi-master.component';
import { EeBiMasterComponent } from './components/excel-export/ee-bi-master/ee-bi-master.component';

import { PrintQrComponent } from './components/qr/print-qr/print-qr.component'; 
import { RePrintQrComponent } from './components/qr/re-print-qr/re-print-qr.component';
import { CtqMasterComponent } from './components/upload/ctq-master/ctq-master.component';
import { AeCtqMasterComponent } from './components/add-edit/ae-ctq-master/ae-ctq-master.component';
import { EeCtqMasterComponent } from './components/excel-export/ee-ctq-master/ee-ctq-master.component';
import { NonLaserPrintComponent } from './components/qr/non-laser-print/non-laser-print.component';
import { ItemQaEditComponent } from './components/qa/item-qa-edit/item-qa-edit.component';
import { CtqScanComponent } from './components/qa/ctq-scan/ctq-scan.component';
import { ProcessSignoffComponent } from './components/qa/process-signoff/process-signoff.component';
import { TrackingListComponent } from './components/qa/tracking-list/tracking-list.component';
import { ScanQrComponent } from './components/qr/scan-qr/scan-qr.component';
import { ScannedRecordsComponent } from './components/qr/scanned-records/scanned-records.component';
import { UserAccessComponent } from './components/admin/user-access/user-access.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { GrnMasterComponent } from './components/demo/grn-master/grn-master.component';
import { LocMasterComponent } from './components/demo/loc-master/loc-master.component';
import { AddLocComponent } from './components/demo/add-loc/add-loc.component';
import { AddGrnComponent } from './components/demo/add-grn/add-grn.component';
import { QrPrintGrnComponent } from './components/demo/qr-print-grn/qr-print-grn.component';
import { QrPrintLocComponent } from './components/demo/qr-print-loc/qr-print-loc.component';
import { LoadGrnComponent } from './components/demo/load-grn/load-grn.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderComponent,
    GridComponent,
    ExcelUploadComponent,
    ItemMasterComponent,
    ErrorMessageComponent,
    HomeComponent,
    UploadComponent,
    AeItemMasterComponent,
    AddEditComponent,
    TextBoxComponent,
    DynamicFormComponent,
    AeCustomerMasterComponent,
    CustomerMasterComponent,
    ComponentMasterComponent,
    AeComponentMasterComponent,
    ExcelExportComponent,
    EeItemMasterComponent,
    EeCustomerMasterComponent,
    EeComponentMasterComponent,
    GridViewComponent,
    AssemblyMasterComponent,
    EeAssemblyMasterComponent,
    AeAssemblyMasterComponent,
    ImRawMatMasterComponent,
    EeImRawMatMasterComponent,
    AeImRawMatMasterComponent,
    LoginComponent,
    AdminComponent,
    ItemImageUploadComponent,
    MediaCellRendererComponent,
    ActionCellRendererComponent,
    LoaderComponent,
    PriceMasterComponent,
    PoMasterComponent,
    EePriceMasterComponent,
    EePoMasterComponent,
    AePriceMasterComponent,
    AePoMasterComponent,    
    ConsolidatonReportComponent,
    AgGridDateComponentComponent,
    PoApprovalComponent,
    CrReportComponent,
    PoLoadDayComponent,
    PoLoadedComponent,
    AeTableMasterComponent,
    AePoItemCodeMatchComponent,
    EePoItemCodeMatchComponent,
    PoItemCodeMatchComponent,
    EeTableMasterComponent,
    NestingComponent,
    DummyPoUploadComponent,
    AeDummyPoComponent,
    DummyPoMasterComponent,
    AeDummyPoMasterComponent,
    OpenPoMasterComponent,
    AeOpenPoMasterComponent,
    EeOpenPoMasterComponent,
    EeDummyPoMasterComponent,
    NestingUploadComponent,
    BtnCellRenderer,
    AnchorCellRenderer,
    EeNestingMasterComponent,
    QrGenerateComponent,
    MissingListComponent,
    DummyNestingComponent,
    BiMasterComponent,
    AeBiMasterComponent,
    EeBiMasterComponent,
    RePrintQrComponent,
    PrintQrComponent,
    CtqMasterComponent,
    AeCtqMasterComponent,
    EeCtqMasterComponent,
    NonLaserPrintComponent,
    ItemQaEditComponent,
    CtqScanComponent,
    ProcessSignoffComponent,
    TrackingListComponent,
    ScanQrComponent,
    ScannedRecordsComponent,
    UserAccessComponent,
    ManageUsersComponent,
    GrnMasterComponent,
    LocMasterComponent,
    AddLocComponent,
    AddGrnComponent,
    QrPrintGrnComponent,
    QrPrintLocComponent,
    LoadGrnComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AgGridModule.withComponents([BtnCellRenderer, AnchorCellRenderer]),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    PdfViewerModule
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
