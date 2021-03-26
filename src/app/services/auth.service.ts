import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:8000/api" ;
  helper = new JwtHelperService() ;
  constructor(private http: HttpClient, private router: Router) { }

 login(username:string, password:string){
    return this.http.post(this.baseUrl+'/login', {
     username,  password
     }).pipe(
            map((response: any) =>{
              localStorage.setItem('token',response.token) ;
                const tokendecoded =  this.helper.decodeToken(response.token) ;
                if(tokendecoded.roles.includes("ROLE_ADMIN_AGENCE")){
                      this.router.navigate(['/footer']);
                      return response;
                      // console.log("hello")
                }else  if(tokendecoded.roles.includes("ROLE_ADMIN-SYSTEM")){
                  this.router.navigate(['/footer']);
                  return response;
                  // console.log("hello")
            }
            })
          )
   }

   getToken(){
    const token = localStorage.getItem('token');
    if(token != 'undefined'){
      return token
    }else{
      return null;
    }
  }
}
