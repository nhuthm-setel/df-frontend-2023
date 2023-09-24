import React, { useState, useEffect } from 'react';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar'; // Import the SearchBar component
import ToggleDarkAndLightModeSwitch from './components/ToggleDarkAndLightModeSwitch';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
    setFilteredBooks(savedBooks);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('books', JSON.stringify(books)); 
    } catch (error) {
      console.log("Error saving book to local storage: " + books) 
    }
  }, [books]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
    setFilteredBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    setFilteredBooks(updatedBooks);
  };

  const searchBook = (searchTerm) => {
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
      <h1>Book Management</h1>
      <ToggleDarkAndLightModeSwitch isDarkMode={isDarkMode} onToggle={toggleMode}/>
      <div className="add-book-and-search">
      <SearchBar onSearch={searchBook} />
      <BookForm onAddBook={addBook} />
      </div>
      <BookList books={filteredBooks} onDeleteBook={deleteBook} />
    </div>
  );
}

export default App;
