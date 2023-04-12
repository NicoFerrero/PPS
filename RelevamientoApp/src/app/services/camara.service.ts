import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalPage } from '../componentes/modal/modal.page';
import { Router } from '@angular/router';
import { Foto } from '../models/foto.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    correctOrientation: true,
  };
  constructor(
    private camera: Camera,
    private modal: ModalController,
    private storage: AngularFireStorage,
    private toast: ToastController,
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {}
  takePhoto() {
    return this.camera
      .getPicture(this.options)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        return error;
      });
  }

  async subirFoto(fotoUrl: string, linda: boolean) {
    const modal = await this.modal.create({
      component: ModalPage,
      componentProps: {
        fotoUrl,
        linda,
      },
    });
    modal.present();
  }

  guardarFoto(foto: Foto) {
    return this.afs.collection('ListadoFotos').add(foto);
  }

  async crearToast(mensaje) {
    const toast = await this.toast.create({
      message: mensaje,
      color: 'success',
      duration: 2000,
      position: 'bottom',
    });
    return toast.present();
  }

  // Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  // Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  traerFotos(tipo) {
    const linda = tipo === 'linda' ? true : false;
    return this.afs
      .collection('ListadoFotos', (ref) => ref.where('linda', '==', linda).orderBy('fecha', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  traerFotosTodas() {
    return this.afs
      .collection('ListadoFotos', (ref) => ref.orderBy('fecha', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  traerFotosPropias(id: string) {
    return this.afs
      .collection('ListadoFotos', (ref) => ref.orderBy('fecha', 'desc').where('userId', '==', id))
      .valueChanges({ idField: 'id' });
  }

  votar(imagenId: string) {
    return this.afs.doc(`ListadoFotos/${imagenId}`).update({
      cantVotos: firebase.firestore.FieldValue.increment(1),
      votos: firebase.firestore.FieldValue.arrayUnion(this.authService.user.uid),
    });
  }
}
