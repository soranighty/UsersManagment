import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];
  private url = 'http://localhost:8000/users' //path 

  constructor( private http: HttpClient, private auth: AuthService) {

  }
/* 
  helloUser(user) {
    console.log('ciao '+ user.name)
  } */
  getHeader(): HttpHeaders {

    let headers = new HttpHeaders (
      {
        Authorization : 'Bearer' +this.auth.getToken() 
      }
    )
    return headers;
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url, {
      headers: this.getHeader()
    });
  }

  getUser(id: number): Observable<User>{
    const userUrl= `${this.url}/${id}` ;
    return this.http.get<User>(userUrl, {
      headers: this.getHeader()
    });
  
  /*   return this.users.find(userToFind  => userToFind.id === id) */
  
  /* return this.users.find((userDaCercare) => {
    if (userDaCercare.id == id){
      return true; }
      else {
        return false;} */
  }
   
  createUser (user: User): Observable<User> {
    return this.http.post<User>(this.url, user, {
      headers: this.getHeader()
    })
  }

  deleteUser(user: User):  Observable<User>  {
    const data = {_method: 'DELETE'}; //simulazione dell'evento delete, in quanto non viene eseguito direttamente da laravel 
   return  this.http.post<User>(this.url + '/' + user.id, data, {
    headers: this.getHeader()
  }); 

   /*  let index = this.users.indexOf(user);
    if(index >= 0) {
      this.users.splice(index, 1)
    } */
  }

  updateUser(user: User): Observable<User>  { 
    /*  Aggiungiamo alla request anche questo metodo, 
                            in quanto laravel non supporta il metodo put e quindi 
                            nella chiamata va simulato il metodo put */
   user['_method'] = 'PUT'; //simulazione dell'evento put
   return  this.http.post<User>(this.url + '/' + user.id , user, {
    headers: this.getHeader()
  });
       /* const index = this.users.findIndex((v) => v.id == user.id)
    {
    console.log(index); 
    if (index !== -1) {
      this.users[index] = user; 
    }
  } */
}
/* changeName(name: string) {
 console.log(name);
 this.users.map(user => {
   user.name = name;
 })
} */
}