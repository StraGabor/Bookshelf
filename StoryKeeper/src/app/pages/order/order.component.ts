import { Component, OnInit, ViewChild } from '@angular/core';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';
import { Book } from 'src/app/shared/models/Book';
import { BookService } from 'src/app/shared/services/book.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @ViewChild('selectType')selectType: MatSelect;
  bookList: Book[] = [];
  docRef: DocumentReference;
  lastBook: Book;
  modify: boolean;

  types: string[] = [
    'History',
    'Fantasy',
    'Scifi',
    'Horror',
    'Classic'
  ]
  
  constructor(private afs: AngularFirestore, private bookService: BookService, private fb: FormBuilder) { }

  editForm = new FormGroup({
    price: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
    type: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: any[]) => {
      this.bookList = books.map(i =>{
        const data = i.payload.doc.data() as Book;
        return {
          id: i.payload.doc.id,
          price: data.price,
          title: data.title,
          img: data.img,
          type: data.type,
          description: data.description
        } as unknown as Book;
      });
    });
  }

  get price(){
    return this.editForm.get('price');
  }

<<<<<<< HEAD
  get title(){
    return this.editForm.get('title');
  }

  get img(){
    return this.editForm.get('img');
  }

  get type(){
    return this.editForm.get('type');
  }

  get description(){
    return this.editForm.get('description');
  }

  clickedRow: any;
  async getGame(book: Book){
    this.docRef = doc(this.afs.firestore,"Books", book.id);
    const docSnap = await getDoc(this.docRef);
    this.lastBook = book;
  }

  onSubmit(){
    if (!this.editForm.valid) {
      alert('Not valid!')
      return;
    }

    let data ={
      'price': this.editForm.value.price as string,
      'title' : this.editForm.value.title as string,
      'img' : this.editForm.value.img as string,
      'type' : this.selectType?.value,
      'description' : this.editForm.value.description as string
    }

    if (!this.modify) {
      this.bookService.createBook(data);
    }else{
      this.bookService.updateBook(this.docRef, data);
      this.modify = false;
    }
  }

  async getBook(book: Book){
    this.modify = true;
    this.docRef = doc(this.afs.firestore, "book", book.id);
    const docSnap = await getDoc(this.docRef);
    this.lastBook = book;
    
    this.editForm = new FormGroup({
    price: new FormControl('',[Validators.required]),
    title: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
    type: new FormControl(''),
    description: new FormControl('')
    })
    this.clickedRow = book;
  }

  async deleteBook(book: Book){
    this.bookService.deleteBook(book);
  }

  reset(){
    this.modify = false;
    this.editForm = new FormGroup({
      price: new FormControl('',[Validators.required]),
      title: new FormControl('',[Validators.required]),
      img: new FormControl('',[Validators.required]),
      type: new FormControl(''),
      description: new FormControl('')
    });
=======
  del(b: string){
    console.log(b);
    this.bookService.deleteBookById(b);
>>>>>>> parent of b095190 (userGuard)
  }

}
