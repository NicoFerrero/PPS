import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Mensaje } from '../models/mensaje.model';
import { User } from '../models/user.model';
import { PopoverController, LoadingController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { Plugins, KeyboardInfo } from '@capacitor/core';

const { Keyboard } = Plugins;
@Component({
  selector: 'app-aula-a',
  templateUrl: './aula-a.page.html',
  styleUrls: ['./aula-a.page.scss'],
})
export class AulaAPage implements OnInit, AfterViewChecked {
  mensajes: Mensaje[];
  mensaje: string;
  user: User;
  e: Event;
  constructor(
    private authService: AuthService,
    private popoverController: PopoverController,
    private spinner: LoadingController,
  ) {}

  async ngOnInit() {
    this.user = this.authService.user;
    this.mensajes = [];
    this.mensaje = '';
    const spinner = await this.spinner.create({
      message: 'Cargando Mensajes...',
      duration: 1000,
      showBackdrop: false,
      spinner: 'bubbles',
    });
    await spinner.present();
    this.authService.traerMensajes('4a').subscribe(async (data: Mensaje[]) => {
      this.mensajes = data;
    });
  }

  ngAfterViewChecked() {
    const objDiv = document.getElementById('divExample') as HTMLDivElement;
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  async enviarMensaje(e: Event) {
    const msg = this.mensaje;

    e.preventDefault();
    if (msg.length > 21) {
      Keyboard.hide().then(() => {
        setTimeout(async () => {
          const popover = await this.popoverController.create({
            component: PopoverPage,
            event: this.e,
            showBackdrop: false,
          });
          await popover.present();
        }, 200);
      });
      return;
    } else if (msg.length === 0) {
      return;
    }
    this.mensaje = '';
    const mensaje: Mensaje = {
      mensaje: msg,
      fecha: new Date(),
      nombreCompleto: this.authService.user.nombre + ' ' + this.authService.user.apellido,
      usuario: this.authService.user.uid,
    };
    this.authService.enviarMensaje('4a', mensaje).then(() => {
      const objDiv = document.getElementById('divExample') as HTMLDivElement;
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  error(e) {
    this.e = e;
    console.log(e.target.value.length);
    if (e.target.value.length > 21) {
      Keyboard.hide().then(async () => {
        setTimeout(async () => {
          const popover = await this.popoverController.create({
            component: PopoverPage,
            event: this.e,
            showBackdrop: false,
          });
          await popover.present();
        }, 200);
      });
    }
  }
}
