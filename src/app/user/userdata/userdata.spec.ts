import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userdata } from './userdata';

describe('Userdata', () => {
  let component: Userdata;
  let fixture: ComponentFixture<Userdata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userdata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userdata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
