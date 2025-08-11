import { Routes } from '@angular/router';
import { Search } from './search/search';
import { Contact } from './contact/contact';
import { Location } from './location/location';
import { Home } from './home/home';
import { Register } from './register/register';
import { Formula } from './formula/formula';
import { Productpage } from './productpage/productpage';
import { Cart } from './cart/cart';
import { Checkout } from './cart/checkout/checkout';
import { Order } from './cart/order/order';
import { User } from './user/user';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search },
  { path: 'contact', component: Contact },
  { path: 'map', component: Location },
  { path: 'register', component: Register},
  { path: 'formula', component: Formula},
  { path: 'product/:id', component: Productpage },
  { path: 'cart', component: Cart},
  { path: 'checkout', component: Checkout },
  { path: 'user', component: User},
  { path: 'orders', component: Order },
  { path: "**", redirectTo: "home" }
];
