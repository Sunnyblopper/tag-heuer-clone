import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Search } from "./search/search";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tag-heuer-clone');
}
