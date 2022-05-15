import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoItemCodeMatchComponent } from './po-item-code-match.component';

describe('PoItemCodeMatchComponent', () => {
  let component: PoItemCodeMatchComponent;
  let fixture: ComponentFixture<PoItemCodeMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoItemCodeMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoItemCodeMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
