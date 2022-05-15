import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtqScanComponent } from './ctq-scan.component';

describe('CtqScanComponent', () => {
  let component: CtqScanComponent;
  let fixture: ComponentFixture<CtqScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtqScanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtqScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
