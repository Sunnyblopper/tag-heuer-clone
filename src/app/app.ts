import { Component, signal } from '@angular/core';
import { Slider } from "./contact/slider/slider";
import { ContactPreferences } from "./contact/contact-preferences/contact-preferences";
import { ServiceCenter } from "./contact/service-center/service-center";
import { Footer } from "./footer/footer";
import { StoreLocator } from "./store-locator/store-locator";
import { SalesPoint } from "./sales-point/sales-point";
import { SignInNavbar } from "./sign-in-navbar/sign-in-navbar";

@Component({
  selector: 'app-root',
  imports: [ServiceCenter, StoreLocator, SalesPoint, SignInNavbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tag-heuer-clone');
}
