import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPreferences } from './contact-preferences';

describe('ContactPreferences', () => {
  let component: ContactPreferences;
  let fixture: ComponentFixture<ContactPreferences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactPreferences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactPreferences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
