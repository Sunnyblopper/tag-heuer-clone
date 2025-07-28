import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-point',
  imports: [CommonModule],
  templateUrl: './sales-point.html',
  styleUrl: './sales-point.css'
})
export class SalesPoint {

  countryColumns = [
  ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'China 中国', 'Colombia', 'Croatia', 'Czech Republic', 'Denmark'],
  ['Finland', 'France', 'Germany', 'Greece', 'Hong Kong 香港', 'India', 'Indonesia', 'Israel', 'Italy', 'Japan', 'Malaysia'],
  ['Mexico', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Russia', 'Saudi Arabia', 'Singapore', 'South Africa', 'South Korea', 'Spain'],
  ['Sweden', 'Switzerland', 'Taiwan 台湾', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States']
];

}
