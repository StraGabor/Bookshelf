export class Book{

    id: string;
    price: number;
    title: string;
    img: string;
    type: string;
    description: string;

  constructor(Book: Book){
    this.id = Book.id;
    this.price = Book.price;
    this.title = Book.title;
    this.img = Book.img;
    this.type = Book.type;
    this.description = Book.description;
  }

}

