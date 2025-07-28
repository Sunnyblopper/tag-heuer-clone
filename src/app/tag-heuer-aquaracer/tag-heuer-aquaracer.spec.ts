import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagHeuerAquaracer } from './tag-heuer-aquaracer';

describe('TagHeuerAquaracer', () => {
  let component: TagHeuerAquaracer;
  let fixture: ComponentFixture<TagHeuerAquaracer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagHeuerAquaracer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagHeuerAquaracer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
