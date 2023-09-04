import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [BookId, setBookId] = useState("");
  if (loading) return "Loading Books...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li
            key={book.id}
            onClick={() => {
              setBookId(book.id);
            }}
          >
            {book.name} - {book.genre}{" "}
          </li>
        ))}
      </ul>
      {BookId && <BookDetails BookId={BookId} />}
    </div>
  );
}

export default BookList;
