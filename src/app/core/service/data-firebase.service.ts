import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFirebaseService {
  constructor(private _firestore: Firestore) {}

  sendData(clientData: any): Observable<string> {
    const collectionRef = collection(this._firestore, 'wanafs');

    return from(addDoc(collectionRef, clientData)).pipe(
      map((docRef) => docRef.id)
    );
  }
}
