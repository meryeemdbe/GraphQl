import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/queries";

function AddBook() {
  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    authorId: "",
  });
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [
    createBook,
    { loading: createBookload, error: createBookError, data: createBookData },
  ] = useMutation(ADD_BOOK, {
    refetchQueries: [
      GET_BOOKS, // DocumentNode object parsed with gql
      "GetBooks", // Query name
    ],
  });

  //   useEffect(()=> {
  //     console.log(createBook, createBookload, createBookError,createBookData );
  //   })

  if (loading) return "Loading Authors...";
  if (error) return `Error! ${error.message}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.genre && formData.authorId) {
      createBook({
        variables: {
          name: formData.name,
          genre: formData.genre,
          authorId: formData.authorId,
        },
      });
    }
  };

  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </div>

        <div className="field">
          <label>Author</label>
          <select
            name="authorId"
            value={formData.authorId}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select author
            </option>
            {data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <button disabled={createBookload}>+</button>
      </form>
    </div>
  );
}

export default AddBook;
