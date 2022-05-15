import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintQrComponent } from './print-qr.component';

describe('PrintQrComponent', () => {
  let component: PrintQrComponent;
  let fixture: ComponentFixture<PrintQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
