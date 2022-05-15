import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCellRendererComponent } from './media-cell-renderer.component';

describe('MediaCellRendererComponent', () => {
  let component: MediaCellRendererComponent;
  let fixture: ComponentFixture<MediaCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
