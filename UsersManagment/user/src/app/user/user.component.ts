import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input('user-data') user: User;
  @Output('onDeleteUser') userDeleted = new EventEmitter();
  /* @Output() onSelectUser = new EventEmitter(); */
 // @Output() userHello = new EventEmitter;

  //showElement: boolean = false;  

  constructor(private service: UserService, private route: Router) { }//grazie a Router generiamo le rotte 

  ngOnInit() {
  
  //Mostra button hello user solo se il nome è pippo
  /* console.log(this.user.name);
    if (this.user.name == 'Pippo')
    this.showElement = true;   */
  }
  
  deleteUser() {
    console.log(this.user.lastname);
    //this.service.deleteUser(this.user);
    this.userDeleted.emit(this.user);
  }

  updateUser() {
    console.log(this.user.lastname);
    this.route.navigate(['users',this.user.id,'edit']) //navigate serve per gestire un percorso ed è un array di questo tipo: 
                                                        //[segmento su cui passare, parametro da passare (extra), altri segmenti (navigations extra)]
 //   this.onSelectUser.emit(this.user);
  }

  /* helloUser() {
    this.userHello.emit(this.user)
  } */
  showUserDetail() {
    this.route.navigate(['users',this.user.id])
  }
}
