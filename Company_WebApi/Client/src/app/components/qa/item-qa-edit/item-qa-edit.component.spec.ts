import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQaEditComponent } from './item-qa-edit.component';

describe('ItemQaEditComponent', () => {
  let component: ItemQaEditComponent;
  let fixture: ComponentFixture<ItemQaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemQaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemQaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
