import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {

  selectSegment: string = 'emetteur';
  transaction:any;
  retraitForm:FormGroup;
  codeTransaction="";
  nomComplet1="";
  nomComplet2="";
  code="";
  info="";
  montant;
  phone1="";
  phone2="";
  dateDepot="";
  cni2=""
  phone="";
  dateRetrait="";
  
  constructor(private clientService:ClientService, public alertController: AlertController) { }

  ngOnInit() {
    this.retraitForm = new FormGroup({
      'codeTransaction':new FormControl('', Validators.required),
      'CNI': new FormControl('', Validators.required),
    })
  }

 
  segmentChanged(ev: any) {
    console.log(ev.target.value);
    this.selectSegment=ev.target.value
  }

  data(){
    // alert(this.retraitForm.value.codeTransaction);
    const Code = {
      code: this.retraitForm.value.codeTransaction
    }
    this.clientService.getTransactionByCode(Code).subscribe((data:any) =>
      {
        this.transaction = data;
        console.log(this.transaction);
        if(this.transaction){
          this.nomComplet1 = this.transaction.clientRetrait.nom + ' ' + this.transaction.clientRetrait.prenom;
          this.phone1 = this.transaction.clientRetrait.phone;
          this.montant = this.transaction.montant;
          this.cni2 = this.transaction.clientEnvoi.CNI;
          this.nomComplet2 = this.transaction.clientEnvoi.nom + ' ' + this.transaction.clientEnvoi.prenom;
          this.phone2 = this.transaction.clientEnvoi.phone;
          this.dateDepot = this.transaction.dateDepot;
        }
        
      },
    );
  }

  async retrait() {
    // console.log('hello');
    const info ={
      "codeTransaction": this.retraitForm.value.codeTransaction,
      "clientRetrait":{
        "CNI":this.retraitForm.value.CNI
      }
    }
    // console.log(this.nomComplet1);
    
    const alert = await this.alertController.create({

      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: `<div><p>Emétteur <br> <strong>`+ this.nomComplet2 +`</strong></p></div>
      
      <div><p>Téléphone <br> <strong>`+ this.phone2 +`</strong></p></div>
      <div><p>N°CNI <br> <strong>`+  this.cni2 +`</strong></p></div>
      <div><p>Montant à envoyer <br> <strong>`+ this.montant +`</strong></p></div>
      <div><p>Bénéficiaire <br> <strong>`+ this.nomComplet1  +`</strong></p></div>
      <div><p>Téléphone <br> <strong>`+ this.phone2 +`</strong></p></div>`,
     
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
            this.clientService.retraitUser(info).subscribe(async data => {
              console.log(data)
            })
          }
        }
      ]
    });

    await alert.present();

  }

}
