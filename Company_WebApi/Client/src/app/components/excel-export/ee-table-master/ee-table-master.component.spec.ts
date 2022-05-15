import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeTableMasterComponent } from './ee-table-master.component';

describe('EeTableMasterComponent', () => {
  let component: EeTableMasterComponent;
  let fixture: ComponentFixture<EeTableMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeTableMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeTableMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
