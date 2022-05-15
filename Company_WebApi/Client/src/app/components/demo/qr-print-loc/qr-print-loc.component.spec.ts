import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPrintLocComponent } from './qr-print-loc.component';

describe('QrPrintLocComponent', () => {
  let component: QrPrintLocComponent;
  let fixture: ComponentFixture<QrPrintLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrPrintLocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrPrintLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
