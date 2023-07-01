import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc, increment, docData, query, where } from '@angular/fire/firestore';
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
  getDataById(parameter: any, specificId: any)
  {
    let $getDataByIdQuery = doc(this.firestore, `${parameter}/${specificId}`);
    return docData($getDataByIdQuery)as Observable<any>;
  }
  getDataAny(parameter: any, arraystring: any)
  {
    
    let $getDataQuery = collection(this.firestore,`${parameter}`);
    const q = query($getDataQuery, where('id', 'in', arraystring));
    return collectionData(q) as Observable<any[]>;
  }

  getData(parameter: any)
  {
    let $getDataQuery = collection(this.firestore,`${parameter}`);

    return collectionData($getDataQuery, {idField: 'id'}) as Observable<any[]>;
  }
  updateData(id:string, specificData:any, parameter: any)
  {
    let $updateDataQuery = doc(this.firestore,`${parameter}/${id}`);
    return updateDoc($updateDataQuery, specificData);    
  }

}
