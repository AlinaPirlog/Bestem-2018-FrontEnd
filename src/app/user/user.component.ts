import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from './user.model';
import {UserService} from '../app.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage';
@Component({
  selector: 'app-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private tokenStorage:TokenStorage ) {
  }
  ngOnInit(): void {


  }

  logOut():void {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }
}
