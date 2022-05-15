import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeNestingMasterComponent } from './ee-nesting-master.component';

describe('EeNestingMasterComponent', () => {
  let component: EeNestingMasterComponent;
  let fixture: ComponentFixture<EeNestingMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeNestingMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeNestingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
