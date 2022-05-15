import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocMasterComponent } from './loc-master.component';

describe('LocMasterComponent', () => {
  let component: LocMasterComponent;
  let fixture: ComponentFixture<LocMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
