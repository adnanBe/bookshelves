import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/Book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  formBook: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileIsUploaded = false;

  constructor(private bookService: BooksService,
              private formBuilder: FormBuilder,
              private route: Router) { }

  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.formBook = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSubmit() {
    const title = this.formBook.get('title').value;
    const author = this.formBook.get('author').value;
    const newBook = new Book(title, author);
    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.bookService.createNewBook(newBook);
    this.route.navigate(['/books']);
  }

  onLoadFile(file: File) {
    this.fileIsUploading = true;
    this.bookService.upLoadFile(file).then(
      (fileUrl: string) => {
        this.fileUrl = fileUrl;
        this.fileIsUploading = false;
        this.fileIsUploaded = true;
      }
    );
  }

  detectFile(event) {
    this.onLoadFile(event.target.files[0]);
  }

}
