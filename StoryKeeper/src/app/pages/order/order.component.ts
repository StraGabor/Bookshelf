import { Component, OnInit } from '@angular/core';
import { DocumentReference, doc, getDoc } from 'firebase/firestore';
import { Book } from 'src/app/shared/models/Book';
import { BookService } from 'src/app/shared/services/book.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  bookList: Book[] = [];
  docRef: DocumentReference | undefined;
  lastBook: Book | undefined;

  types: string[] = [
    'History',
    'Fantasy',
    'Scifi',
    'Horror',
    'Classic'
  ]
  editForm: any;

  constructor(private afs: AngularFirestore, private bookService: BookService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookService.getAllBook().subscribe((books: any[]) => {
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

  clickedRow: any;
  async getGame(book: Book){
    this.docRef = doc(this.afs.firestore,"Books", book.id);
    const docSnap = await getDoc(this.docRef);
    this.lastBook = book;
    
  }

  del(book: any){
    this.bookService.deleteBook(book).then(
      () => console.log("Game deleted!")
    ).catch(
      err => console.log(err)
    )
  }

  reset(editForm? : NgForm){
    this.editForm = this.fb.group({
      title: '',
      img: '',
      type: '',
      price: '',
      description: '',
    });
  }

  onSubmit(editForm: any){
    let book = editForm.value;

    if (editForm.value.id !== "") {
      this.bookService.updateBook(book).then(() => {
        console.log("Book updated!");
        this.reset();
      }).catch(err => {
        console.log(err);
      });
    }else{
      this.bookService.createBook(book).then(() => {
        console.log("Book saved!");
        this.reset();
      }).catch(err => {
        console.log(err);
      });
    }

  }

}
