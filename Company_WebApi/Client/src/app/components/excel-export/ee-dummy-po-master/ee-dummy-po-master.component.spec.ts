import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeDummyPoMasterComponent } from './ee-dummy-po-master.component';

describe('EeDummyPoMasterComponent', () => {
  let component: EeDummyPoMasterComponent;
  let fixture: ComponentFixture<EeDummyPoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeDummyPoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeDummyPoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
