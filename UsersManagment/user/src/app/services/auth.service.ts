import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

interface Jwt {
  access_token: string,
  token_type: string,
  expires_in: number,
  user_name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8000/api/auth/' //path 
  private isUserLogged = false;


  @Output() userSignedIn = new EventEmitter<User>();
  @Output() userLogout = new EventEmitter();
  @Output() userSignedUp = new EventEmitter<User>();

  constructor(private http: HttpClient) { }

  isUserLoggedIn() {

    this.isUserLogged = !!localStorage.getItem('token');

    return this.isUserLogged;
  }

  signIn(email: string, password: string) {
    
    this.http.post(this.url + 'login',
 
      { //payload
        
        email: email,
        password: password
      }).subscribe(

        //success
        (payload: Jwt) => { 

          localStorage.setItem('token', payload.access_token);
          console.log(payload);
          localStorage.setItem('user', JSON.stringify(payload));
          let user = new User();
          user.name = payload.user_name;
          user.email = payload.email;
          this.userSignedIn.emit(user);
          console.log(user)
          return true;

          //error
        }, (httpResp: HttpHeaderResponse) => {
          alert(httpResp.statusText)
        }
      )
  }

  signUp(name: string, email: string, password: string) {
    
    const user = new User();
    user.name = name;
    user.email = 'email';
   
    this.http.post(this.url + 'signup',
 
    { //payload
      email: email,
      password: password,
      name: name
    }).subscribe(

      //success
      (payload: Jwt) => { 

        localStorage.setItem('token', payload.access_token);
        console.log(payload);
        localStorage.setItem('user', JSON.stringify(payload));
  
        this.userSignedUp.emit(user);
        console.log(user)
      
        //error
      }, (httpResp: HttpHeaderResponse) => {
        alert(httpResp.statusText)
      }
    )


  }

  logout() {

    this.userLogout.emit();
    localStorage.removeItem('token') //da chiedere
    this.isUserLogged = false;
  }

  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user')); //prende uno users dalla local storage e lo converte in un oggetto tramite il metodo JSON.parse
    let user = new User();
    if (data) {
      user.name = data['user_name']; //quello che viene ritornato dal server
      user.email = data['email'];
    }
   return user;
  }
  
  getToken() {
    return localStorage.getItem('token'); 
  }
}
