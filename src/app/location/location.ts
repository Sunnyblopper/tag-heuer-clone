import { Component } from '@angular/core';
import { SalesPoint } from "./sales-point/sales-point";
import { StoreLocator } from "./store-locator/store-locator";

@Component({
  selector: 'app-location',
  imports: [SalesPoint, StoreLocator],
  templateUrl: './location.html',
  styleUrl: './location.css'
})
export class Location {

}
