import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidatonReportComponent } from './consolidaton-report.component';

describe('ConsolidatonReportComponent', () => {
  let component: ConsolidatonReportComponent;
  let fixture: ComponentFixture<ConsolidatonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidatonReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolidatonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
