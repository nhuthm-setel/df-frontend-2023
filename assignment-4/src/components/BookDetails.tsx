import React from "react";
import { Book } from "../models/Book";

const BookDetails: React.FC<{ book: Book; deleteBook: () => void }> = ({ book, deleteBook }) => {
    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Topic: {book.topic}</p>
            <button onClick={deleteBook}>Delete</button>
        </div>
    );
};

export default BookDetails;