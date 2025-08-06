import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchwatches } from './searchwatches';

describe('Searchwatches', () => {
  let component: Searchwatches;
  let fixture: ComponentFixture<Searchwatches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchwatches]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchwatches);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
