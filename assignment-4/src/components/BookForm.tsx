import React, { useState } from "react";
import { Book } from "../models/Book";
import BookFormModal from "./BookFormModal"; // Import the modal component

const BookForm: React.FC<{ addBook: (book: Book) => void }> = ({ addBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [topic, setTopic] = useState("");

  const handleCreateBookSubmission = () => {
    const newBook: Book = {
      id: Date.now(),
      title,
      author,
      topic,
    };

    addBook(newBook);

    setTitle("");
    setAuthor("");
    setTopic("");
    closeModal(); // Close the modal after adding the book
  };

  return (
    <div>
    <h2>Add Book</h2>
    <button onClick={openModal}>Add Book</button>
    <BookFormModal
      isOpen={isModalOpen} // Pass isOpen to the modal
      onClose={closeModal} // Pass the closeModal function
      onSave={handleCreateBookSubmission} // Pass your onSave function
      title={title}
      setTitle={setTitle}
      author={author}
      setAuthor={setAuthor}
      topic={topic}
      setTopic={setTopic}
    />
  </div>
  );
};

export default BookForm;
