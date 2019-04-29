import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {


  private isUserLoggedIn = false
  private username: string;

  @Output() onNewUser = new EventEmitter();

  constructor(private auth: AuthService,
    private router: Router) {

    auth.userSignedIn.subscribe(
      (user: User) => {
      this.username = user.name;
      this.isUserLoggedIn = true;
    })

    auth.userLogout.subscribe(
      () => {
      this.username = '';
      this.isUserLoggedIn = false;
    })

    /* auth.userSignedUp.subscribe(
      (user: User) => {
      this.username = user.name
      this.isUserLoggedIn = true;
    }) */

  }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
    if(this.isUserLoggedIn) {
      const user = this.auth.getUser();
      this.username = user.name; 
    }
  }

  newUser() {
    this.onNewUser.emit();
  }

  logout(e) {
    e.preventDefault(); //evita evento di navigazione
    this.auth.logout();
    this.router.navigate(['login']);
  }

  signIn(e) {
    e.preventDefault(); //evita evento di navigazione
    this.router.navigate(['login']);
  }

  signUp(e) {
    e.preventDefault(); //evita evento di navigazione
    this.router.navigate(['signup']);
  }
}
