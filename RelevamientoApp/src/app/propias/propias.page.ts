import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CamaraService } from '../services/camara.service';
import { Foto } from '../models/foto.model';
import { SpinnerService } from '../services/spinner.service';

@Component({
  selector: 'app-propias',
  templateUrl: './propias.page.html',
  styleUrls: ['./propias.page.scss'],
})
export class PropiasPage implements OnInit {
  uid: string;
  imagenes;
  constructor(
    private authService: AuthService,
    private camaraService: CamaraService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit() {
    this.spinnerService.showSpinner().then(() => {
      this.uid = this.authService.user.uid;
      this.camaraService.traerFotosPropias(this.uid).subscribe((imagenes) => {
        this.spinnerService.hideSpinner().then(() => {
          this.imagenes = imagenes;
          console.log(imagenes);
        });
      });
    });
  }
  cerrarSesion() {
    this.authService.logOut();
  }
}
