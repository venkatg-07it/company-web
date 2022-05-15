import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageUploadComponent } from './item-image-upload.component';

describe('ItemImageUploadComponent', () => {
  let component: ItemImageUploadComponent;
  let fixture: ComponentFixture<ItemImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemImageUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
