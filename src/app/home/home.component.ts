import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {UserService} from '../app.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage';
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private tokenStorage:TokenStorage ) {
  }
  ngOnInit(): void {


  }

  logOut():void {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }
}
