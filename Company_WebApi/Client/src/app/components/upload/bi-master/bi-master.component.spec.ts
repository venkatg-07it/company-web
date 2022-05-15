import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiMasterComponent } from './bi-master.component';

describe('BiMasterComponent', () => {
  let component: BiMasterComponent;
  let fixture: ComponentFixture<BiMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
