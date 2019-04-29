import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  public user: User;

  constructor(private route: ActivatedRoute,
    private service: UserService,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(
      (params) => {
        this.service.getUser(+params.get('id')).subscribe(
          user => {
            console.log(this.user = user['data'])
            return this.user = user['data'];//da chiedere cast???
          }
        )
      }
    )
  }

  backToUsers() {
    this.router.navigate(['users']);
  }
}
