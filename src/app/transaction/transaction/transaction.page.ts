import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

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
