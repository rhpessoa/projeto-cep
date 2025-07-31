import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './shared-material.module';
import { HeaderComponent } from './header/header.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    NgxMaskDirective, 
    HeaderComponent
  ],
  exports: [
    HeaderComponent,
    SharedMaterialModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class SharedModule {}
