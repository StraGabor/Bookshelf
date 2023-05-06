import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/compat/firestore";
import { Observable, map } from 'rxjs';
import { DocumentReference } from '@angular/fire/firestore';
import { setDoc } from 'firebase/firestore';
import { Book } from '../modules/book/book.module';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  collectionName='Books';

  constructor(private afs: AngularFirestore) { }

  getBooks(){
    return this.afs.collection<Book>(this.collectionName).snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Book>[]) => {
        return actions.map((a: DocumentChangeAction<Book>) => {
          const data = a.payload.doc.data() as Book;
          const b = a.payload.doc.id;
          return { b, ...data };
        });
      })
    );
  }

  updateBook(book: Book){
    let id = book.id;
    return new Promise<any>((resolve,reject) =>{
      this.afs.collection(this.collectionName).doc(id).update(book)
      .then((res) => {resolve(res)}, (err) => reject(err));
    });
  }

  createBook(book: any){
    return this.afs.collection(this.collectionName).add(book);
  }

  deleteBook(book: Book){
    console.log(book.id);
    return this.afs.collection<Book>('Books').doc(book.id).delete();
  }

  getFantasy(){
    return this.afs.collection('Books', ref => ref.where("type" ,"==", "Fantasy").orderBy("price","asc"));
  }

  getHistory(){
    return this.afs.collection('Books', ref => ref.where("type" ,"==", "History").orderBy("price","asc"));
  }

}
