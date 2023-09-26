import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  topic: string;
}

interface BookFormProps {
  onAddBook: (newBook: Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [topic, setTopic] = useState('');
  const [showCreateBookModal, setShowCreateBookModal] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
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
      <button className="add-book-button" onClick={() => setShowCreateBookModal(true)}>
        Add Book
      </button>
      {showCreateBookModal && (
        <div className="modalCreateBook">
          <div className="modal-content-book-creation">
            <span
              className="close"
              onClick={() => setShowCreateBookModal(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                  setShowCreateBookModal(false);
                }
              }}
              role="button"
              tabIndex={0}
            >
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <h2>Add a New Book</h2>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
              />
              <input
                type="text"
                placeholder="Topic"
                value={topic}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
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