import { Injectable } from '@angular/core';
import { Car, CarId } from './car';
import { Observable, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private carCollection: AngularFirestoreCollection<Car>;

  constructor(private readonly db: AngularFirestore) { 
    this.carCollection = db.collection<Car>('cars');
 }

  getCars(): Observable<CarId[]> {
    console.log("Zwracam kolekcje"); 
    return ( this.carCollection.auditTrail().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Car;
        const id = a.payload.doc.id as string;
        return { id, ...data };
      }))
    ));
  }

  getCar(id: string): Observable<Car> {
    console.log("Zwracam dokument " + id); 
    return ( this.carCollection.doc<Car>(id).valueChanges() );
  }

  addCar(car: Car) {
    const id = this.db.createId();
    this.carCollection.doc(id).set(car);
  }

  updateCar(id: string, car: Car): void {
    this.carCollection.doc(id).set(car);
  }

  deleteCar(id: string): void {
    this.carCollection.doc(id).delete();
  }

  getNewId(): string {
    return this.db.createId();
  }

}
