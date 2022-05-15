import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGrnComponent } from './load-grn.component';

describe('LoadGrnComponent', () => {
  let component: LoadGrnComponent;
  let fixture: ComponentFixture<LoadGrnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadGrnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
