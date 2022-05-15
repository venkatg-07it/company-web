import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AePriceMasterComponent } from './ae-price-master.component';

describe('AePriceMasterComponent', () => {
  let component: AePriceMasterComponent;
  let fixture: ComponentFixture<AePriceMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AePriceMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AePriceMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
