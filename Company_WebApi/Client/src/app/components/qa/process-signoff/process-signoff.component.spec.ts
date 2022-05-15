import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSignoffComponent } from './process-signoff.component';

describe('ProcessSignoffComponent', () => {
  let component: ProcessSignoffComponent;
  let fixture: ComponentFixture<ProcessSignoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessSignoffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSignoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
