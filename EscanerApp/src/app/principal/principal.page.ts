import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: User;
  subs: Subscription = new Subscription();
  codigo: string;
  credito: number;
  cargas: number;
  aCargado: string;
  qr: string;
  constructor(
    private authService: AuthService,
    private qrScanner: QRScanner,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.usuario = new User();
    this.aCargado = '';
    this.codigo = '';
    this.credito = 0;
    this.authService.currentUser().then((rawUser) => {
      console.log(rawUser);
      this.subs.add(
        this.authService.getUser(rawUser?.uid).subscribe((user: User) => {
          console.log(user);
          this.usuario = user;
        }),
      );
    });
  }

  leerQr() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          const ionApp = document.getElementsByTagName('ion-app')[0] as HTMLElement;
          // start scanning
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            ionApp.style.display = 'block';
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.cargar(text);
          });
          ionApp.style.display = 'none';
          this.qrScanner.show();
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  async cargar(qr) {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'danger',
    });
    switch (qr) {
      case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
        if (this.usuario.tipoUsuario !== 'admin' && this.usuario.cargas_100 < 1) {
          // this.usuario.credito += 100;
          // this.usuario.cargas_100 = this.usuario.cargas_100 + 1;
          this.codigo = 'codigo_100';
          this.credito = this.usuario.credito + 100;
          this.cargas = this.usuario.cargas_100 + 1;
          this.aCargado = '100';
          this.qr = '../../assets/qr_100.png';
        } else if (this.usuario.tipoUsuario === 'admin' && this.usuario.cargas_100 < 2) {
          // this.usuario.credito += 100;
          // this.usuario.cargas_100 = this.usuario.cargas_100 + 1;
          this.codigo = 'codigo_100';
          this.credito = this.usuario.credito + 100;
          this.cargas = this.usuario.cargas_100 + 1;
          this.aCargado = '100';
          this.qr = '../../assets/qr_100.png';
        } else if (
          (this.usuario.tipoUsuario !== 'admin' && this.usuario.cargas_100 >= 1) ||
          (this.usuario.tipoUsuario === 'admin' && this.usuario.cargas_100 >= 2)
        ) {
          toast.message = 'Supero las cargas maximas de este codigo';
          toast.present();
          console.log('Supero las cargas maximas de este codigo');
        }
        break;
      case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ':
        if (this.usuario.tipoUsuario !== 'admin' && this.usuario.cargas_50 < 1) {
          // this.usuario.credito += 50;
          // this.usuario.cargas_50 = this.usuario.cargas_50 + 1;
          this.codigo = 'codigo_50';
          this.credito = this.usuario.credito + 50;
          this.cargas = this.usuario.cargas_50 + 1;
          this.aCargado = '50';
          this.qr = '../../assets/qr_50.png';
        } else if (this.usuario.tipoUsuario === 'admin' && this.usuario.cargas_50 < 2) {
          // this.usuario.credito += 50;
          // this.usuario.cargas_50 = this.usuario.cargas_50 + 1;
          this.codigo = 'codigo_50';
          this.credito = this.usuario.credito + 50;
          this.cargas = this.usuario.cargas_50 + 1;
          this.aCargado = '50';
          this.qr = '../../assets/qr_50.png';
        } else if (
          (this.usuario.tipoUsuario !== 'admin' && this.usuario.cargas_50 >= 0) ||
          (this.usuario.tipoUsuario === 'admin' && this.usuario.cargas_50 >= 2)
        ) {
          toast.message = 'Supero las cargas maximas de este codigo';
          toast.present();
          console.log('Supero las cargas maximas de este codigo');
        }
        break;
      case '8c95def646b6127282ed50454b73240300dccabc':
        if (this.usuario.tipoUsuario !== 'admin' && this.usuario.cargas_10 < 1) {
          // this.usuario.credito += 10;
          // this.usuario.cargas_10 = this.usuario.cargas_10 + 1;
          this.codigo = 'codigo_10';
          this.credito = this.usuario.credito + 10;
          this.cargas = this.usuario.cargas_10 + 1;
          this.aCargado = '10';
          this.qr = '../../assets/qr_10.png';
        } else if (this.usuario.tipoUsuario === 'admin' && this.usuario.cargas_10 < 2) {
          // this.usuario.credito += 10;
          // this.usuario.cargas_10 = this.usuario.cargas_10 + 1;
          this.codigo = 'codigo_10';
          this.credito = this.usuario.credito + 10;
          this.cargas = this.usuario.cargas_10 + 1;
          this.aCargado = '10';
          this.qr = '../../assets/qr_10.png';
        } else if (
          (this.usuario.tipoUsuario !== 'admin' && this.usuario.cargas_10 >= 0) ||
          (this.usuario.tipoUsuario === 'admin' && this.usuario.cargas_10 >= 2)
        ) {
          toast.message = 'Supero las cargas maximas de este codigo';
          toast.present();
          console.log('Supero las cargas maximas de este codigo');
        }
        break;
      case 'reset':
        this.codigo = 'reset';
        break;
      default:
        toast.message = 'codigo invalido';
        toast.present();
        console.log('codigo invalido');
        break;
    }
    if (this.codigo !== '' && this.codigo !== 'reset' && this.credito > 0) {
      (document.getElementById('icon') as HTMLIonIconElement).style.color = 'green';
      (document.getElementById('icon') as HTMLIonIconElement).classList.add('shake-horizontal');
      this.authService
        .cargarCredito(this.codigo, this.credito, this.cargas, this.usuario.uid)
        .then(() => {
          this.aCargado = '';
          // (document.getElementById('icon') as HTMLIonIconElement).style.color = 'green';
          setTimeout(() => {
            (document.getElementById('icon') as HTMLIonIconElement).style.color = 'black';
            (document.getElementById('icon') as HTMLIonIconElement).classList.remove(
              'shake-horizontal',
            );
          }, 2000);
          this.cargas = 0;
          this.credito = 0;
          this.codigo = '';
        });
    } else if (this.codigo === 'reset') {
      (document.getElementById('icon') as HTMLIonIconElement).style.color = 'red';
      (document.getElementById('icon') as HTMLIonIconElement).classList.add('jello-horizontal');
      this.authService
        .cargarCredito(this.codigo, this.credito, this.cargas, this.usuario.uid)
        .then(() => {
          // (document.getElementById('icon') as HTMLIonIconElement).style.color = 'red';
          setTimeout(() => {
            (document.getElementById('icon') as HTMLIonIconElement).style.color = 'black';
            (document.getElementById('icon') as HTMLIonIconElement).classList.remove(
              'jello-horizontal',
            );
          }, 1000);
          this.cargas = 0;
          this.credito = 0;
          this.codigo = '';
        });
    }
  }

  cerrarSesion() {
    this.authService.logOut();
  }
}
