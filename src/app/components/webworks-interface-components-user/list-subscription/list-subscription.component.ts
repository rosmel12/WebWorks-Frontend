import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { MatInputModule} from "@angular/material/input";
import { MatTooltipModule} from "@angular/material/tooltip";
import { RouterModule} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {SubscriptionService} from "../../../services/subscription.service";
import {SubscriptionSummary} from "../../../modelComplement/subscriptionSummary";

@Component({
  selector: 'app-list-subscription',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './list-subscription.component.html',
  styleUrl: './list-subscription.component.css'
})
export class ListSubscriptionComponent implements OnInit {
  displayedColumns: string[] = ['dateStart', 'dateEnd', 'amountTotal','namePlan','numberMethodPayment','namePromotionCode','discountPercentage'];
  dataSource = new MatTableDataSource<SubscriptionSummary>();

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService,
  ) {}

  ngOnInit() {
    console.clear();
    this.getSubscriptions()
  }

  getSubscriptions(){
    this.subscriptionService.getSubscriptions(parseInt(this.userService.getId())).subscribe(
      (subscriptions:SubscriptionSummary[])=>{
        this.dataSource.data = subscriptions;
      }
    )
  }

}
