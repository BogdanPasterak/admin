import { Component, OnInit } from '@angular/core';
import { Car, CarId } from '../car';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: CarId[];
  user: Observable<User>;

  constructor(private dataService: DataService) {  }

  ngOnInit() {
    if ( this.user = this.dataService.isLog() ) {
      
      this.dataService.getCars()
        .subscribe(cars => this.cars = cars);
    } else {
      console.log('zaloguj');
    }

  }

}
