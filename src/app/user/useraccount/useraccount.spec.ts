import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Useraccount } from './useraccount';

describe('Useraccount', () => {
  let component: Useraccount;
  let fixture: ComponentFixture<Useraccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Useraccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Useraccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
