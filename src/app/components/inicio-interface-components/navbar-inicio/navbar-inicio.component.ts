import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-navbar-inicio',
  standalone: true,
  imports: [ MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,],
  templateUrl: './navbar-inicio.component.html',
  styleUrl: './navbar-inicio.component.css'
})
export class NavbarInicioComponent {

}
