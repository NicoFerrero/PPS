import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: User;
  tipoUsuario: string;
  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.user = new User();
    this.user.email = '';
    this.user.password = '';
    this.tipoUsuario = '../../assets/sospechar.png';
  }
  async onLogin(e): Promise<any> {
    this.authService.login(this.user);
  }

  cambioUsuario(e) {
    console.log(e.target.value);
    switch (e.target.value) {
      case 0:
        this.tipoUsuario = '../../assets/sospechar.png';
        this.user.email = '';
        this.user.password = '';
        break;
      case 100:
        this.tipoUsuario = '../../assets/administrador.png';
        this.user.email = 'admin@admin.com';
        this.user.password = '111111';
        break;
      case 40:
        this.tipoUsuario = '../../assets/hackers.png';
        this.user.email = 'anonimo@anonimo.com';
        this.user.password = '444444';

        break;
      case 20:
        this.tipoUsuario = '../../assets/guest-post.png';
        this.user.email = 'invitado@invitado.com';
        this.user.password = '222222';
        break;
      case 60:
        this.tipoUsuario = '../../assets/programador.png';
        this.user.email = 'usuario@usuario.com';
        this.user.password = '333333';
        break;
      case 80:
        this.tipoUsuario = '../../assets/proteccion.png';
        this.user.email = 'tester@tester.com';
        this.user.password = '555555';
        break;
    }
    this.ref.detach();
    this.ref.detectChanges();
  }
}
