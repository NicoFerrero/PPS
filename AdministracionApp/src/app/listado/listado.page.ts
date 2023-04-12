import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  users: Array<User>;
  currentUser: User;
  subs: Subscription = new Subscription();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = null;
    this.authService.currentUser().then((rawUser) => {
      console.log(rawUser);
      this.subs.add(
        this.authService.getUser(rawUser?.uid).subscribe((user: User) => {
          console.log(user);
          this.currentUser = user;
          this.subs.add(
            this.authService.getUsers().subscribe((users: Array<User>) => {
              // setTimeout(() => {
              //   this.users = users;
              // }, 2000);
              this.users = users;
            }),
          );
        }),
      );
    });
  }

  cerrarSesion() {
    this.authService.logOut();
  }
}
