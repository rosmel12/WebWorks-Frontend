import { Component, OnInit } from '@angular/core';
import { MethodPayment } from '../../../model/methodPayment';
import { MethodpaymentService } from '../../../services/methodpayment.service';
import { UserService } from '../../../services/user.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-list-metodo-pago',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './list-metodo-pago.component.html',
  styleUrl: './list-metodo-pago.component.css'
})
export class ListMetodoPagoComponent implements OnInit {

  dataSource = new MatTableDataSource<MethodPayment>();

  public NameUser: string = ''

  constructor(
    private userService: UserService,
    private methodPaymentService: MethodpaymentService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    console.clear();
    this.getCard();

  }

  getCard()  {
    this.methodPaymentService.methodsPaymentByUser(parseInt(this.userService.getId()!)).subscribe((data: MethodPayment[]) => {
      if(data){
        this.dataSource=new MatTableDataSource(data)
        this.NameUser=this.userService.getName();
      }
    })

  }

  saveData(id: number ) {
    this.methodPaymentService.saveId(id);
    this.router.navigate(["/addMethodPayment"]).then( ()=> {console.log("success")});
  }

}
