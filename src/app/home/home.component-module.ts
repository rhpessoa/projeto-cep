import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HOME_ROUTES } from './home.component-routing-module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule {}