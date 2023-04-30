import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(private afs: AngularFirestore) { }

  createUser (user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  getAllUser(){
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getUserById(id: string){
    return this.afs.collection<User>(this.collectionName).doc(id).valueChanges();
  }

  updateUser(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
  }

  deleteUser(id: string){
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }

}
