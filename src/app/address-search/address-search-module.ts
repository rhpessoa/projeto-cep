import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { addressSearchFormComponent } from './address-search-form/address-search-form.component.js';
import { AddressResultComponent } from './address-result/address-result.component.js';
import { SEARCH_ROUTES } from './address-search-routing-module.js';

@NgModule({
  imports: [
    CommonModule,
    addressSearchFormComponent,
    AddressResultComponent,
    RouterModule.forChild(SEARCH_ROUTES)
  ]
})
export class AddressSearchModule { }
