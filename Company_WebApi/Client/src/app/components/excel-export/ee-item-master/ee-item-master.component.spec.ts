import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeItemMasterComponent } from './ee-item-master.component';

describe('EeItemMasterComponent', () => {
  let component: EeItemMasterComponent;
  let fixture: ComponentFixture<EeItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeItemMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
