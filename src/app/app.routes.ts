import { Routes } from '@angular/router';
import { Search } from './search/search';
import { Contact } from './contact/contact';
import { Location } from './location/location';
import { Home } from './home/home';
import { Register } from './register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'search', component: Search },
  { path: 'contact', component: Contact },
  { path: 'map', component: Location },
  { path: 'register', component: Register}
];
