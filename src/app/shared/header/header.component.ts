import { Component } from '@angular/core';
import { SharedMaterialModule } from "../shared-material.module";

@Component({
  selector: 'app-header',
  imports: [SharedMaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 menuAberto = false;
  menuMobileAberto = false;
  menuMobileEnderecosAberto = false;
constructor() {}

ngOnInit() {

}

 toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  toggleMenuMobile() {
    this.menuMobileAberto = !this.menuMobileAberto;
    if (!this.menuMobileAberto) {
      this.menuMobileEnderecosAberto = false;
    }
  }

  toggleMenuMobileEnderecos() {
    this.menuMobileEnderecosAberto = !this.menuMobileEnderecosAberto;
  }
}
