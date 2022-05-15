import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeBiMasterComponent } from './ae-bi-master.component';

describe('AeBiMasterComponent', () => {
  let component: AeBiMasterComponent;
  let fixture: ComponentFixture<AeBiMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeBiMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeBiMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
