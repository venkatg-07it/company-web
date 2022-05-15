import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPoUploadComponent } from './dummy-po-upload.component';

describe('DummyPoUploadComponent', () => {
  let component: DummyPoUploadComponent;
  let fixture: ComponentFixture<DummyPoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyPoUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyPoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
