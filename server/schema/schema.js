const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const _ = require('lodash');

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId:'1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId:'2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId:'3' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];

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
                return _.find(authors, {id: parent.authorId} )
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
                return _.filter(books, {authorId :parent.id })
            }
        }

    })

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
                 return _.find(books, {id: args.id});
            }
        },
        author: {
            type:Authortype,
            args: {id: {type: GraphQLID}}, 
            resolve(parent, args) {
                 return _.find(authors, {id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
             resolve(parent, args) {
                 return books;
            }
        }, 
        authors: {
            type: new GraphQLList(Authortype),
             resolve(parent, args) {
                 return authors;
            }
        }, 
    }
 
 });
// export schema to use it in app.js
module.exports = new GraphQLSchema({
    query : RootQuery
})

// Wrapping fields inside functions aims to make those fields inside a function 
// to be running when for example a AuthorType has not being created it wil just wait
// until the AuthorType be created.