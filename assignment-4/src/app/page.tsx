"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import BookList from '../components/BookList'
import BookForm from '../components/BookForm'

import { Book } from '../models/Book'

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);

    const addBook = (book: Book) => {
        const updatedBooks = [...books, book];
        setBooks(updatedBooks);
    }

  return (
    <div>
        <h1>Bookstore Management</h1>
        <BookForm addBook={addBook}></BookForm>
        <BookList books={books}></BookList>
    </div>
  )
}
