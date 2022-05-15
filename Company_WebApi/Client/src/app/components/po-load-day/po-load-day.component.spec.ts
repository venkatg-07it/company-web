import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoLoadDayComponent } from './po-load-day.component';

describe('PoLoadDayComponent', () => {
  let component: PoLoadDayComponent;
  let fixture: ComponentFixture<PoLoadDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoLoadDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoLoadDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
