import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeTableMasterComponent } from './ae-table-master.component';

describe('AeTableMasterComponent', () => {
  let component: AeTableMasterComponent;
  let fixture: ComponentFixture<AeTableMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeTableMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeTableMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
