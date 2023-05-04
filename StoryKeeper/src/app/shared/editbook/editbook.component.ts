import { Component } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.scss']
})
export class EditbookComponent {

  types: string[] = [
    'History',
    'Fantasy',
    'Scifi',
    'Horror',
    'Classic'
  ]
  editForm: any;

  constructor(public bookService: BookService, private fb: FormBuilder){
    this.reset();
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
