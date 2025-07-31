import { Component, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { Loader } from "./shared/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Loader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  isLoading = false;
 protected readonly title = signal('projeto-cep');
   constructor(private router: Router) {
    let timeout: any;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        clearTimeout(timeout);
        this.isLoading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        timeout = setTimeout(() => {
          this.isLoading = false;
        }, 1000); 
      }
    });
  }}