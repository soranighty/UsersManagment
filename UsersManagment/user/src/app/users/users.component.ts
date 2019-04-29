import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit { //onInit in realtà è un interfaccia, ed essendo un interfaccia deve implmentarne tutti i metodi 

  title = 'Users';
  users: User[] = []; //proprietà di tipo array
  /*  public nameToChange: string; */
  //@Output() updateUser = new EventEmitter<User>();

  @Output() changeName = new EventEmitter();

  constructor(private service: UserService,
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit() {

    this.service.getUsers().subscribe(user => this.users = user['data'])
  }

  onDeleteUser(user) {
    const deleteUser = confirm('Do you really want to delete the selected User? ');
    if (deleteUser) {
      this.service.deleteUser(user).subscribe(response => {
        const index = this.users.indexOf(user);
        this.users.splice(index, 1);
        this.toastr.success(response['message'])
      }
      )
    }
  }

  onSelectUser(user: User) {
    console.log(user.lastname);
    const userCopy = Object.assign({}, user) //assign è un metodo che permette di copiare i valori presenti in un oggetto all'interno di un altro 
    //({}, user) inserisce nel oggetto a sinistra (oggetto vuoto), i valori presenti a destra 
    // this.updateUser.emit(userCopy);
  }

  /* onHelloUser(user) {
    this.service.helloUser(user);
      } */
  /*   onChangeName() {
        
    console.log(this.nameToChange)
       this.service.changeName(this.nameToChange);
       
      } */
}
