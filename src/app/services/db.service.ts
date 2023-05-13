import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private firestore: Firestore) 
  { }

  addProduct(product: any)
  {

  }

  getProducts()
  {
    let $productsRef=collection(this.firestore,"Products");
    return collectionData($productsRef,{idField:"id"}) as Observable<any[]>;
  }
}
