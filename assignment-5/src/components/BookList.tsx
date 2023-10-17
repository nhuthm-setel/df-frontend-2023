import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import BookEditModal from "./BookEditModal";

import { Book } from "../models/Book";

type BookListProps = {
  books: Book[];
  deleteBook: (id: number) => void;
  editBook: (book: Book) => void;
};

const BookList: React.FC<BookListProps> = ({ books, deleteBook, editBook }) => {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchBook, setSearchBook] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const openEditModal = (book: Book) => {
    setBookToEdit(book);
    setIsEditModalOpen(true);
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  }

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
    <div className="p-4 overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books"
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2 text-left border-r sm:px-6">Title</th>
            <th className="px-4 py-2 text-left border-r sm:px-6">Author</th>
            <th className="px-4 py-2 text-left border-r sm:px-6">Topic</th>
            <th className="px-4 py-2 text-center sm:px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.map((book) => (
            <tr key={book.id} className="border-b">
              <td className="px-4 py-2 border-r sm:px-6">{book.title}</td>
              <td className="px-4 py-2 border-r sm:px-6">{book.author}</td>
              <td className="px-4 py-2 border-r sm:px-6">{book.topic}</td>
              <td className="px-4 py-2 text-center sm:px-6">
                <button
                  onClick={() => {
                    deleteBook(book.id);
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mx-10"
                >
                  Delete
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mx-10"
                >
                  <Link href={`/${book.id}`}>
                    View Details
                  </Link>
                </button>
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mx-10"
                  onClick={() => {
                    openEditModal(book);
                  }}
                >
                  Edit
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
      containerClassName={"flex justify-center mt-4 sm:mt-8"} // Add sm:mt-8 for small screens
      activeClassName={"bg-blue-500 text-white rounded-full"}
      pageLinkClassName={"px-3 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 hover:text-gray-800 sm:px-4"} // Add sm:px-4 for small screens
      previousLinkClassName={"px-3 py-2 bg-gray-200 text-gray-700 rounded-full mr-2 hover:bg-gray-300 hover:text-gray-800 sm:mr-4"} // Add sm:mr-4 for small screens
      nextLinkClassName={"px-3 py-2 bg-gray-200 text-gray-700 rounded-full ml-2 hover:bg-gray-300 hover:text-gray-800 sm:ml-4"} // Add sm:ml-4 for small screens
      />
      <BookEditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={editBook}
        bookToEdit={bookToEdit}
      />
      </div>
    </div>
  );
};

export default BookList;
