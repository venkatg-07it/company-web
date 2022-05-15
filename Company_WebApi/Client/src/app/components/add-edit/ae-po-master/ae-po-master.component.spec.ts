import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AePoMasterComponent } from './ae-po-master.component';

describe('AePoMasterComponent', () => {
  let component: AePoMasterComponent;
  let fixture: ComponentFixture<AePoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AePoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AePoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
