import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { SubscriptionService } from '../../../services/subscription.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatCardModule} from "@angular/material/card";
import {RepositoryService} from "../../../services/repository.service";
import {ProjectService} from "../../../services/project.service";
import {MethodpaymentService} from "../../../services/methodpayment.service";
import {Subscription} from "../../../model/subscription";
import {SubscriptionCheck} from "../../../modelComplement/subscriptioCheck";

const busquedaIcon = `
<svg xmlns="http://www.w3.org/2000/svg"   id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" style="enable-background:new 0 0 513.749 513.749;" xml:space="preserve" width="512" height="512">
<g>
	<path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z"/>
</g>
</svg>
`;

@Component({
  selector: 'app-page-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    RouterModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './page-usuario.component.html',
  styleUrl: './page-usuario.component.css'
})

export class PageUsuarioComponent implements OnInit {


  dataSource = new MatTableDataSource<User>()
  constructor(
    private userService: UserService,
    private authService:AuthService,
    private subscriptionService:SubscriptionService,
    private repositoryService: RepositoryService,
    private projectService: ProjectService,
    private methodPaymentService:MethodpaymentService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {this.iconRegistry.addSvgIconLiteral('busquedaIcon', this.sanitizer.bypassSecurityTrustHtml(busquedaIcon));
  }

  ngOnInit(): void {
    console.clear()
    this.getUserInformation();
    this.checkSubscription();

   this.deleteInformation();
  }

  getUserInformation() {
    this.userService.getUser(this.authService.getUser() || "").subscribe((data: User) => {
      this.dataSource.data=[data]
      this.subscriptionService.checkSubscription(parseInt(this.userService.getId())).subscribe(
        (check:SubscriptionCheck)=>{
          this.createSubscriptionFree(check.status,check.amount)
        })
    })
  }

  deleteInformation(){
  this.repositoryService.deleteDateSave();
  this.projectService.deleteIdSave();
  this.methodPaymentService.deleteIdSave();
  }

  checkSubscription():Boolean   {
    return this.subscriptionService.getCheckSubscription()
  }

   createSubscriptionFree(check:boolean, amount:number){

    if(!check && amount < 0){
      const premium: Subscription = {
        id: 0,
        dateStart: new Date,
        dateEnd: addMonths(new Date(), 6),
        amountTotal:0,
        id_user: parseInt(this.userService.getId()),
        id_plan:1,
        id_methodPayment:  0,
        id_promotionCode: 0,
      }
      this.subscriptionService.addSubscription(premium).subscribe(
        (check:boolean)=>{
          if(check){
            console.log(check)
          }
        }
      )
    }
   }
}

const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}
