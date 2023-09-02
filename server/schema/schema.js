const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

// 1 - create our object types : books & authors
 const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type : Authortype,
            resolve(parent, args) {
                // return _.find(authors, {id: parent.authorId} )
            }
        }

    })

 });

 const Authortype = new GraphQLObjectType({
    name:'Author',
    fields: ()=> ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent,args) {
                // return _.filter(books, {authorId :parent.id })
            }
        }

    })

 });

 const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type: Authortype,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age,
                })
               return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                })
               return book.save();
            }
        }         
    }

 });

// 2 - define relashionships
// 3 - define root queries = how to initially jum into the graph (entrypoints?)
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        book: {
            type:BookType,
            args: {id: {type: GraphQLID}}, // book(id:123){name genre...}
            resolve(parent, args) {
                // code to get data from db / other source
                //  return _.find(books, {id: args.id});
            }
        },
        author: {
            type:Authortype,
            args: {id: {type: GraphQLID}}, 
            resolve(parent, args) {
                //  return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
             resolve(parent, args) {
                //  return books;
            }
        }, 
        authors: {
            type: new GraphQLList(Authortype),
             resolve(parent, args) {
                //  return authors;
            }
        }, 
    }
 
 });
// export schema to use it in app.js
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: Mutation
})

// Wrapping fields inside functions aims to make those fields inside a function 
// to be running when for example a AuthorType has not being created it wil just wait
// until the AuthorType be created.