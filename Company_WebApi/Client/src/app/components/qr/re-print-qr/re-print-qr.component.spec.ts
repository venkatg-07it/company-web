import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RePrintQrComponent } from './re-print-qr.component';

describe('RePrintQrComponent', () => {
  let component: RePrintQrComponent;
  let fixture: ComponentFixture<RePrintQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RePrintQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RePrintQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
