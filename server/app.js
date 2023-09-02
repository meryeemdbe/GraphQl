const express = require('express');
const { graphqlHTTP }  = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://meryem:meryem@gql-cluster.xzewhai.mongodb.net/gql?retryWrites=true&w=majority";

// -------- database connection --------

// another way of connecting to database:
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'cnx error'));
db.once('open',() => {
    console.log("connected successfuly");
});


// -------- database connection --------

// const { MongoClient, ServerApiVersion } = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("gql").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


// run().catch(console.dir);


// -------- database connection --------

// ---- test database connection 
// app.get('/test-mongodb-connection', async (req, res) => {
//     try {
//       // Attempt to ping the database to check the connection
//       await client.db("admin").command({ ping: 1 });
//       res.status(200).json({ message: "MongoDB connection test successful!" });
//     } catch (error) {
//       console.error("MongoDB connection test failed:", error);
//       res.status(500).json({ error: "MongoDB connection test failed" });
//     }
//   });

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, ()=>{
    console.log("Now lsitening for requests on Port 4000 ");
})