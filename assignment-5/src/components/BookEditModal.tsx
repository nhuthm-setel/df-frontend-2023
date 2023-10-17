import React, { useEffect, useState } from "react";
import { Book } from "../models/Book";

type BookEditModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (book: Book) => void;
    bookToEdit: Book | null;
};

const BookEditModal: React.FC<BookEditModalProps> = ({
    isOpen,
    onClose,
    onSave,
    bookToEdit,
}) => {
    const modalStyles: React.CSSProperties = {
        display: isOpen ? "block" : "none", // Control visibility based on isOpen
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "4px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      };

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [topic, setTopic] = useState("");

    useEffect(() => {
        if (isOpen && bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setTopic(bookToEdit.topic);
        } else {
            setTitle("");
            setAuthor("");
            setTopic("");
        }
    }, [isOpen, bookToEdit]);

    const handleEditBookSubmission = () => {
        if (bookToEdit) {
            const updatedBook: Book = {
                id: bookToEdit.id,
                title,
                author,
                topic,
            };

            onSave(updatedBook);
            onClose();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        switch (name) {
          case "title":
            setTitle(value);
            break;
          case "author":
            setAuthor(value);
            break;
          case "topic":
            setTopic(value);
            break;
          default:
            break;
        }
      };

    return (
        <div style={modalStyles}>
        <div>
          <h2 className="text-lg font-semibold mb-4">Edit Book</h2>
          <form onSubmit={handleEditBookSubmission}>
            {/* Form input fields */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={author}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
               <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={topic}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />
            </div>
            {/* Add more form fields here */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default BookEditModal;