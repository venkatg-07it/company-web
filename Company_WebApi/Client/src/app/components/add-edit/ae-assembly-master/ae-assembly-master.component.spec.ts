import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeAssemblyMasterComponent } from './ae-assembly-master.component';

describe('AeAssemblyMasterComponent', () => {
  let component: AeAssemblyMasterComponent;
  let fixture: ComponentFixture<AeAssemblyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AeAssemblyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AeAssemblyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
