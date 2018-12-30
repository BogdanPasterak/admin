import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService }  from '../data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<User>;
  email: string;
  password: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location  
  ) {
    this.user = this.dataService.isLog();
    //this.user.subscribe(u => console.log(u));
  }

  ngOnInit() {
    
  }

  onSubmit() {
    var self = this;
    this.dataService.cred2(this.email, this.password)
      .then(() => {
        self.user =this.dataService.isLog();
        self.router.navigate(['/cars/']);
      });
  }

  logout() {
    this.dataService.logOut()
      .then(() => {
        this.user = new Observable<User>();
        //this.user.subscribe(u => console.log('login ', u));
      });
    
    
  }

}
