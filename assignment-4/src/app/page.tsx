"use client";

import React, { useState, useEffect } from 'react'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'
import storage from '../utils/storage';

import { Book } from '../models/Book'

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
      const storedBooks = storage.get('books');
      if (storedBooks) {
        setBooks(storedBooks);
      };
    }, []);

    const addBook = (book: Book) => {
        const updatedBooks = [...books, book];
        setBooks(updatedBooks);
        storage.set('books', updatedBooks);
    };

    const deleteBook = (id: number) => {
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      storage.set('books', updatedBooks);
    };

  return (
    <div>
        <h1>Bookstore Management</h1>
        <BookForm addBook={addBook} />
        <BookList books={books} deleteBook={deleteBook} />
    </div>
  )
}
