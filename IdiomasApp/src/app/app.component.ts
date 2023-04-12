import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  show = true;
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      SplashScreen.hide();
      const audio1 = new Audio('../assets/sonidos/bienvenido_es.mp3');
      const audio2 = new Audio('../assets/sonidos/bienvenido_in.mp3');
      const audio3 = new Audio('../assets/sonidos/bienvenido_po.mp3');

      this.play(audio1)
        .then(() => {
          return this.play(audio2);
        })
        .then(() => {
          return this.play(audio3);
        });
      setTimeout(() => {
        this.show = false;
      }, 5000);
    });
  }

  play(audio) {
    audio.play();
    return new Promise((resolve, reject) => {
      audio.addEventListener('ended', resolve);
    });
  }
}
