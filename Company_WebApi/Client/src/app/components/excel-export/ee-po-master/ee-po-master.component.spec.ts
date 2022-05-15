import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EePoMasterComponent } from './ee-po-master.component';

describe('EePoMasterComponent', () => {
  let component: EePoMasterComponent;
  let fixture: ComponentFixture<EePoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EePoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EePoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
