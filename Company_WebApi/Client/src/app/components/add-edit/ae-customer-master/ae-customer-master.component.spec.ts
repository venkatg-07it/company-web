import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeCustomerMasterComponent } from './ae-customer-master.component';

describe('AeCustomerMasterComponent', () => {
  let component: AeCustomerMasterComponent;
  let fixture: ComponentFixture<AeCustomerMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeCustomerMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeCustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
