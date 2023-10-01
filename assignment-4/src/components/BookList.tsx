import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import { Book } from "../models/Book";

type BookListProps = {
  books: Book[];
  deleteBook: (id: number) => void;
};

const BookList: React.FC<BookListProps> = ({ books, deleteBook }) => {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchBook, setSearchBook] = useState('');

  const handlePaginationClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offSet = currentPage * perPage;
  const pageCount = Math.ceil(books.length / perPage);

  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchBook.toLowerCase())
  );

  const displayedBooks = filteredBooks.slice(offSet, offSet + perPage);

    return (
      <div>
        <div>
          <input 
          type="text"
          placeholder="Search books"
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          />
        </div>
        <ul>
          {displayedBooks.map((book) => (
            <li key={book.id}>
              {book.title} - {book.author} - {book.topic}
              <button onClick={() => deleteBook(book.id)}>Delete</button>
              <button>View Details</button>
            </li>
          ))}
        </ul>
        <ReactPaginate 
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePaginationClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        />
      </div>
    );
  };

export default BookList;