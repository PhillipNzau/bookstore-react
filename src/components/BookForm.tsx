import React, { useState } from "react";
import { AddBookModel } from "../model/types";

interface AddBookProps {
  onAddBook: (newBook: AddBookModel) => void;
}
const BookForm: React.FC<AddBookProps> = ({ onAddBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = { title, image, author };
    onAddBook(newBook);
    setTitle("");
    setAuthor("");
    setImage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <br />
      <label>
        Image:
        <input
          type="text"
          value={image}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>

      <br />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
