import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeComponentMasterComponent } from './ee-component-master.component';

describe('EeComponentMasterComponent', () => {
  let component: EeComponentMasterComponent;
  let fixture: ComponentFixture<EeComponentMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeComponentMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeComponentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
