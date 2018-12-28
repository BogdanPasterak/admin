import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'add', redirectTo: '/car/new', pathMatch: 'full' },
  { path: 'cars', component: CarsComponent },
  { path: 'car/:id', component: CarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
