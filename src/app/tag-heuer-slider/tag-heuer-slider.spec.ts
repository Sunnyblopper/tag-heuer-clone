import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagHeuerSlider } from './tag-heuer-slider';

describe('TagHeuerSlider', () => {
  let component: TagHeuerSlider;
  let fixture: ComponentFixture<TagHeuerSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagHeuerSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagHeuerSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
