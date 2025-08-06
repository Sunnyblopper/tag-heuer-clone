import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceImage } from './experience-image';

describe('ExperienceImage', () => {
  let component: ExperienceImage;
  let fixture: ComponentFixture<ExperienceImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
