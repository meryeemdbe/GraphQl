import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_DETAILS } from "../queries/queries";

function BookDetails(props) {
  const { BookId } = props;
  const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
    variables: { id: BookId },
  });
  console.log("props", props, data);

  if (loading) return <div id="book-details">Loading The selected Book...</div>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data && (
        <div id="book-details">
         <h2> {data.book.name}</h2>
         <table>
        <tbody>
          <tr>
            <td><strong>Title:</strong></td>
            <td>{data.book.name}</td>
          </tr>
          <tr>
            <td><strong>Genre:</strong></td>
            <td>{data.book.genre}</td>
          </tr>
          <tr>
            <td><strong>Author Name:</strong></td>
            <td>{data.book.author.name}</td>
          </tr>
          <tr>
            <td><strong>Author ID:</strong></td>
            <td>{data.book.author.id}</td>
          </tr>
          <tr>
            <td><strong>Author Age:</strong></td>
            <td>{data.book.author.age}</td>
          </tr>
          <tr>
            <td><strong>Books by Author:</strong></td>
            <td>
              <ul>
                {data.book.author.books.map((author) => (
                  <li key={author.id} value={author.id}>
                    {author.name}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      )}
      {!data && (
        <div id="book-details"> No book selected </div>
      )}
    </>
  );
}

export default BookDetails;
