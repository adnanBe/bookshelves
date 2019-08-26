import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.scss']
})
export class SinglePageComponent implements OnInit {

  book: Book;

  constructor(private routeActivate: ActivatedRoute,
              private bookService: BooksService,
              private route: Router) { }

  ngOnInit() {
    this.book = new Book('', '');
    // tslint:disable-next-line:no-string-literal
    const id = this.routeActivate.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
    this.route.navigate(['/books']);
  }

}
