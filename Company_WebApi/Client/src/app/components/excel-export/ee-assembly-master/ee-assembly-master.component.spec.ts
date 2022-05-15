import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EeAssemblyMasterComponent } from './ee-assembly-master.component';

describe('EeAssemblyMasterComponent', () => {
  let component: EeAssemblyMasterComponent;
  let fixture: ComponentFixture<EeAssemblyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EeAssemblyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EeAssemblyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
