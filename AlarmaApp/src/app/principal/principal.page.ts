import { Component, OnInit } from '@angular/core';
import {
  DeviceMotion,
  DeviceMotionAccelerationData,
  DeviceMotionAccelerometerOptions,
} from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { PopoverController } from '@ionic/angular';
import { PopoverPage } from '../popover/popover.page';
import { AudioService } from '../services/audio.service';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  /*x: number;
  y: number;
  z: number;
  tiempo: number;*/
  options: DeviceMotionAccelerometerOptions = {
    frequency: 50,
  };
  /****************************/
  private horizontal = true;
  private vertical = true;
  private derecha = true;
  private izquierda = true;
  private analizarMovimiento: Subscription;
  private e: Event;
  sourceImg: string;
  message: string;
  alarmaActiva: boolean;

  constructor(
    private deviceMotion: DeviceMotion,
    private audioService: AudioService,
    private flash: Flashlight,
    private vibrator: Vibration,
    private popCtrl: PopoverController,
    private spinnerService: SpinnerService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.alarmaActiva = false;
    this.manejarBoton();
    /*this.manejarBoton();
    this.deviceMotion
      .watchAcceleration(this.options)
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        console.log(acceleration);
        this.x = acceleration.x;
        this.y = acceleration.y;
        this.z = acceleration.z;
        this.tiempo = acceleration.timestamp;
      });*/
  }

  activarAlarma(e?: Event) {
    this.e = e;

    // Si tenía la alarma activada, la desactiva, deja de escuchar los cambios en el movimiento
    // y la orientación del dispositivo y frena todos los audios que haya en curso
    if (this.alarmaActiva === true) {
      this.mostrarPop(this.e).then((pop: HTMLIonPopoverElement) => {
        pop.present();
        pop.onDidDismiss().then((r) => {
          if (r.data.apagar) {
            this.alarmaActiva = false;
            this.manejarBoton();
            this.analizarMovimiento.unsubscribe();

            // this.pararSonidos();
            this.audioService.stop('derecha');
            this.audioService.stop('vertical');
            this.audioService.stop('horizontal');
            this.audioService.stop('izquierda');
            this.vibrator.vibrate(0);
            if (this.flash.isSwitchedOn()) {
              this.flash.switchOff();
            }
          } else {
            console.log('Se canceló');
            this.spinnerService.mostrarToast('Clave Incorrecta.');
          }
        });
      });
    } else {
      // Si la alarma estaba desactivada, la activa
      this.alarmaActiva = true;
      this.manejarBoton();

      this.analizarMovimiento = this.deviceMotion
        .watchAcceleration({ frequency: 50 })
        .subscribe((acceleration: DeviceMotionAccelerationData) => {
          if (acceleration.x > 8.0) {
            if (this.izquierda === true) {
              if (this.flash.isSwitchedOn() === true) {
                this.flash.switchOff();
              }
              this.vibrator.vibrate(0);
              this.izquierda = false;
              this.audioService.stop('derecha');
              this.audioService.stop('vertical');
              this.audioService.stop('horizontal');
              this.audioService.reproducirAudio('izquierda', 1);
              setTimeout(() => {
                this.izquierda = true;
              }, 2000);
            }
          } else if (acceleration.x < -8.0) {
            if (this.derecha === true) {
              if (this.flash.isSwitchedOn() === true) {
                this.flash.switchOff();
              }
              this.vibrator.vibrate(0);
              this.derecha = false;
              this.audioService.stop('izquierda');
              this.audioService.stop('vertical');
              this.audioService.stop('horizontal');
              this.audioService.reproducirAudio('derecha', 1);
              setTimeout(() => {
                this.derecha = true;
              }, 2000);
            }
          } else if (acceleration.x > -3.0 && acceleration.x < 3.0 && acceleration.y > 8.5) {
            if (this.vertical === true) {
              this.vertical = false;
              this.horizontal = false;
              this.vibrator.vibrate(0);
              this.flash.switchOn();
              this.audioService.stop('izquierda');
              this.audioService.stop('derecha');
              this.audioService.stop('horizontal');
              this.audioService.reproducirAudio('vertical', 5);
              setTimeout(() => {
                this.flash.switchOff();
                this.vertical = true;
              }, 5000);
            }
          } else if (
            acceleration.x > -3.0 &&
            acceleration.x < 3.0 &&
            acceleration.y < 1.0 &&
            acceleration.y > -1
          ) {
            if (this.horizontal === false) {
              this.horizontal = true;
              if (this.flash.isSwitchedOn() === true) {
                this.flash.switchOff();
              }
              this.audioService.stop('izquierda');
              this.audioService.stop('vertical');
              this.audioService.stop('derecha');
              this.audioService.reproducirAudio('horizontal', 5);
              this.vibrator.vibrate(5000);
              setTimeout(() => {
                this.horizontal = false;
              }, 1000);
              //this.horizontal = false;
            }
          }
        });
    }
  }

  private manejarBoton() {
    if (this.alarmaActiva) {
      this.sourceImg = '../../../assets/seguridad.png';
      this.message = 'Desactivar';
    } else {
      this.sourceImg = '../../../assets/candado-abierto.png';
      this.message = 'Activar';
    }
  }

  private mostrarPop(e: Event) {
    return this.popCtrl.create({
      component: PopoverPage,
      event: e,
      backdropDismiss: false,
    });
  }

  cerrarSesion() {
    this.authService.logOut();
  }
}
