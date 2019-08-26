import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSupscription: Subscription;

  constructor(private booksService: BooksService,
              private route: Router) { }

  ngOnInit() {
    this.booksSupscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook() {
    this.route.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }

  onViewBook(id: number) {
    this.route.navigate(['/books', 'view', id]);
  }

  ngOnDestroy() {
    this.booksSupscription.unsubscribe();
  }
}
