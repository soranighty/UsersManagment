import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showForm = false; 
  title = 'user';
  userSelected: User = new User();
  
  updateUser(user: User) {
    
    this.userSelected = user;
    this.showForm = true;  
  }

  newUser() {
    this.userSelected = new User(); 
    this.showForm = true; 
  }
}
