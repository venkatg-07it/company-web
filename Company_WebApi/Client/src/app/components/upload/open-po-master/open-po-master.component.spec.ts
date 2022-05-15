import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPoMasterComponent } from './open-po-master.component';

describe('OpenPoMasterComponent', () => {
  let component: OpenPoMasterComponent;
  let fixture: ComponentFixture<OpenPoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenPoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
