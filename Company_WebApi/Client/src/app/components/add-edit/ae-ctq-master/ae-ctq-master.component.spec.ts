import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeCtqMasterComponent } from './ae-ctq-master.component';

describe('AeCtqMasterComponent', () => {
  let component: AeCtqMasterComponent;
  let fixture: ComponentFixture<AeCtqMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeCtqMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeCtqMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
