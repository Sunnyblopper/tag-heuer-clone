import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { CollectionCard } from './collection-card/collection-card';
import { Formula } from './formula/formula';
import { Searchproduct } from './search/searchproduct/searchproduct';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer,Searchproduct],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tag-heuer-clone');
}
