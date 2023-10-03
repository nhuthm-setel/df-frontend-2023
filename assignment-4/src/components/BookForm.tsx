import React, { useState } from "react";
import { Book } from "../models/Book";
import BookFormModal from "./BookFormModal";

const BookForm: React.FC<{ addBook: (book: Book) => void }> = ({ addBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    closeModal();
  };

  return (
    <div className="my-4 md:my-0 md:ml-4">
    <button onClick={openModal} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-5">Add Book</button>
    <BookFormModal
      isOpen={isModalOpen}
      onClose={closeModal}
      onSave={handleCreateBookSubmission}
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
