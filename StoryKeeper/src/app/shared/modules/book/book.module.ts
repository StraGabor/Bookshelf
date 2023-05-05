export class Book{

    id: string;
    price: number;
    title: string;
    img: string;
    type: string;
    description: string;

  constructor(book: Book){
    this.id = book.id;
    this.price = book.price;
    this.title = book.title;
    this.img = book.img;
    this.type = book.type;
    this.description = book.description;
  }
}
