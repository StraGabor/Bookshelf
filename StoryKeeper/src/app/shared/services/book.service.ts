import { Injectable } from '@angular/core';
import { Book } from "../models/Book";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  collectionName='Books';

  constructor(private afs: AngularFirestore) { }

  getBooks(): Observable<DocumentChangeAction<unknown>[]>{
    return this.afs.collection(this.collectionName).snapshotChanges();
  }

  updateBook(docRef: DocumentReference, book: Book){
    setDoc(docRef, book).then(
      () => console.log("Book updated")
    ).catch(
      () => console.log("Book update failed!")
    )
  }

  createBook(data: Book){
    this.afs.collection(this.collectionName).add(data).then(
      () => console.log("Book created!")
    ).catch(
      () => console.log("Book creation failed!")
    )
  }

<<<<<<< HEAD
  deleteBook(book: Book){
    return this.afs.collection<Book>(this.collectionName).doc(book.id).delete();
=======
  deleteBookById(id: string){
    const docRef = this.afs.collection(this.collectionName).doc(id);
    docRef.get().toPromise().then(doc => {
      if(doc?.exists){
        docRef.delete();
        console.log(id+"has been deleted");
      }else{
        console.log("no delete");
      }
    }).catch(err => {
      console.log(err);
    });
>>>>>>> parent of b095190 (userGuard)
  }

  getFantasy(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "Fantasy").orderBy("price","asc"));
  }

  getHistory(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "History").orderBy("price","asc"));
  }

}
