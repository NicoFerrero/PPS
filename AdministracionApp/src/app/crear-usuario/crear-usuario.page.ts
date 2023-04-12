import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../CustomValidators/confirm-password.validator';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  user: User;
  registroForm: FormGroup;
  submitted = false;
  foto: File;
  path: string;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private barcodeScanner: BarcodeScanner,
    private router: Router,
    private loading: LoadingController,
  ) {}

  ngOnInit() {
    this.user = new User();
    this.registroForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(10)],
        ],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        tipoUsuario: ['', Validators.required],
        sexo: ['', Validators.required],
        foto: [''],
      },
      { validators: MustMatch('password', 'confirmPassword') },
    );
    this.registroForm.reset();
  }

  prueba() {
    this.barcodeScanner
      .scan({ formats: 'PDF_417' })
      .then((barcodeData) => {
        console.log('Barcode data', barcodeData.text.split('@'));
        const data = barcodeData.text.split('@');
        if (data.length === 17) {
          this.registroForm.controls['dni'].setValue(data[1].trim());
          this.registroForm.controls['nombre'].setValue(data[5].trim());
          this.registroForm.controls['apellido'].setValue(data[4].trim());
          this.registroForm.controls['sexo'].setValue(data[8].trim());
        } else {
          this.registroForm.controls['dni'].setValue(data[4].trim());
          this.registroForm.controls['nombre'].setValue(data[2].trim());
          this.registroForm.controls['apellido'].setValue(data[1].trim());
          this.registroForm.controls['sexo'].setValue(data[3].trim());
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  }

  get f() {
    return this.registroForm.controls;
  }

  onRegister() {
    this.submitted = true;
    if (this.registroForm.invalid) {
      return;
    }
    if (this.foto !== undefined) {
      this.loading
        .create({
          message: 'Subiendo foto',
          spinner: 'circles',
          duration: 10000,
        })
        .then((spinner) => {
          spinner.present();
          console.log(this.foto);
          this.authService.tareaCloudStorage(this.path, this.foto).then((data) => {
            if (data['state'] === 'success') {
              spinner.dismiss();
              this.authService
                .referenciaCloudStorage(this.path)
                .getDownloadURL()
                .subscribe((url) => {
                  this.registroForm.controls['foto'].setValue(url);
                  this.authService.register(this.registroForm.value);
                });
            }
          });
        });
    } else {
      this.registroForm.controls['foto'].setValue('');
      this.authService.register(this.registroForm.value);
    }
  }

  cambioArchivo(event: FileList) {
    this.foto = event.item(0);
    this.path = `ListaUsuarios/${this.registroForm.value.email}`;
  }

  cerrarSesion() {
    this.authService.logOut();
  }
}
