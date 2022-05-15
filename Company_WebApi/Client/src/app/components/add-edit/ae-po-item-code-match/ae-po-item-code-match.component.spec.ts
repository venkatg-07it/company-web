import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AePoItemCodeMatchComponent } from './ae-po-item-code-match.component';

describe('AePoItemCodeMatchComponent', () => {
  let component: AePoItemCodeMatchComponent;
  let fixture: ComponentFixture<AePoItemCodeMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AePoItemCodeMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AePoItemCodeMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
