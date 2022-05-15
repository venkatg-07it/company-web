import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestingUploadComponent } from './nesting-upload.component';

describe('NestingUploadComponent', () => {
  let component: NestingUploadComponent;
  let fixture: ComponentFixture<NestingUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NestingUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NestingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
