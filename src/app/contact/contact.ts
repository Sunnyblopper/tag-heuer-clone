import { Component } from '@angular/core';
import { Slider } from "./slider/slider";
import { ServiceCenter } from "./service-center/service-center";
import { ContactPreferences } from "./contact-preferences/contact-preferences";

@Component({
  selector: 'app-contact',
  imports: [Slider, ServiceCenter, ContactPreferences],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

}
