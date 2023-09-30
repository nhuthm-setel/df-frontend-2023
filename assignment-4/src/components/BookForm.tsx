import React, { useState } from "react";
import { Book } from "../models/Book";

const BookForm: React.FC<{ addBook: (book: Book) => void }> = ({ addBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [topic, setTopic] = useState('');

    const handleCreateBookSubmission = () => {
        const newBook: Book = {
            id: Date.now(),
            title,
            author,
            topic,
        };

    addBook(newBook);
    
    setTitle('');
    setAuthor('');
    setTopic('');
    };

    return (
        <div>
            <h2>Add Book</h2>
            <input 
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            
            <input 
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            />
            
            <input 
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            />

            <button onClick={handleCreateBookSubmission}>Add Book</button>
        </div>
    );
};

export default BookForm;