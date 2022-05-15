import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeImRawMatMasterComponent } from './ae-im-raw-mat-master.component';

describe('AeImRawMatMasterComponent', () => {
  let component: AeImRawMatMasterComponent;
  let fixture: ComponentFixture<AeImRawMatMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeImRawMatMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeImRawMatMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
