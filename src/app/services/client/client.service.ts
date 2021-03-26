import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://127.0.0.1:8000/api'
  
  constructor(private http:HttpClient) { }

  depotUser(client: any){
    return this.http.post(`${this.url}/utilisateur/deposer/`, client)          
  }

  getFrais(montant:any){
    return this.http.post(`${this.url}/adminAgence/frais/`, montant) 
  }

  getTransactionByCode(code: any){
    return this.http.post(`${this.url}/adminAgence/transaction/`, code)
  }

  putTransactionByCode(code: any){
    return this.http.put(`${this.url}/adminAgence/transaction/`, code)
  }
  
  retraitUser(client: any){
    return this.http.post(`${this.url}/utilisateur/retrait/`, client)          
  }
}
