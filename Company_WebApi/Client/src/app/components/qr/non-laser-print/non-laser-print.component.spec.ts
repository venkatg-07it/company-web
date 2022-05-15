import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonLaserPrintComponent } from './non-laser-print.component';

describe('NonLaserPrintComponent', () => {
  let component: NonLaserPrintComponent;
  let fixture: ComponentFixture<NonLaserPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonLaserPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonLaserPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
