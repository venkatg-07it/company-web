import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocComponent } from './add-loc.component';

describe('AddLocComponent', () => {
  let component: AddLocComponent;
  let fixture: ComponentFixture<AddLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
