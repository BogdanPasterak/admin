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
  //car = new Car();

  id: string;
  submitted = false;

  onSubmit() { this.submitted = true; }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.car); }


  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location  
  ) { }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getCar(this.id)
      .subscribe(car => this.car = car);
  }

  goBack(): void {
    this.location.back();
  }

  Update(): void {
    console.log("Nadpisuje !");
  }
}
