import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.user = new User();
  }
  async onLogin(e): Promise<any> {
    this.authService.login(this.user);
  }

  cambiarUsuario(e) {
    switch (e) {
      case 'admin':
        this.user.email = 'admin@admin.com';
        this.user.password = '111111';
        break;
      case 'tester':
        this.user.email = 'tester@tester.com';
        this.user.password = '555555';
        break;
      case 'invitado':
        this.user.email = 'invitado@invitado.com';
        this.user.password = '222222';
        break;
      case 'usuario':
        this.user.email = 'usuario@usuario.com';
        this.user.password = '333333';
        break;
      case 'anonimo':
        this.user.email = 'anonimo@anonimo.com';
        this.user.password = '444444';
        break;
    }
    this.ref.detach();
    this.ref.detectChanges();
  }
}
