import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  url = 'http://127.0.0.1:8000/api'
  constructor(private http:HttpClient) { }

  getTransactionByUser(){
    return this.http.get(`${this.url}/transactionByUser`)          
  }

  getTransactionByCompte(){
    return this.http.get(`${this.url}/transactionByCompte`)          
  }
}
