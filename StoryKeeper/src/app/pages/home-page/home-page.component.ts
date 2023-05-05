import { Component, OnInit, OnChanges } from '@angular/core';
import { Book } from 'src/app/shared/models/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnChanges {

  books?: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
  }

  async getBooks(){
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

  ngOnChanges(){
    
  }

}
