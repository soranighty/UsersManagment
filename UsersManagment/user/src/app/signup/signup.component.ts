import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {

    auth.userSignedUp.subscribe(() => {
    router.navigate(['']); 
  })
  }

  ngOnInit() {
  }

  signUp(form: NgForm) {
    /* console.log(form.value.email)
    console.log(form.value.password)
    console.log(form.value.name)
    console.log(form.valid) */

    this.auth.signUp(form.value.name, form.value.email, form.value.password);

  }
}
