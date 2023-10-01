import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookDetails from "../../components/BookDetails";
import { Book } from "../../models/Book";

const BookDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;


    const book: Book | undefined = ;
    
    const deleteBook = () => {

    };

    if (!book) {
        return <div>Book not found</div>
    }

    return (
        <div>
            <h1>Book Details</h1>
            <BookDetails book={book} deleteBook={deleteBook}/>
        </div>
    );
};

export default BookDetailPage;