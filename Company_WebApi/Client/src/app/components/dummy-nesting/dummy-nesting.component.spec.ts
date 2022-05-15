import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyNestingComponent } from './dummy-nesting.component';

describe('DummyNestingComponent', () => {
  let component: DummyNestingComponent;
  let fixture: ComponentFixture<DummyNestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyNestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyNestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
