import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private currentLoading: HTMLIonLoadingElement; // This is the spinner
  private isSpinnerShowing = false;
  private timer = -1; // This is the timer, it will go from 2000 to -1
  private timerID = null;

  constructor(private loadingController: LoadingController, private toastCtrl: ToastController) {
    // console.log('Inicializo el spinner');
    //this.createSpinner();
  }

  async createSpinner() {
    this.currentLoading = await this.loadingController.create({
      message: 'Cargando la informacion',
      spinner: 'dots',
    } as LoadingOptions);
  }

  public async showSpinner() {
    // console.log('Muestro el spinner', this._currentLoading);
    this.currentLoading.present();
    this.isSpinnerShowing = this.startTimer();
  }

  private startTimer() {
    // console.log('Inicializo el conteo');
    this.timer = 2000;

    this.timerID = setInterval(() => {
      this.timer = this.timer - 1;

      if (this.timer < 0) {
        // console.log('El conteo se acabó.');
        clearInterval(this.timerID);
      }
    }, 1);

    return true;
  }

  public async hideSpinner() {
    // console.log('Intento ocultar el spinner con el timer en', this._timer);

    if (this.isSpinnerShowing) {
      if (this.timer < 0) {
        // console.log('El tiempo acabó y oculto el spinner');
        this.isSpinnerShowing = this.stopAndReplaceSpinner();
      } else {
        // console.log('El tiempo NO acabó y hago un timeout para acabarlo en', this._timer);
        clearInterval(this.timerID);
        setTimeout(() => {
          this.hideSpinner();
        }, this.timer);
      }

      this.timer = -1;
    }
  }

   stopAndReplaceSpinner() {
    this.currentLoading.dismiss();
    this.createSpinner();
    return false;
  }

  public mostrarToast(message) {
    this.toastCtrl
      .create({
        color: 'danger',
        duration: 5000,
        message,
        position: 'bottom',
      })
      .then((t: HTMLIonToastElement) => {
        t.present();
      });
  }
}
