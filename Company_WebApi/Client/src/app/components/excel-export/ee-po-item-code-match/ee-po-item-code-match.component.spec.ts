import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EePoItemCodeMatchComponent } from './ee-po-item-code-match.component';

describe('EePoItemCodeMatchComponent', () => {
  let component: EePoItemCodeMatchComponent;
  let fixture: ComponentFixture<EePoItemCodeMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EePoItemCodeMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EePoItemCodeMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
