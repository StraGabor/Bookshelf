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

  

}
