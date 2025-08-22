import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Searchwatches } from '../searchwatches/searchwatches';

@Component({
  selector: 'app-searchinput',
  imports: [CommonModule, FormsModule],
  templateUrl: './searchinput.html',
  styleUrl: './searchinput.css',
})
export class Searchinput {
  @Input() searchText: string = ''; 
  @Output() searchTextChange = new EventEmitter<string>();

  onInputChange() {
    this.searchTextChange.emit(this.searchText);
  }
}
