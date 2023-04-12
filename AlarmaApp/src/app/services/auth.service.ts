import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLogged: any = false;
  newUser: any;
  user: User;
  aux: Subscription;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private loading: LoadingController,
    private toastController: ToastController,
    private nativeStorage: NativeStorage,
  ) {
    afAuth.authState.subscribe((user) => {
      this.isLogged = user;
      this.getUser(user?.uid).subscribe((usuario) => {
        this.user = usuario;
      });
    });
  }

  login(user: User): void {
    this.loading
      .create({
        message: 'Espere por favor',
        duration: 2000,
        spinner: 'crescent',
      })
      .then((spinner) => {
        spinner.present();
        this.afAuth
          .signInWithEmailAndPassword(user.email, user.password)
          .catch((error) => {
            spinner.onDidDismiss().then(() => {
              let errorMessage: string;
              if (error.code === 'auth/wrong-password') {
                errorMessage = 'Su contraseña es incorrecta';
                console.log('Su contraseña es incorrecta');
              } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'El formato de su email es invalido';
                console.log('El formato de su email es invalido');
              } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No existe un usuario con ese email';
                console.log('No existe un usuario con ese email');
              } else if (error.code === 'auth/argument-error') {
                errorMessage = 'Ambos campos deben estar completos';
                console.log('Ambos campos deben estar completos');
              }
              this.toastController
                .create({
                  header: 'Error',
                  message: errorMessage,
                  duration: 2000,
                  color: 'danger',
                })
                .then((toast) => {
                  toast.present();
                });
            });
          })
          .then((cred) => {
            if (cred) {
              spinner.onDidDismiss().then(() => {
                this.nativeStorage.setItem('password', user.password).then(() => {
                  this.router.navigate(['/principal']);
                });
              });
            }
          });
      });
  }

  register(user: User) {
    this.loading
      .create({
        message: 'Espere por favor',
        duration: 2000,
        spinner: 'crescent',
      })
      .then((spinner) => {
        spinner.present();
        this.afAuth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then((cred) => {
            this.newUser = user;
            console.log(cred);
            cred.user.updateProfile({
              // solo es necesario cuando se hacen register con email y pass
              displayName: user.nombre + ' ' + user.apellido,
            });
            this.insertUserData(cred).then(() => {
              spinner.onDidDismiss().then(() => {
                console.log('Usuario creado con exito');
                //this.logOut().then(() => {
                this.router.navigate(['/principal']);
                //});
              });
            });
          })
          .catch((error) => {
            spinner.onDidDismiss().then(() => {
              console.log(error);
              let errorMessage: string;
              if (error.code === 'auth/wrong-password') {
                errorMessage = 'Su contraseña es incorrecta';
                console.log('Su contraseña es incorrecta');
              } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'El formato de su email es invalido';
                console.log('El formato de su email es invalido');
              } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No existe un usuario con ese email';
                console.log('No existe un usuario con ese email');
              } else if (error.code === 'auth/argument-error') {
                errorMessage = 'Ambos campos deben estar completos';
                console.log('Ambos campos deben estar completos');
              } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'El mail ya se encuentra en uso';
                console.log('El mail ya se encuentra en uso');
              } else if ('auth/weak-password') {
                errorMessage = 'La contraseña debe tener minimo 6 caracteres';
              }
              this.toastController
                .create({
                  header: 'Error',
                  message: errorMessage,
                  duration: 2000,
                  color: 'danger',
                })
                .then((toast) => {
                  toast.present();
                });
            });
          });
      });
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.nativeStorage.remove('password').then(() => {
        this.router.navigate(['/home'], { replaceUrl: true });
      });
    });
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`ListaUsuarios/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      nombre: this.newUser.nombre,
      apellido: this.newUser.apellido,
      uid: userCredential.user.uid,
      tipoUsuario: this.newUser.tipoUsuario,
      sexo: this.newUser.sexo,
      codigo_100: '2786f4877b9091dcad7f35751bfcf5d5ea712b2f',
      codigo_50: 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172',
      codigo_10: '8c95def646b6127282ed50454b73240300dccabc',
      cargas_100: 0,
      cargas_50: 0,
      cargas_10: 0,
    });
  }

  getUser(uid: string): Observable<User> {
    return this.afs.doc<User>(`ListaUsuarios/${uid}`).valueChanges();
  }

  currentUser() {
    return this.afAuth.currentUser;
  }
}
