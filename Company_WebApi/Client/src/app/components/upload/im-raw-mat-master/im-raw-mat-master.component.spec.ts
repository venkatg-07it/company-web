import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImRawMatMasterComponent } from './im-raw-mat-master.component';

describe('ImRawMatMasterComponent', () => {
  let component: ImRawMatMasterComponent;
  let fixture: ComponentFixture<ImRawMatMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImRawMatMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImRawMatMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
