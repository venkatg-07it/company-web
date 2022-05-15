import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoLoadedComponent } from './po-loaded.component';

describe('PoLoadedComponent', () => {
  let component: PoLoadedComponent;
  let fixture: ComponentFixture<PoLoadedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoLoadedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoLoadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
