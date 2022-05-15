import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeDummyPoComponent } from './ae-dummy-po.component';

describe('AeDummyPoComponent', () => {
  let component: AeDummyPoComponent;
  let fixture: ComponentFixture<AeDummyPoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeDummyPoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeDummyPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
