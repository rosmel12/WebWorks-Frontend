import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-navbar-inicio',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './navbar-inicio.component.html',
  styleUrl: './navbar-inicio.component.css'
})
export class NavbarInicioComponent {
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.querySelector('.contenidoButon');
    if (menu) {
      if (this.menuOpen) {
        menu.classList.add('show');
      } else {
        menu.classList.remove('show');
      }
    }
  }

  eliminar() {
    this.menuOpen = !this.menuOpen;
    const menu = document.querySelector('.contenidoButon');
    if (menu) {
      menu.classList.remove('show');
    }
  }
}
