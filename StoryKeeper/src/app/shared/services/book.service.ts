import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { Book } from '../modules/book/book.module';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  collectionName='Books';

  constructor(private afs: AngularFirestore) { }

  getBooks(order: string, direction: "asc" | "desc"){
    return this.afs.collection('Books', ref => ref.orderBy(order, direction)).snapshotChanges();
  }

  updateBook(docRef: DocumentReference, book: Book){
    setDoc(docRef, book).then(
      () => console.log("Book updated")
    ).catch(
      () => console.log("Book update failed!")
    )
  }

  createBook(book: any){
    return this.afs.collection(this.collectionName).add(book);
  }

  deleteBook(book: Book){
    return new Promise<any>((resolve,reject) => {
      this.afs.collection(this.collectionName).doc(book.id).delete().then(
        res => {resolve(res)},err => {reject(err)});
    });
  }

  getFantasy(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "Fantasy").orderBy("price","asc"));
  }

  getHistory(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "History").orderBy("price","asc"));
  }

}
