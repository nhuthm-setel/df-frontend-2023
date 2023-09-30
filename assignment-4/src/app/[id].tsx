// pages/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BookDetails from '../components/BookDetails';
import { Book } from '../models/Book';

const BookDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    // Fetch book details based on the `id` parameter from localStorage
    const storedBooks = JSON.parse(localStorage.getItem('books') || '[]') as Book[];

    // Find the book with the matching ID
    const bookData = storedBooks.find((b) => b.id === parseInt(id as string, 10));

    // Check if bookData is found and set it to the 'book' state
    if (bookData) {
      setBook(bookData);
    }
  }, [id]);

  // Add a check for when the book is not found
  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <h1>Book Details</h1>
      <BookDetails book={book} />
    </div>
  );
};

export default BookDetailPage;
