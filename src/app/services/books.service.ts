import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.database().ref('/books')
    .on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        });

      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(book: Book) {
    if ( book.photo ) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Fichier supprimé');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé');
        }
      );
    }
    const bookIndexToMove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );

    this.books.splice(bookIndexToMove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  upLoadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueFileName = Date.now() + file.name;
        const upLoad = firebase.storage().ref()
        .child('images' + uniqueFileName + File.name)
        .put(file);
        upLoad.on(firebase.storage.TaskEvent.STATE_CHANGED, 
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log(error);
            reject();
          },
          () => {
            resolve(upLoad.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
