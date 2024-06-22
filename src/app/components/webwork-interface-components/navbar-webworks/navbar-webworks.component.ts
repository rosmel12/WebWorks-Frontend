import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-navbar-webworks',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './navbar-webworks.component.html',
  styleUrl: './navbar-webworks.component.css'
})
export class NavbarWebworksComponent {
selected: any;

}
