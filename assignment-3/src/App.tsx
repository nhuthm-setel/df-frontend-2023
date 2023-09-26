import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import Footer from './components/Footer';

interface Book {
  id: number;
  title: string;
  author: string;
  topic: string;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Explicitly specify the type

  useEffect(() => {
    const savedBooks: Book[] = JSON.parse(localStorage.getItem('books')!) || [];
    setBooks(savedBooks);
    setFilteredBooks(savedBooks);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('books', JSON.stringify(books));
    } catch (error) {
      console.log(`Error saving book to local storage: ${JSON.stringify(books)}`);
    }
  }, [books]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const addBook = (newBook: Book) => { // Explicitly specify the type of newBook
    setBooks([...books, newBook]);
    setFilteredBooks([...books, newBook]);
  };

  const deleteBook = (id: number) => { // Explicitly specify the type of id
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const searchBook = (searchTerm: string) => { // Explicitly specify the type of searchTerm
    if (searchTerm === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header isDarkMode={isDarkMode} onToggle={toggleMode} />
      <div className="content">
        <div className="add-book-and-search">
          <SearchBar onSearch={searchBook} />
          <BookForm onAddBook={addBook} />
        </div>
        <BookList books={filteredBooks} onDeleteBook={deleteBook} isDarkMode={isDarkMode} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
