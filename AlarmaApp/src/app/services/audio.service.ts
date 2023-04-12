import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  constructor(private nativeAudio: NativeAudio) {}

  private preload(key: string, asset: string) {
    this.nativeAudio
      .preloadComplex(key, asset, 1, 1, 0)
      .then(() => {
        console.log(key, 'cargado con exito');
      })
      .catch((err) => {
        console.log('Error al cargar', key, 'en ruta', asset, 'error:', err);
      });
  }

  private play(key: string) {
    this.nativeAudio
      .play(key)
      .then((res) => {
        console.log('Reproduzco', key, res);
      })
      .catch((err) => {
        console.log('Error al reproducir', err, 'en', key);
      });
  }

  stop(key: string) {
    this.nativeAudio
      .stop(key)
      .then((res) => {
        console.log('Detengo', key, res);
      })
      .catch((err) => {
        console.log('Error al parar', err, 'en', key);
      });
  }

  public cargarAudios() {
    this.preload('izquierda', 'assets/alarma_iz.mp3');
    this.preload('derecha', 'assets/alarma_de.mp3');
    this.preload('vertical', 'assets/alarma_ver.mp3');
    this.preload('horizontal', 'assets/alarma_hor.mp3');
    this.preload('on', 'assets/alarma_on.mp3');
  }

  public reproducirAudio(key: string, delay: number) {
    this.play(key);
    setTimeout(() => {
      this.stop(key);
    }, delay * 1000);
  }
}
