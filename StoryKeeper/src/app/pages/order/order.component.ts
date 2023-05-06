import { Component, OnInit } from '@angular/core';
import { Book } from "../../shared/modules/book/book.module";
import { BookService } from '../../shared/services/book.service';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  bookList?: Book[];
  
  editForm = new FormGroup({
    title: new FormControl('',Validators.required),
    price: new FormControl(0,Validators.required),
    img: new FormControl('',Validators.required),
    type:new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  });

  types: string[] = [
    'Thriller',
    'History',
    'Fantasy',
    'Scifi',
    'Horror',
    'Classic'
  ]

  constructor(
    private bookService: BookService,
    private fb:FormBuilder,
    private fs: Firestore) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: any[]) => {
      this.bookList = books;
    });
  }

  deleteBook(d: Book){
    console.log(d.id);
    this.bookService.deleteBook(d);
  }

  create(){
    let newBook = {
      'title': this.editForm.value.title as string,
      'price': this.editForm.value.price as number,
      'img' : this.editForm.value.img as string,
      'type' : this.editForm.value.type as string,
      'desctiption' : this.editForm.value.description as string
    };
    this.bookService.createBook(newBook)
    .then(() => console.log("New Book created!"))
    .catch(err => {console.log(err)});
  }

  update(book: Book){
    this.bookService.updateBook(book)
    .then(() => console.log("Book updated!"))
    .catch(err => console.log(err));
  }

}
