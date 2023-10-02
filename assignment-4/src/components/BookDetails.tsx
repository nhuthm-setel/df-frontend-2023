import React from "react";
import { Book } from "../models/Book";

const BookDetails: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Topic: {book.topic}</p>
        </div>
    );
};

export default BookDetails;