import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/modules/book/book.module';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  books?: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBooks().subscribe((bookList: any[]) => {
      this.books = bookList;
    });
  }

  addToCart(){
    
  }

  onFantasy(){
    let bookList = this.bookService.getFantasy();
    this.books = bookList as unknown as Book[];
  }

  onHistory(){
    let bookList = this.bookService.getHistory();
    this.books = bookList as unknown as Book[];
  }


}
