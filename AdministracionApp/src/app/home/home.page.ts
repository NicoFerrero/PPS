import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private speechRecognition: SpeechRecognition,
    private toast: ToastController,
  ) {}
  ngOnInit(): void {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
    this.speechRecognition.hasPermission().then((hasPermision: boolean) => {
      if (!hasPermision) {
        this.speechRecognition.requestPermission().then(
          () => console.log('permiso concedido'),
          () => console.log('permiso denegado'),
        );
      }
    });
  }
  onLogin(e?): void {
    this.authService.login(this.user);
  }

  start(): void {
    this.speechRecognition.hasPermission().then((hasPermision: boolean) => {
      if (!hasPermision) {
        this.speechRecognition.requestPermission().then(
          () => {
            console.log('permiso concedido');
          },
          () => console.log('permiso denegado'),
        );
      }
    });
    this.speechRecognition
      .startListening({ language: 'es-AR' })
      .subscribe((matches: Array<string>) => {
        console.log(matches[0]);
        switch (matches[0]) {
          case 'admin':
            this.user.email = 'admin@admin.com';
            this.user.password = '111111';
            break;
          case 'invitado':
            this.user.email = 'invitado@invitado.com';
            this.user.password = '222222';
            break;
          case 'usuario':
            this.user.email = 'usuario@usuario.com';
            this.user.password = '333333';
            break;
          case 'anónimo':
            this.user.email = 'anonimo@anonimo.com';
            this.user.password = '444444';
            break;
          case 'tester':
            this.user.email = 'tester@tester.com';
            this.user.password = '555555';
            break;
          default:
            this.toast
              .create({
                message: 'Usuario no reconocido',
                duration: 2000,
                position: 'top',
                color: 'warning',
              })
              .then((mensaje) => {
                mensaje.present();
              });
            break;
        }
        this.ref.detach();
        this.ref.detectChanges();
        setTimeout(() => {
          if (this.user.email !== '' && this.user.password !== '') this.onLogin();
        }, 1000);
      });
  }
}
