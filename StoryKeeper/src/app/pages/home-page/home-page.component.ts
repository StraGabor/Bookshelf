import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/Book';
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

  async getBooks(){
    this.bookService.getAllBook().subscribe((bookList: any[]) => {
      this.books = bookList;
    });
  }

  addToCart(){
    
  }

  

}
