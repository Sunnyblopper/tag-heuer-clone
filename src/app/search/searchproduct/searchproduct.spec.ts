import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchproduct } from './searchproduct';

describe('Searchproduct', () => {
  let component: Searchproduct;
  let fixture: ComponentFixture<Searchproduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchproduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchproduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
