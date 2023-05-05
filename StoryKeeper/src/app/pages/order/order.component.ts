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

  editForm : any;
  bookList: Book[] = [];
  types: string[] = [
    'History',
    'Fantasy',
    'Scifi',
    'Horror',
    'Classic'
  ]
  
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books: any[]) => {
      this.bookList = books;
    });
  }

  get price(){
    return this.editForm.get('price');
  }

  del(b: string){
    console.log(b);
    this.bookService.deleteBook(b);
  }

  onSubmit(){

  }

}
