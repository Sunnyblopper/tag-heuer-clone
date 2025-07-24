import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPoint } from './sales-point';

describe('SalesPoint', () => {
  let component: SalesPoint;
  let fixture: ComponentFixture<SalesPoint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPoint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesPoint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
