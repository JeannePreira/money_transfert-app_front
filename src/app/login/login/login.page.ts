import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  authService: any;
  @ViewChild('loginForm') form: NgForm | any;


  constructor(private authenticationService: AuthService, private  loadingController: LoadingController) { }

  ngOnInit() {
  }

  async Login(): Promise<void> {
    this.authenticationService.login(this.form.value.username,this.form.value.password)
      .subscribe(async data => {
        console.log(data) ;
      })
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 600
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();

     
  }
}
