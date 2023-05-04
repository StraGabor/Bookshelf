import { Injectable } from '@angular/core';
import { Book } from "../models/Book";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  collectionName='Books';

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
  }

  getFantasy(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "Fantasy").orderBy("price","asc"));
  }

  getHistory(){
    return this.afs.collection('book', ref => ref.where("type" ,"==", "History").orderBy("price","asc"));
  }

}
