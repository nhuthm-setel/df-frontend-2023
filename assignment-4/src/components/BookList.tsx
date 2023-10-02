import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

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
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books"
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          className="border rounded p-2 mr-2"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Author</th>
            <th className="py-2 px-4">Topic</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.map((book) => (
            <tr key={book.id} className="border-t">
              <td className="py-2 px-4">{book.title}</td>
              <td className="py-2 px-4">{book.author}</td>
              <td className="py-2 px-4">{book.topic}</td>
              <td className="py-2 px-4">
                <Link href={`/${book.id}`}>
                  View
                </Link>
                <button
                  onClick={() => {
                    deleteBook(book.id);
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePaginationClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default BookList;
