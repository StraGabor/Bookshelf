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

  bookList: Book[] = [];
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

  del(b: string){
    console.log(b);
    this.bookService.deleteBook(b);
  }

  onSubmit(){
    
  }

}
