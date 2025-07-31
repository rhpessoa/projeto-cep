import { Routes } from '@angular/router';
import { addressSearchFormComponent } from './address-search-form/address-search-form.component.js';
import { AddressResultComponent } from './address-result/address-result.component.js';


export const SEARCH_ROUTES: Routes = [
  { path: 'search', component: addressSearchFormComponent },
  { path: 'result', component: AddressResultComponent },
];
