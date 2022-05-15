import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeItemMasterComponent } from './ae-item-master.component';

describe('AeItemMasterComponent', () => {
  let component: AeItemMasterComponent;
  let fixture: ComponentFixture<AeItemMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeItemMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeItemMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
