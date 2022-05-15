import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeCustomerMasterComponent } from './ee-customer-master.component';

describe('EeCustomerMasterComponent', () => {
  let component: EeCustomerMasterComponent;
  let fixture: ComponentFixture<EeCustomerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeCustomerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeCustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
