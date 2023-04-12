import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { SpinnerService } from '../services/spinner.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    private popCtrl: PopoverController,
    private formBuilder: FormBuilder,
    private spinnerService: SpinnerService,
    private nativeStorage: NativeStorage,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      clave: ['', [Validators.required]],
    });
  }

  public async manejarRetorno(hayClave: boolean) {
    let apagar = false;
    if (hayClave) {
      // console.log('Reviso el firebase para ver si es correcto:', this.formGroup.value);
      this.spinnerService.showSpinner();
      this.nativeStorage.getItem('password').then((data) => {
        console.log(data);
        console.log(this.formGroup.value.clave);
        if (data === this.formGroup.value.clave) {
          apagar = true;
          this.spinnerService.hideSpinner();
          this.popCtrl.dismiss({
            apagar,
          });
        } else {
          this.spinnerService.hideSpinner();
          this.popCtrl.dismiss({
            apagar,
          });
        }
      });
      /*await this.authServ.verificarPassword().then((r: User | boolean) => {
        if (r !== false) {
          if ((r as User).password === this.formGroup.value.clave) {
            apagar = true;
          }
        }
      });*/
    } else {
      // console.log('Cancelo');
      this.popCtrl.dismiss({
        apagar,
      });
    }
  }
}
