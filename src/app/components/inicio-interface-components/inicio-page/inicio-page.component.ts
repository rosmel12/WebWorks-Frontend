import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlanesService } from '../../../services/planes.service';
import { MethodpaymentService } from '../../../services/methodpayment.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-inicio-page',
  standalone: true,
  imports: [ RouterModule],
  templateUrl: './inicio-page.component.html',
  styleUrl: './inicio-page.component.css'
})
export class InicioPageComponent implements OnInit {

  constructor(
    private planService:PlanesService,
    private metotoPagoService:MethodpaymentService,
    private auth:AuthService
  ){}

  ngOnInit(): void {
  //  this.auth.logout();
    // this.planService.eliminarIdElegido();
    //this.metotoPagoService.deleteDateSave();
  }


}
