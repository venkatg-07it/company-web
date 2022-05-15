import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPrintGrnComponent } from './qr-print-grn.component';

describe('QrPrintGrnComponent', () => {
  let component: QrPrintGrnComponent;
  let fixture: ComponentFixture<QrPrintGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrPrintGrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPrintGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
