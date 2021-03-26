import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.page.html',
  styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
 
  constructor(private transactionService:TransactionService) { }
  transactions: any;

  ngOnInit() {
    this.transactionService.getTransactionByUser().subscribe(data =>
      {
        this.transactions = data;
        console.log(this.transactions)
      }
    )
  
    }
}
