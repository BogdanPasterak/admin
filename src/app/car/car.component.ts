import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService }  from '../data.service';
import { Car } from '../car';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car: Car;
  //car = new Car();

  id: string;
  submitted = false;
  new = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location  
  ) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === 'new') {
      this.id = this.dataService.getNewId();
      this.car = {color: "", image: "", make: "", model: "", plate: "", owner: ""};
    } else {
      this.new = false;
      this.dataService.getCar(this.id)
        .subscribe(car => this.car = car);
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() { 
    this.submitted = true;
    console.log("Nadpisuje !");
    this.dataService.updateCar(this.id, this.car);
    this.router.navigate(['/cars/']);
  }

  delete() {
    console.log("Delete");
    this.dataService.deleteCar(this.id);
    this.router.navigate(['/cars/']);
  }

  reset(): void {
    console.log("Reset !");
    if (this.id === 'new') {
      this.car = {color: "", image: "", make: "", model: "", plate: "", owner: ""};
    } else {
      this.dataService.getCar(this.id)
        .subscribe(car => this.car = car);
    }
  }


}
