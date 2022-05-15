import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyMasterComponent } from './assembly-master.component';

describe('AssemblyMasterComponent', () => {
  let component: AssemblyMasterComponent;
  let fixture: ComponentFixture<AssemblyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssemblyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
