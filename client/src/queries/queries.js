import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`;

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      name
      genre
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const GET_BOOK_DETAILS = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`;

export { GET_AUTHORS, GET_BOOKS, ADD_BOOK, GET_BOOK_DETAILS };
