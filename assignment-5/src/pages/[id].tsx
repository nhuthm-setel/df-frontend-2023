import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookDetails from "../components/BookDetails";
import storage from "../utils/storage";
import { Book } from "../models/Book";

const BookDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const storedBooks = storage.get('books');
        if (id && storedBooks) {
            const selectedBook = storedBooks.find((b: Book) => b.id === Number(id));
            if (selectedBook) {
                setBook(selectedBook || null);
            } else {
                setError('Book not found');
            }
        }
    } catch (error) {
        setError('An error occured while loading book details')
    }
        
    }, [id]);
    
    const deleteBook = () => {
        if (book) {
          try {
            // Remove the book from the list
            const updatedBooks = (storage.get('books') || []).filter((b: Book) => b.id !== book.id);
    
            // Save the updated list to localStorage
            storage.set('books', updatedBooks);
    
            // Redirect to the home page after deletion
            router.push('/');
          } catch (error) {
            setError('An error occurred while deleting the book');
          }
        }
      };

      if (error) {
        return <div>Error: {error}</div>;
      }

    if (!book) {
        return <div>Book not found</div>
    }

    return (
        <div>
            <h1>Book Details</h1>
            <BookDetails book={book} />
            <button onClick={deleteBook}>Delete Book</button>
        </div>
    );
};

export default BookDetailPage;