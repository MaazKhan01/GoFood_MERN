const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 4000;
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual URL of your Next.js frontend
  methods: 'POST',
};

// Use the CORS middleware with the specified options
app.use(cors(corsOptions));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecomm-store',
  password: '12345',
  port: 9098,
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'Hello, world!',
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        // Insert the user data into your PostgreSQL database here
        const { username, email, password } = args;
        const hashedPassword = await bcrypt.hash(password, 10);
        const client = await pool.connect();
        try {
          const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';

          const values = [username, email, hashedPassword];
          const result = await client.query(query, values);
          return result.rows[0];
        } finally {
          client.release();
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// LOGIN TO DYCRYPT HASH PASS

// const enteredPassword = 'passwordEnteredByUser'; // Replace with the user's entered password

// // Retrieve the hashed password from the database for the user attempting to log in
// // Compare the entered password with the hashed password
// const passwordsMatch = await bcrypt.compare(enteredPassword, hashedPasswordFromDatabase);

// if (passwordsMatch) {
//   // Passwords match, proceed with authentication
// } else {
//   // Passwords don't match, authentication failed
// }