import { Component, OnInit } from '@angular/core';
import { Car, CarId } from '../car';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  cars: CarId[];

  constructor(private dataService: DataService) {  }

  ngOnInit() {
    this.dataService.getCars()
      .subscribe(cars => this.cars = cars);
  }

}
