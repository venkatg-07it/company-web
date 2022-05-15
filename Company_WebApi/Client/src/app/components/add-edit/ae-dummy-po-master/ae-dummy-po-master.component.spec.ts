import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeDummyPoMasterComponent } from './ae-dummy-po-master.component';

describe('AeDummyPoMasterComponent', () => {
  let component: AeDummyPoMasterComponent;
  let fixture: ComponentFixture<AeDummyPoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeDummyPoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeDummyPoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
