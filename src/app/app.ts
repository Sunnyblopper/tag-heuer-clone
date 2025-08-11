import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";
import { CollectionCard } from './collection-card/collection-card';
import { Formula } from './formula/formula';
import { Searchproduct } from './search/searchproduct/searchproduct';
import { Cart } from "./cart/cart";
import { Userdata } from "./user/userdata/userdata";
import { Order } from "./cart/order/order";
import { Userorder } from "./user/userorder/userorder";
import { User } from "./user/user";
import { Useraccount } from "./user/useraccount/useraccount";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Searchproduct, Cart, Userdata, Order, Userorder, User, Useraccount],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tag-heuer-clone');
}
