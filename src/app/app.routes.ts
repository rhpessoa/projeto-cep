import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.component-module').then(m => m.HomeModule)
  },
  {
    path: 'cep',
    loadChildren: () => import('./address-search/address-search-module').then(m => m.AddressSearchModule)
  }
];