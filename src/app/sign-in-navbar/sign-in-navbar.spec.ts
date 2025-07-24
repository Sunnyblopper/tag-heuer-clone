import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInNavbar } from './sign-in-navbar';

describe('SignInNavbar', () => {
  let component: SignInNavbar;
  let fixture: ComponentFixture<SignInNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInNavbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInNavbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
