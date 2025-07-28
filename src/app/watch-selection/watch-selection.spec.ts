import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchSelection } from './watch-selection';

describe('WatchSelection', () => {
  let component: WatchSelection;
  let fixture: ComponentFixture<WatchSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
