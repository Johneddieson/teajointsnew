import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, addDoc, collection, collectionData, doc, setDoc, updateDoc, increment, docData, query, where, deleteDoc } from '@angular/fire/firestore';
import { Observable, catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private firestore: Firestore,
    private auth: AngularFireAuth) 
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
  getDataWhereString(parameter: any, value: any)
  {
    let $getDataQuery = collection(this.firestore,`${parameter}`);
    const q = query($getDataQuery, where('Category', '==', value));
    return collectionData(q, {idField: 'id'}) as Observable<any[]>;
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
  deleteData(id:string, parameter: any)
  {
    let $productRef= doc(this.firestore,`${parameter}/${id}`);
    return deleteDoc($productRef);
  }
  signIn(params: any): Observable<any>
  {
    return from
    (
      this.auth.signInWithEmailAndPassword
      (
        params.email,
        params.password
      )
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) => 
      throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }
  signUp(params: any): Observable<any>
  {
    return from
    (
      this.auth.createUserWithEmailAndPassword
      (
        params.email,
        params.password
      )
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) => 
      throwError(() => new Error(this.translateFirebaseErrorMessageForSignUp(error)))
      )
    );
  }
  resetPassword(email: any): Observable<any>
  {
    return from
    (
      this.auth.sendPasswordResetEmail
      (
        email
      )
    ).pipe
    (
      catchError
      (
        (error: FirebaseError) => 
      throwError(() => new Error(this.translateFirebaseErrorMessageForSignUp(error)))
      )
    );
  }

  translateFirebaseErrorMessageForSignUp({code, message}: FirebaseError) {
    if (code === "auth/admin-restricted-operation") {
      return "Email is badly formatted.";
    }
    if (code === "auth/email-already-in-use") {
      return "Email already in use.";
    }
    if (code === "auth/missing-email")
    {
      return "Missing email"
    }
    if (code === "auth/missing-password")
    {
      return "Missing password"
    }
    return message;
  }

  translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    if (code === "auth/missing-email")
    {
      return "Missing email"
    }
    if (code === "auth/missing-password")
    {
      return "Missing password"
    }
    return message;
  }
  postData(parameter: any, specificData: any)
  {
    let $postDataQuery = collection(this.firestore,`${parameter}`);
    return addDoc($postDataQuery, specificData)
  }
  postDatawithID(parameter: any, specificData: any)
  {
    let $postDataQuery = doc(this.firestore,`${parameter}`);
    return setDoc($postDataQuery, specificData)
  }
}
