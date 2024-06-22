import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registrar-metodo-pago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule],
  templateUrl: './registrar-metodo-pago.component.html',
  styleUrl: './registrar-metodo-pago.component.css'
})
export class RegistrarMetodoPagoComponent {
loginForm: any;

}
