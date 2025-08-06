import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Technicalspecifications } from './technicalspecifications';

describe('Technicalspecifications', () => {
  let component: Technicalspecifications;
  let fixture: ComponentFixture<Technicalspecifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Technicalspecifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Technicalspecifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
