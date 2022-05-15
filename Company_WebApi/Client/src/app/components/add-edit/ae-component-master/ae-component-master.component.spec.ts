import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeComponentMasterComponent } from './ae-component-master.component';

describe('AeComponentMasterComponent', () => {
  let component: AeComponentMasterComponent;
  let fixture: ComponentFixture<AeComponentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeComponentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeComponentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
