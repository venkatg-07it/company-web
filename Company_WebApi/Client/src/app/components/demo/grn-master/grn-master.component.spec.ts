import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnMasterComponent } from './grn-master.component';

describe('GrnMasterComponent', () => {
  let component: GrnMasterComponent;
  let fixture: ComponentFixture<GrnMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
