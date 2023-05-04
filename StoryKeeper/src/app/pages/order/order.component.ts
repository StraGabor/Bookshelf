import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditbookComponent } from 'src/app/shared/editbook/editbook.component';
import { Book } from 'src/app/shared/models/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  bookList: Book[] = [];

  constructor(private bookService: BookService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.bookService.getAllBook().subscribe((books: any[]) => {
      this.bookList = books;
    });
  }

  openEditDialog(){
    this._dialog.open(EditbookComponent);
  }

  del(id: string){
    
    this.bookService.deleteBook(id);
  }

}
