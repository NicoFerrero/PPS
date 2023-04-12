import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  idioma: string;
  topic: string;
  idiomaElegido: string;
  animales = [
    {
      nombre: 'vaca',
      imagen: '../../../assets/topics/animales/vaca.png',
      sonidoE: '../../../assets/sonidos/animales/español/vaca.mp3',
      sonidoI: '../../../assets/sonidos/animales/ingles/vaca.mp3',
      sonidoP: '../../../assets/sonidos/animales/portugues/vaca.mp3',
      size: '6',
    },
    {
      nombre: 'cerdo',
      imagen: '../../../assets/topics/animales/cerdo.png',
      sonidoE: '../../../assets/sonidos/animales/español/cerdo.mp3',
      sonidoI: '../../../assets/sonidos/animales/ingles/cerdo.mp3',
      sonidoP: '../../../assets/sonidos/animales/portugues/cerdo.mp3',
      size: '6',
    },
    {
      nombre: 'lobo',
      imagen: '../../../assets/topics/animales/lobo.png',
      sonidoE: '../../../assets/sonidos/animales/español/lobo.mp3',
      sonidoI: '../../../assets/sonidos/animales/ingles/lobo.mp3',
      sonidoP: '../../../assets/sonidos/animales/portugues/lobo.mp3',
      size: '6',
    },
    {
      nombre: 'oveja',
      imagen: '../../../assets/topics/animales/oveja.png',
      sonidoE: '../../../assets/sonidos/animales/español/oveja.mp3',
      sonidoI: '../../../assets/sonidos/animales/ingles/oveja.mp3',
      sonidoP: '../../../assets/sonidos/animales/portugues/oveja.mp3',
      size: '6',
    },
    {
      nombre: 'leon',
      imagen: '../../../assets/topics/animales/leon.png',
      sonidoE: '../../../assets/sonidos/animales/español/leon.mp3',
      sonidoI: '../../../assets/sonidos/animales/ingles/leon.mp3',
      sonidoP: '../../../assets/sonidos/animales/portugues/leon.mp3',
      size: '12',
    },
  ];
  colores = [
    {
      nombre: 'rojo',
      imagen: '../../../assets/topics/colores/rojo.png',
      sonidoE: '../../../assets/sonidos/colores/español/rojo.mp3',
      sonidoI: '../../../assets/sonidos/colores/ingles/rojo.mp3',
      sonidoP: '../../../assets/sonidos/colores/portugues/rojo.mp3',
      size: '6',
    },
    {
      nombre: 'azul',
      imagen: '../../../assets/topics/colores/azul.png',
      sonidoE: '../../../assets/sonidos/colores/español/azul.mp3',
      sonidoI: '../../../assets/sonidos/colores/ingles/azul.mp3',
      sonidoP: '../../../assets/sonidos/colores/portugues/azul.mp3',
      size: '6',
    },
    {
      nombre: 'amarillo',
      imagen: '../../../assets/topics/colores/amarillo.png',
      sonidoE: '../../../assets/sonidos/colores/español/amarillo.mp3',
      sonidoI: '../../../assets/sonidos/colores/ingles/amarillo.mp3',
      sonidoP: '../../../assets/sonidos/colores/portugues/amarillo.mp3',
      size: '6',
    },
    {
      nombre: 'verde',
      imagen: '../../../assets/topics/colores/verde.png',
      sonidoE: '../../../assets/sonidos/colores/español/verde.mp3',
      sonidoI: '../../../assets/sonidos/colores/ingles/verde.mp3',
      sonidoP: '../../../assets/sonidos/colores/portugues/verde.mp3',
      size: '6',
    },
    {
      nombre: 'naranja',
      imagen: '../../../assets/topics/colores/naranja.png',
      sonidoE: '../../../assets/sonidos/colores/español/naranja.mp3',
      sonidoI: '../../../assets/sonidos/colores/ingles/naranja.mp3',
      sonidoP: '../../../assets/sonidos/colores/portugues/naranja.mp3',
      size: '12',
    },
  ];
  numeros = [
    {
      nombre: 'uno',
      imagen: '../../../assets/topics/numeros/uno.png',
      sonidoE: '../../../assets/sonidos/numeros/español/uno.mp3',
      sonidoI: '../../../assets/sonidos/numeros/ingles/uno.mp3',
      sonidoP: '../../../assets/sonidos/numeros/portugues/uno.mp3',
      size: '6',
    },
    {
      nombre: 'dos',
      imagen: '../../../assets/topics/numeros/dos.png',
      sonidoE: '../../../assets/sonidos/numeros/español/dos.mp3',
      sonidoI: '../../../assets/sonidos/numeros/ingles/dos.mp3',
      sonidoP: '../../../assets/sonidos/numeros/portugues/dos.mp3',
      size: '6',
    },
    {
      nombre: 'tres',
      imagen: '../../../assets/topics/numeros/tres.png',
      sonidoE: '../../../assets/sonidos/numeros/español/tres.mp3',
      sonidoI: '../../../assets/sonidos/numeros/ingles/tres.mp3',
      sonidoP: '../../../assets/sonidos/numeros/portugues/tres.mp3',
      size: '6',
    },
    {
      nombre: 'cuatro',
      imagen: '../../../assets/topics/numeros/cuatro.png',
      sonidoE: '../../../assets/sonidos/numeros/español/cuatro.mp3',
      sonidoI: '../../../assets/sonidos/numeros/ingles/cuatro.mp3',
      sonidoP: '../../../assets/sonidos/numeros/portugues/cuatro.mp3',
      size: '6',
    },
    {
      nombre: 'cinco',
      imagen: '../../../assets/topics/numeros/cinco.png',
      sonidoE: '../../../assets/sonidos/numeros/español/cinco.mp3',
      sonidoI: '../../../assets/sonidos/numeros/ingles/cinco.mp3',
      sonidoP: '../../../assets/sonidos/numeros/portugues/cinco.mp3',
      size: '12',
    },
  ];
  vertical: boolean;

  constructor(
    private authService: AuthService,
    private screenOrientation: ScreenOrientation,
    private ref: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.idioma = 'español';
    this.idiomaElegido = '';
    this.topic = 'animales';
    this.vertical = this.screenOrientation.type === 'portrait-primary' ? true : false;
    this.screenOrientation.onChange().subscribe(() => {
      console.log('antes', this.screenOrientation.type);
      console.log('antes', this.vertical);
      this.vertical = !this.vertical;
      console.log('despues', this.screenOrientation.type);
      console.log('despues', this.vertical);
      this.ref.detach();
      this.ref.detectChanges();
    });
  }

  cerrarSesion() {
    this.authService.logOut();
  }

  cambiarTopic(topic: string) {
    this.topic = topic;
    this.ref.detach();
    this.ref.detectChanges();
  }

  cambiarIdioma(idioma: string) {
    this.idioma = idioma;
    this.idiomaElegido = idioma;
    this.ref.detach();
    this.ref.detectChanges();
  }

  reproducirSonido(animal) {
    const audio = new Audio();
    switch (this.idioma) {
      case 'español':
        audio.src = animal.sonidoE;
        audio.load();
        break;
      case 'portugues':
        audio.src = animal.sonidoP;
        audio.load();
        break;
      case 'ingles':
        audio.src = animal.sonidoI;
        audio.load();
        break;
      default:
        break;
    }
    audio.play();
  }
}
