# Bookshelf

## Project Overview

This project is a web application that consists of two main components: a server-side application built using Express.js and GraphQL, and a client-side application developed using React and Apollo Client. The server-side application connects to a MongoDB Atlas database to manage and retrieve data.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Server-Side Application](#server-side-application)
3. [Client-Side Application](#client-side-application)
4. [Database](#database)
5. [Installation](#installation)
6. [Usage](#usage)

## Project Structure

The project is organized into two main directories:

- `server/`: Contains the server-side application built with Express.js and GraphQL.
- `client/`: Contains the client-side application built with React and Apollo Client.

## Server-Side Application

The server-side application is responsible for handling GraphQL queries and mutations. It provides an API for the client-side application to interact with the database. Here are some key features:

- Uses Express.js as the web server framework.
- Implements GraphQL using Apollo Server.
- Connects to a MongoDB Atlas database to store and retrieve data.


## Client-Side Application

The client-side application is the user-facing part of the project. It interacts with the server-side application using GraphQL queries and mutations. Key features include:

- Developed with React, a popular JavaScript library for building user interfaces.
- Utilizes Apollo Client to manage data and interact with the GraphQL API.
- Provides a user-friendly interface to interact with the server and display data.

## Database

The project uses a MongoDB Atlas database to store and manage data. MongoDB Atlas is a cloud-based database service that provides high availability and scalability. You'll need to configure your MongoDB Atlas connection details in the server-side application.

## Installation

Before you can run the project, you need to install its dependencies. Follow these steps:

1. **Clone the Repository:**

   ```
   git clone https://github.com/meryeemdbe/GraphQl.git
   cd GraphQl
   ```

2. **Install Server-Side Dependencies:**

   Navigate to the `server/` directory and install the server-side dependencies:

   ```
   cd server/
   npm install
   ```

3. **Install Client-Side Dependencies:**

   Navigate to the `client/` directory and install the client-side dependencies:

   ```
   cd client/
   npm install
   ```

## Usage

To run the project, follow these steps:

1. **Start the Server:**

   In the `server/` directory, run the server-side application:

   ```
   cd server/
   npm start
   ```

   The server will be running on `http://localhost:4000`.
   You can access GraphQli on `http://localhost:4000/graphql`.

2. **Start the Client:**

   In the `client/` directory, run the client-side application:

   ```
   cd client/
   npm start
   ```

   The client application will be accessible at `http://localhost:3000`.

3. **Access the Application:**

   Open your web browser and visit `http://localhost:3000` to use the application.
