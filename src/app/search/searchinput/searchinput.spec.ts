import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchinput } from './searchinput';

describe('Searchinput', () => {
  let component: Searchinput;
  let fixture: ComponentFixture<Searchinput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchinput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchinput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
