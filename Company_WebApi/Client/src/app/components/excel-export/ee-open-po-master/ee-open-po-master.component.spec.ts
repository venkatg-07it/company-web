import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeOpenPoMasterComponent } from './ee-open-po-master.component';

describe('EeOpenPoMasterComponent', () => {
  let component: EeOpenPoMasterComponent;
  let fixture: ComponentFixture<EeOpenPoMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeOpenPoMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeOpenPoMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
