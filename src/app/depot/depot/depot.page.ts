import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  user:any;
  montant="";
  clientDepot="";
  clientRetrait="";
  nom="";
  prenom="";
  phone="";
  cni="";
  frais;
  total;
  depotForm:FormGroup;

  constructor(private fb:FormBuilder, private clientService:ClientService, public alertController: AlertController) { }
  selectSegment: string = 'emetteur';

  segmentChanged(ev: any) {
    console.log(ev.target.value);
    this.selectSegment=ev.target.value;
  }

  ngOnInit() {
    this.depotForm = this.fb.group({
      cni1: ['', Validators.required],
      nom1: ['', Validators.required],
      prenom1: ['', Validators.required],
      phone1: ['', Validators.required],
      montantDepot: ['', Validators.required],
      frais: ['', Validators.required],
      total: ['', Validators.required],
      nom2: ['', Validators.required],
      prenom2: ['', Validators.required],
      phone2: ['', Validators.required],
    })
  }

  getFrais(){
    // console.log(this.montant);
      const Montant = {
        montant:this.montant
      }
      this.clientService.getFrais(Montant).subscribe(
        data =>{
         this.frais=data;
         this.total =(+this.montant) - this.frais;
        }
      )
  }

 async depot(){
 
    const info={
      "montant":this.depotForm.value.montantDepot,
      "clientDepot":{
        "nom":this.depotForm.value.nom1,
        "prenom":this.depotForm.value.prenom1,
        "phone":this.depotForm.value.phone1,
        "CNI":this.depotForm.value.cni1
      },
      "clientRetrait":{
        "nom":this.depotForm.value.nom2,
        "prenom":this.depotForm.value.prenom2,
        "phone":this.depotForm.value.phone2
      }
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `<div><p>Emétteur <br> <strong>`+ this.depotForm.value.prenom1 + ' ' + this.depotForm.value.nom1 +`</strong></p></div>
      <div><p>Téléphone <br> <strong>`+ this.depotForm.value.phone1 +`</strong></p></div>
      <div><p>N°CNI <br> <strong>`+ this.depotForm.value.cni1 +`</strong></p></div>
      <div><p>Montant à envoyer <br> <strong>`+ ((+this.montant) - this.frais) +`</strong></p></div>
      <div><p>Bénéficiaire <br> <strong>`+ this.depotForm.value.prenom2 + ' ' + this.depotForm.value.nom2  +`</strong></p></div>
      <div><p>Téléphone <br> <strong>`+ this.depotForm.value.phone2 +`</strong></p></div>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.clientService.depotUser(info).subscribe(async data => {
              console.log(data)
              const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: 'Alert',
                subHeader: 'Subtitle',
                message: `<div><p>Infos <br> <strong>Vous avez envoyé `+ ((+this.montant) - this.frais) + ' à ' + this.depotForm.value.nom2 + ' ' + this.depotForm.value.prenom2 + `</strong></p></div>`,
                buttons: ['OK']
              });
          
              await alert.present();
            })
          }
        }
      ]
    });

    await alert.present();
   
}
  
get CNI(){
  return this.depotForm.get('cni')
}

}
