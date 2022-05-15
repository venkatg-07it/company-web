import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EePriceMasterComponent } from './ee-price-master.component';

describe('EePriceMasterComponent', () => {
  let component: EePriceMasterComponent;
  let fixture: ComponentFixture<EePriceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EePriceMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EePriceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
