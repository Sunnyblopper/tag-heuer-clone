import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-collection-card',
  imports: [CommonModule],
  templateUrl: './collection-card.html',
  styleUrl: './collection-card.css'
})
export class CollectionCard {
  collections = [
    { name: 'CARRERA', imageUrl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwafb6070e/images/univers/9-Maison/tag_heuer_carrera.png' },
    { name: 'FORMULA 1', imageUrl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw8b089740/images/univers/9-Maison/tag_heuer_formula1.png' },
    { name: 'AQUARACER', imageUrl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dw430a5f94/images/univers/9-Maison/tag_heuer_aquaracer.png' },
    { name: 'MONACO', imageUrl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwe7208dd2/images/univers/9-Maison/tag_heuer_monaco.png' },
    { name: 'CONNECTED', imageUrl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwb4f6c7b9/images/univers/9-Maison/tag_heuer_connected.png' },
    { name: 'LINK', imageUrl: 'https://www.tagheuer.com/on/demandware.static/-/Library-Sites-TagHeuer-Shared/default/dwf9856a7e/images/univers/9-Maison/tag_heuer_link.png' }
  ];

}
