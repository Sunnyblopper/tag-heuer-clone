import { Component } from '@angular/core';

@Component({
  selector: 'app-designed-to-win',
  imports: [],
  templateUrl: './designed-to-win.html',
  styleUrl: './designed-to-win.css'
})
export class DesignedToWin {

  onDiscoverClick() {
    console.log('Discover button clicked!');
    // You can add routing or any logic here if needed
  }
  
}
