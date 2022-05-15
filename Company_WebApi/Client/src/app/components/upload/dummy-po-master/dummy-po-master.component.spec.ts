import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPoMasterComponent } from './dummy-po-master.component';

describe('DummyPoMasterComponent', () => {
  let component: DummyPoMasterComponent;
  let fixture: ComponentFixture<DummyPoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyPoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyPoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
