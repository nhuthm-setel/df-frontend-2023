import React from "react";
import { Book } from "../models/Book";

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
    return (
      <div>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} - {book.author} - {book.topic}
              <button>Delete</button>
              <button>View Details</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default BookList;