import { Component } from '@angular/core';
import { TagHeuerSlider } from "../tag-heuer-slider/tag-heuer-slider";
import { TagHeuerAquaracer } from "../tag-heuer-aquaracer/tag-heuer-aquaracer";
import { DesignedToWin } from "../designed-to-win/designed-to-win";
import { CollectionCard } from "../collection-card/collection-card";
import { WatchSelection } from "../watch-selection/watch-selection";
import { WatchesSlider } from "../watches-slider/watches-slider";

@Component({
  selector: 'app-home',
  imports: [TagHeuerSlider, TagHeuerAquaracer, DesignedToWin, CollectionCard, WatchSelection, WatchesSlider],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
