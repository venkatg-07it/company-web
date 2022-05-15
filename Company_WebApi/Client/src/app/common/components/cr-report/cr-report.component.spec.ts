import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrReportComponent } from './cr-report.component';

describe('CrReportComponent', () => {
  let component: CrReportComponent;
  let fixture: ComponentFixture<CrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
