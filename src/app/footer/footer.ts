import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer implements AfterViewInit {

  ngAfterViewInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const secondDeg = second * 6; 
    const minuteDeg = minute * 6 + second * 0.1; 
    const hourDeg = (hour % 12) * 30 + minute * 0.5;

    const secondHand = document.getElementById('secondHand');
    const minuteHand = document.getElementById('minuteHand');
    const hourHand = document.getElementById('hourHand');

    if (secondHand) secondHand.setAttribute('transform', `rotate(${secondDeg} 100 85)`);
    if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minuteDeg} 100 85)`);
    if (hourHand) hourHand.setAttribute('transform', `rotate(${hourDeg} 100 85)`);
  }
}
