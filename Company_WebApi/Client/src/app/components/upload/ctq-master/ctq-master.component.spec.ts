import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtqMasterComponent } from './ctq-master.component';

describe('CtqMasterComponent', () => {
  let component: CtqMasterComponent;
  let fixture: ComponentFixture<CtqMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtqMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtqMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
