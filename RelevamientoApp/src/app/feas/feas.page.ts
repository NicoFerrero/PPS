import { Component, OnInit } from '@angular/core';
import { Foto } from '../models/foto.model';
import { AuthService } from '../services/auth.service';
import { CamaraService } from '../services/camara.service';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-feas',
  templateUrl: './feas.page.html',
  styleUrls: ['./feas.page.scss'],
})
export class FeasPage implements OnInit {
  imagenes;
  uid: string;
  constructor(
    private camaraService: CamaraService,
    private authService: AuthService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    this.spinnerService.showSpinner().then(() => {
      this.uid = this.authService.user.uid;
      this.camaraService.traerFotos('fea').subscribe((imagenes) => {
        this.spinnerService.hideSpinner().then(() => {
          this.imagenes = imagenes;
          console.log(imagenes);
        });
      });
    });
  }

  tomarFoto() {
    this.camaraService.takePhoto().then((data) => {
      console.log(data);
      //this.img = `data:image/jpeg;base64,${data}`;
      this.camaraService.subirFoto(`data:image/jpeg;base64,${data}`, false);
    });
  }

  votar(imagenId) {
    this.camaraService.votar(imagenId).then(() => {
      this.camaraService.crearToast('El voto se ha sido registrado');
    });
  }
  cerrarSesion() {
    this.authService.logOut();
  }
}
