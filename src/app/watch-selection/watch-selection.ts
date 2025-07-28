import { Component } from '@angular/core';

@Component({
  selector: 'app-watch-selection',
  imports: [],
  templateUrl: './watch-selection.html',
  styleUrl: './watch-selection.css'
})
export class WatchSelection {

  viewAll(gender: string) {
    console.log(`View all watches for ${gender}`);
  }

}
