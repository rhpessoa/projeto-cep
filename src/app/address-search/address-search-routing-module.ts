import { Routes } from '@angular/router';
import { AddressSearchFormComponent } from './address-search-form/address-search-form.component.js';
import { AddressResultComponent } from './address-result/address-result.component.js';


export const SEARCH_ROUTES: Routes = [
  { path: 'search', component: AddressSearchFormComponent },
  { path: 'result', component: AddressResultComponent },
];
