import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { 
   auth.userSignedIn.subscribe(
      (user: User) => {
    router.navigate(['']);
    })
  }

  ngOnInit() {
  }

  signIn(form: NgForm) {
   /*  console.log(form.value.email + ',' + form.value.password) */
    if (!form.valid){
      return false;
    }
    let result= this.auth.signIn(form.value.email, form.value.password)
    console.log(result)
    
    
 /*    if(result) {
        this.router.navigate([''])
    } */
  }
}
