import { Component, OnInit } from '@angular/core';
import { Car, CarId } from '../car';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: CarId[];
  user: Observable<User>;

  constructor(
    private dataService: DataService,
    private router: Router
    ) {  }

  ngOnInit() {
    var self = this;
    if ( this.user = this.dataService.isLog() ) {
      this.user.subscribe(res => {
        if (res != null)
          self.dataService.getCars()
          .subscribe(cars => this.cars = cars);
        else 
          self.router.navigate(['/login']);
      });
    } else {
      console.log('Nie ma polaczenia z baza');
    }

  }

}
