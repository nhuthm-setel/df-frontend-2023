import React, { useState, useEffect } from 'react';

function BookList({ books, onDeleteBook, isDarkMode }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [books]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(books.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderBooks = currentBooks.map((book) => (
    <tr key={book.id}>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.topic}</td>
      <td>
        <button onClick={() => handleDeleteClick(book)}>Delete</button>
      </td>
    </tr>
  ));

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={currentPage === number ? 'active' : ''}
      onClick={() => setCurrentPage(number)}
    >
      {number}
    </li>
  ));

  const handleDeleteClick = (book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const confirmDelete= () => {
    onDeleteBook(bookToDelete.id);
    setShowDeleteModal(false);
  };

  return (
    <div>
      <table className={`book-table ${isDarkMode ? 'table-dark' : 'table-light'}`}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Topic</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderBooks}</tbody>
      </table>
      <ul className="page-numbers">{renderPageNumbers}</ul>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modalDeleteBook">
          <div className="modal-content-delete-book">
            <span className="close" onClick={() => setShowDeleteModal(false)}>
              &times;
            </span>
            <p>Are you sure you want to delete this book?</p>
            <button onClick={confirmDelete}>Confirm Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
