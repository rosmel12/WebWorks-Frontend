import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { PlanesService } from '../../../services/planes.service';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MethodpaymentService } from '../../../services/methodpayment.service';
import { MethodPayment } from '../../../model/methodPayment';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {Subscription} from "../../../model/subscription";
import {PromotionCodeService} from "../../../services/promotioncode.service";
import {PromotionCode} from "../../../model/promotionCode";
@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    RouterModule,
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent implements OnInit {
  public subscriptionForm!: FormGroup
  [x: string]: any;
  dataMetodoPago=new MatTableDataSource<MethodPayment>
  public confirm: boolean = true;
  price:number =0
  priceDiscount:number =0
  priceFinal:number =0
  idCard:number = 0
  idPromotionCode : number =0
  constructor(
    private formBuilder: FormBuilder,
    private methodPaymentService:MethodpaymentService,
    private subscriptionService: SubscriptionService,
    private plan: PlanesService,
    private promotionCodeService:PromotionCodeService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    console.clear();
   if(this.plan.getIdPlan()==null){
     this.confirm=false
   }else {
     this.dateMethodPayment();
     this.reactiveForm()
   }
  }

  reactiveForm() {
    this.subscriptionForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    })
  }

  dateMethodPayment(){
     this.methodPaymentService.methodsPaymentByUser(parseInt(this.userService.getId())).subscribe(
       (card:MethodPayment[])=>{
         this.dataMetodoPago=new MatTableDataSource(card)
         this.price=parseInt(this.plan.getPricePlan()!)
         this.priceFinal=parseInt(this.plan.getPricePlan()!)
     })
  }

  datePromotionCode() {
    if(this.subscriptionForm.valid){
      const  code = this.subscriptionForm.controls['code'].value;
     this.promotionCodeService.getPromotionCodeByCode(code).subscribe(
      (data: PromotionCode) => {
        if(data) {
          this.priceDiscount =data.discountPercentage * parseInt(this.plan.getPricePlan());
          this.priceFinal = parseInt(this.plan.getPricePlan()) - data.discountPercentage * parseInt(this.plan.getPricePlan());
          this.idPromotionCode=data.id;
        }else{
          console.log("Error getting promotion code");
          this.priceDiscount=0;
          this.priceFinal=this.price;
        }},
      );
    }else {
      alert("Ingrese Codigo")
    }
  }

  addPremium() {
    if (this.plan.getIdPlan() != null) {
      if(this.idCard!= 0) {
        const premium: Subscription = {
          id: 0,
          dateStart: new Date,
          dateEnd: addMonths(new Date(), 6),
          amountTotal: this.priceFinal,
          id_user: parseInt(this.userService.getId()),
          id_plan: parseInt(this.plan.getIdPlan()),
          id_methodPayment: this.idCard || 0,
          id_promotionCode: this.idPromotionCode || 0,
        }
        this.subscriptionService.addSubscription(premium).subscribe(
          (check: boolean) => {
            if (check) {
              this.plan.deleteData();
              this.router.navigateByUrl('/pageUser').then(() => console.log(check));
            }
          })
      }else{
        alert("seleciona un medio de pago")
      }
    } else {
      alert("seleciona un plan")
    }
  }

  cambiarIdPago(id:number){
    return this.idCard=id;
  }

}
const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}



