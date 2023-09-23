import React, { useState } from 'react';

const BookList = ({ books, onDeleteBook }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ul>
        {currentBooks.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{' '}
            <button onClick={() => onDeleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BookList;
