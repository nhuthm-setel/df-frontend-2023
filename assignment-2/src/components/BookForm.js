import React, { useState } from 'react';

const BookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('');
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      id: Date.now(),
      title,
      author,
      topic,
    };
    onAddBook(newBook);
    setTitle('');
    setAuthor('');
    setTopic('');
    setShowCreateBookModal(false);
  };

  return (
    <div>
      <button className="add-book-button" onClick={() => setShowCreateBookModal(true)}>Add Book</button>
      {showCreateBookModal && (
        <div className="modalCreateBook">
          <div className="modal-content-book-creation">
            <span className="close" onClick={() => setShowCreateBookModal(false)}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <button type="submit">Add Book</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;