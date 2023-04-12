import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CamaraService } from '../../services/camara.service';
import { AuthService } from '../../services/auth.service';
import { Foto } from '../../models/foto.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() fotoUrl: string;
  @Input() linda: boolean;
  porcentaje: number;
  imagen: Blob;
  constructor(
    private modal: ModalController,
    private camaraService: CamaraService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.porcentaje = 0;
  }

  subir(seSube) {
    let seSubio = false;
    fetch(this.fotoUrl)
      .then((res) => res.blob())
      .then((foto) => {
        this.imagen = foto;
        if (seSube) {
          const fileName = `fotosEdificio/${this.authService.user.nombre}_${
            this.authService.user.apellido
          }_${new Date()}`;
          this.camaraService
            .tareaCloudStorage(fileName, this.imagen)
            .percentageChanges()
            .subscribe(async (porcentaje) => {
              this.porcentaje = Math.round(porcentaje);
              if (this.porcentaje === 100) {
                await this.camaraService.crearToast('La imagen se subio con exito').then(() => {
                  this.camaraService
                    .referenciaCloudStorage(fileName)
                    .getDownloadURL()
                    .subscribe((url) => {
                      console.log(url);

                      const fotoBD: Foto = {
                        fotoUrl: url,
                        fecha: new Date(),
                        linda: this.linda,
                        votos: [],
                        cantVotos: 0,
                        userId: this.authService.user.uid,
                        nombreCompleto:
                          this.authService.user.nombre + ' ' + this.authService.user.apellido,
                      };
                      this.camaraService.guardarFoto(fotoBD).then((data) => {
                        console.log(data);
                        seSubio = true;
                        this.modal.dismiss({
                          seSubio,
                        });
                      });
                    });
                });
              }
            });
        } else {
          this.modal.dismiss({
            seSubio,
          });
        }
      });
  }
}
