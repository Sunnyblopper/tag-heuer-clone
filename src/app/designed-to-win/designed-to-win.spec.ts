import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignedToWin } from './designed-to-win';

describe('DesignedToWin', () => {
  let component: DesignedToWin;
  let fixture: ComponentFixture<DesignedToWin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignedToWin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignedToWin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
