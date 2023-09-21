const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 4000;

// Set up CORS options
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
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        // Insert the user data into your PostgreSQL database here
        const { username, email, password } = args;
        const client = await pool.connect();
        // const hashedPassword = await bcrypt.hash(password, 10);
        try {
          const usernameExistsQuery = 'SELECT id FROM users WHERE username = $1';
          const existingUser = await client.query(usernameExistsQuery, [username]);

          if (existingUser.rows.length > 0) {
            throw new Error('Username already exists');
          }

          // Hash the password and insert the user data into your PostgreSQL database
          const hashedPassword = await bcrypt.hash(password, 10);
          const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
          const values = [username, email, hashedPassword];
          const result = await client.query(insertUserQuery, values);
          return result.rows[0];
        } catch (error) {
          throw error;
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
