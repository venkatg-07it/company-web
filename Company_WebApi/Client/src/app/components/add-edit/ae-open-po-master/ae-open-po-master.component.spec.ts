import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeOpenPoMasterComponent } from './ae-open-po-master.component';

describe('AeOpenPoMasterComponent', () => {
  let component: AeOpenPoMasterComponent;
  let fixture: ComponentFixture<AeOpenPoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeOpenPoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeOpenPoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
