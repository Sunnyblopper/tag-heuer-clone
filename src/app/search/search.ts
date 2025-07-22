import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchText: string = '';

  collections = [
    { label: 'CARRERA', img: 'image/TAG-Heuer-Collection-Carrera-thumb.avif' },
    {
      label: 'FORMULA 1',
      img: 'image/TAG-Heuer-Collection-Formula1-thumb.webp',
    },
    {
      label: 'AQUARACER',
      img: 'image/TAG-Heuer-Collection-Aquaracer-thumb.avif',
    },
    { label: 'MONACO', img: 'image/TAG-Heuer-Collection-Monaco-thumb.avif' },
    {
      label: 'CONNECTED',
      img: 'image/TAG-Heuer-Collection-Connected-thumb.webp',
    },
    { label: 'LINK', img: 'image/TAG-Heuer-Collection-Link-thumb.avif' },
  ];

  products = [
    {
      name: 'TAG HEUER CARRERA',
      model: 'TH31-02',
      img: 'image/WDA2112.BA0043_0913.avif',
    },
    {
      name: 'TAG HEUER CARRERA',
      model: 'TH20-00',
      img: 'image/CBS2216.BA0048_0913.avif',
    },
    {
      name: 'TAG HEUER FORMULA 1',
      model: 'TH50-00',
      img: 'image/WBY1111.BA0042_0913.avif',
    },
    {
      name: 'TAG HEUER FORMULA 1',
      model: 'Calibre 16 Automatic',
      img: 'image/CBZ2085.FT8093_0913.avif',
    },
  ];

  helpOptions = [
    { label: 'FAQ', icon: 'fas fa-comment' },
    { label: 'FIND A STORE', icon: 'fas fa-map-marker-alt' },
    { label: 'CUSTOMER CARE', icon: 'fas fa-headphones' },
    { label: 'CONTACT US', icon: 'fas fa-envelope' },
  ];
}
