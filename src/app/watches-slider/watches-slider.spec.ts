import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesSlider } from './watches-slider';

describe('WatchesSlider', () => {
  let component: WatchesSlider;
  let fixture: ComponentFixture<WatchesSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchesSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchesSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
