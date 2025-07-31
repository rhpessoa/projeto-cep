import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressSearchFormComponent } from './address-search-form/address-search-form.component.js';
import { AddressResultComponent } from './address-result/address-result.component.js';
import { SEARCH_ROUTES } from './address-search-routing-module.js';

@NgModule({
  imports: [
    AddressSearchFormComponent,
    AddressResultComponent,
    RouterModule.forChild(SEARCH_ROUTES)
  ]
})
export class AddressSearchModule { }
