import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, updateDoc, increment } from '@angular/fire/firestore';
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
  updateProduct(id:string,product:any)
  {
    let $productRef=doc(this.firestore,"Products/"+id);
    return updateDoc($productRef,product);
  }
}
