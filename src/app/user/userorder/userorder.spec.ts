import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userorder } from './userorder';

describe('Userorder', () => {
  let component: Userorder;
  let fixture: ComponentFixture<Userorder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userorder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userorder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
