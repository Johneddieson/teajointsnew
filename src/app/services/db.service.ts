import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc, increment } from '@angular/fire/firestore';
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

  addBlog(blog: any)
  {
    let $addblog = collection(this.firestore, 'Blog')
    return addDoc($addblog, blog);
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
  getSpecificBlog(id: string)
  {
    
  }
  getBlogs()
  {
    let $blogRef = collection(this.firestore, "Blog");
    return collectionData($blogRef, {idField: "id"}) as Observable<any[]>
  }

}
