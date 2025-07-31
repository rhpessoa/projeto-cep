import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.component-routing-module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    HomeComponent,
    RouterModule.forChild(HOME_ROUTES)
  ]
})
export class HomeModule {}