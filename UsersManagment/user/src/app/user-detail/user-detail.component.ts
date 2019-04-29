import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  private userCopy: User;
  private __user: User;

  set user(user: User) {

    console.log('sto chiamando il setUser()');
    this.__user = user;
    this.userCopy = Object.assign({}, user);
  }

  get user() {
    /*  console.log('sto chiamando il getUser()') */
    return this.__user;
  }

  constructor(private service: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {

  } //ActivatedRoute cattura tutte le informazioni relative ad una route assocciato con un componente

  ngOnInit() {

    this.user = new User(); //al caricamento del componente viene creato un nuovo utente (vuoto)

    this.route.paramMap.subscribe(

      (params) => {
        console.log(params)
        if (!params.get('id')) { //mettiamo questo controllo, in quanto la schermata serve sia per l'inserimento che per la modifica, se l'id non esiste allora non deve andare
          //a leggere nessuno utente
          return;
        }
        this.service.getUser(+params.get('id')).subscribe(
          user => this.user = user['data'])//chiedere
          console.log(this.user)
      }
    )
  }

  saveUser() {
    if (this.user.id > 0) {
      this.updateUser(this.user);
    } else {
       this.createUser(this.user);
    }
}

  createUser(user: User) {
    this.service.createUser(this.user).subscribe(response => {
      console.log(response)
        if (response['success']) {
          this.toastr.success('User ' + user.name + '' + user.lastname + ' creato correttamente');
        } else {
          this.toastr.error(response['message']);
        }
        this.router.navigate(['users']);
    });
}

updateUser(user: User) {
    this.service.updateUser(this.user).subscribe(response => {
            if (response['success']) {
              this.toastr.success('User ' + user.name + '' + user.lastname + ' modificato correttamente');
            } else {
              this.toastr.error(response['message']);
            }
            this.router.navigate(['users']);
        }
        
    );
    
}

  resetForm(form) {
    if (this.user.id === 0) {
      /*   console.log(this.user.id)
        console.log('reset then'); */
      this.user = new User();
    }
    else {
      /*  console.log('reset else'); */
      this.user = this.userCopy;
    }
  }

  backToUsers() {
    this.router.navigate(['users']);
  }
}
