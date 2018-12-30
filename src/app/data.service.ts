import { Injectable } from '@angular/core';
import { Car, CarId } from './car';
import { Observable, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { error } from 'util';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private carCollection: AngularFirestoreCollection<Car>;
  //public user: User;

  constructor(
      private readonly db: AngularFirestore,
      private afAuth: AngularFireAuth
      ) {

    this.carCollection = db.collection<Car>('cars');
 }



  getCars(): Observable<CarId[]> {
    //console.log("Zwracam kolekcje"); 
    return ( this.carCollection.auditTrail().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Car;
        const id = a.payload.doc.id as string;
        return { id, ...data };
      }))
    ));
  }


  isLog(): Observable<User> {
    //console.log("czy zalaogowany?");
    return this.afAuth.authState;
  }

  logOut(): Promise<void> {
    return this.afAuth.auth.signOut()
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

  cred2(email: string, password: string): Promise<string> {
    var self = this;
    return this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .catch(error => {console.log(error); return null;});
  }

}
