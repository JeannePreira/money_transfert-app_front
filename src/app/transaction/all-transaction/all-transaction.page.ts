import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction/transaction.service';

@Component({
  selector: 'app-all-transaction',
  templateUrl: './all-transaction.page.html',
  styleUrls: ['./all-transaction.page.scss'],
})
export class AllTransactionPage implements OnInit {
  constructor(private transactionService:TransactionService) { }
  transactions: any;

  ngOnInit() {
    this.transactionService.getTransactionByCompte().subscribe(data =>
      {
        this.transactions = data,
        console.log(this.transactions)
      }  
    )
  }

}
