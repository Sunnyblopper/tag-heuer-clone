import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-store-locator',
  imports: [CommonModule],
  templateUrl: './store-locator.html',
  styleUrl: './store-locator.css',
})
export class StoreLocator implements AfterViewInit {
  stores = [
    {
      name: 'BOUTIQUE TAG HEUER KARACHI DOLMEN MALL CLIFTON',
      address:
        'Ground Level, Dolmen Mall<br />Clifton, Sea View<br />75600 Karachi',
      phone: '+922135296104',
      icon: 'fa-solid fa-shield text-danger',
    },
    {
      name: 'BOUTIQUE TAG HEUER ISLAMABAD SAFA MALL',
      address: 'Ground Level, Safa Mall<br />Jinnah Super, E-7',
      phone: '+921234567890',
      icon: 'fa-solid fa-shield text-danger',
    },
    {
      name: 'BOUTIQUE TAG HEUER KARACHI DOLMEN MALL CLIFTON',
      address:
        'Ground Level, Dolmen Mall<br />Clifton, Sea View<br />75600 Karachi',
      phone: '+922135296104',
      icon: 'fa-solid fa-shield text-danger',
    },
    {
      name: 'BOUTIQUE TAG HEUER ISLAMABAD SAFA MALL',
      address: 'Ground Level, Safa Mall<br />Jinnah Super, E-7',
      phone: '+921234567890',
      icon: 'fa-solid fa-shield text-danger',
    },
  ];

  ngAfterViewInit(): void {
    const map = L.map('map').setView([24.8607, 67.0011], 12); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([24.8607, 67.0011]).addTo(map)
      .bindPopup('TAG Heuer Boutique - Karachi')
      .openPopup();
  }
}
