import { Component } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.scss']
})
export class EditbookComponent {

  editForm : FormGroup;

  types: string[] = [
    'History',
    'Fantasy',
    'Scifi',
    'Horror',
    'Classic'
  ]

  constructor(private bookService: BookService,private fb: FormBuilder){
    this.editForm = this.fb.group({
      title: '',
      img: '',
      type: '',
      price: '',
      description: '',
    });
  }

  onSubmit(editForm: any){
    let data = editForm.value;

    if (editForm.value.id !== null) {
      this.bookService.updateBook(data).then(() => {
        console.log("Book updated!");
      }).catch(err => {
        console.log(err);
      });
    }else{
      this.bookService.createBook(data).then(() => {
        console.log("Book saved!");
      }).catch(err => {
        console.log(err);
      });
    }

  }

}
