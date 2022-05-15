import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeBiMasterComponent } from './ee-bi-master.component';

describe('EeBiMasterComponent', () => {
  let component: EeBiMasterComponent;
  let fixture: ComponentFixture<EeBiMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeBiMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeBiMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
