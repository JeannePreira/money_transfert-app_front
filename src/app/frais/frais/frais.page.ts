import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.page.html',
  styleUrls: ['./frais.page.scss'],
})
export class FraisPage implements OnInit {
  fraisForm:FormGroup;
  frais;
  constructor(private clientService:ClientService, public alertController: AlertController) { }

  ngOnInit() {
    this.fraisForm = new FormGroup({
      'type':new FormControl('', Validators.required),
      'montant': new FormControl('', Validators.required)
    })
  }

  calculer(){
    this.clientService.getFrais(this.fraisForm.value).subscribe(async data => {
      this.frais = data;
      console.log(data)
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Calculateur',
        message: ` Pour une transaction de ` + '' + this.fraisForm.value.montant + '<br>' + `le frais est egal à `+ '' + this.frais,
        buttons: ['OK']
      });
  
      await alert.present();
      
    })
  }

}
