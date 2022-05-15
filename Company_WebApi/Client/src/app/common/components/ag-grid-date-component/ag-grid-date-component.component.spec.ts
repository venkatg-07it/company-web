import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridDateComponentComponent } from './ag-grid-date-component.component';

describe('AgGridDateComponentComponent', () => {
  let component: AgGridDateComponentComponent;
  let fixture: ComponentFixture<AgGridDateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridDateComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridDateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
