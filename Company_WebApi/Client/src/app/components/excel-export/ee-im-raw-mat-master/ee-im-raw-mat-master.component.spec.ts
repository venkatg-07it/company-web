import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeImRawMatMasterComponent } from './ee-im-raw-mat-master.component';

describe('EeImRawMatMasterComponent', () => {
  let component: EeImRawMatMasterComponent;
  let fixture: ComponentFixture<EeImRawMatMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeImRawMatMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeImRawMatMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
