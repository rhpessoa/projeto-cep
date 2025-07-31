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
constructor() {}

ngOnInit() {

}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }
}
