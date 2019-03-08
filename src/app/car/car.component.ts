import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService }  from '../data.service';
import { Car } from '../car';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car: Car;
  id: string;
  submitted = false;
  new = true;

  user: Observable<User>;

  modalRef: BsModalRef;
  message: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location,
    private modalService: BsModalService
  ) { }


  ngOnInit() {
    var self = this;
    if ( this.user = this.dataService.isLog() ) {
      this.user.subscribe(res => {
        if (res != null) {
          
          self.id = self.route.snapshot.paramMap.get('id');
          if (self.id === 'new') {
            self.id = self.dataService.getNewId();
            self.car = {color: "", image: "", make: "", model: "", plate: "", owner: ""};
          } else {
            self.new = false;
            self.dataService.getCar(self.id)
              .subscribe(car => self.car = car);
          }
      
        } else 
          self.router.navigate(['/login']);
      });
    } else {
      console.log('Nie ma polaczenia z baza');
    }
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
    console.log("Delete");
    this.dataService.deleteCar(this.id);
    this.router.navigate(['/cars/']);

  }
 
  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
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
    // this.dataService.deleteCar(this.id);
    // this.router.navigate(['/cars/']);
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
