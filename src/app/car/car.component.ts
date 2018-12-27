import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService }  from '../data.service';
import { Car } from '../car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car: Car;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location  
  ) { }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getCar(id)
      .subscribe(car => this.car = car);
  }

  goBack(): void {
    this.location.back();
  }
}
