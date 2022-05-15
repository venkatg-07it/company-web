import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeCtqMasterComponent } from './ee-ctq-master.component';

describe('EeCtqMasterComponent', () => {
  let component: EeCtqMasterComponent;
  let fixture: ComponentFixture<EeCtqMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeCtqMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeCtqMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
