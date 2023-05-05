import { Injectable } from '@angular/core';
import { Book } from "../models/Book";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  collectionName='Books';
editForm: any;

  constructor(private afs: AngularFirestore) { }

  getAllBook(){
    return this.afs.collection<Book>(this.collectionName).valueChanges();
  }

  updateBook(book: Book){
    return this.afs.collection<Book>(this.collectionName).doc(book.id).set(book);
  }

  createBook(book: Book){
    return this.afs.collection<Book>(this.collectionName).doc(book.id).set(book);
  }

  deleteBook(book: Book){
    return this.afs.collection<Book>(this.collectionName).doc(book.id).delete();
  }

  getFantasy(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "Fantasy").orderBy("price","asc"));
  }

  getHistory(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "History").orderBy("price","asc"));
  }

}
