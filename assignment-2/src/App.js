import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar'; // Import the SearchBar component

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books

  useEffect(() => {
    // Load books from localStorage on initial render
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
    setFilteredBooks(savedBooks); // Initialize filtered books with all books
  }, []);

  useEffect(() => {
    // Save books to localStorage whenever the 'books' state changes
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
    setFilteredBooks([...books, newBook]); // Update filtered books when adding a new book
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks); // Update filtered books when deleting a book
  };

  const searchBook = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredBooks(books); // If the search input is empty, show all books
    } else {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered); // Update filtered books based on search input
    }
  };

  return (
    <div className="App">
      <h1>Book Management</h1>
      <BookForm onAddBook={addBook} />
      <SearchBar onSearch={searchBook} /> {/* Add the SearchBar component */}
      <BookList books={filteredBooks} onDeleteBook={deleteBook} /> {/* Use filteredBooks */}
    </div>
  );
}

export default App;
