import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedRecordsComponent } from './scanned-records.component';

describe('ScannedRecordsComponent', () => {
  let component: ScannedRecordsComponent;
  let fixture: ComponentFixture<ScannedRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
