import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaSection } from './formula-section';

describe('FormulaSection', () => {
  let component: FormulaSection;
  let fixture: ComponentFixture<FormulaSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulaSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
