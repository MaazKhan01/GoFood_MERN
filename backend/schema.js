// const { buildSchema } = require('graphql');
// const bcrypt = require('bcrypt');
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'ecomm-store',
//   password: '12345',
//   port: 9098,
// });

// const typeDefs = buildSchema(`
//   type User {
//     id: ID
//     username: String
//     email: String
//   }

//   type Mutation {
//     signup(username: String!, email: String!, password: String!): User
//   }
// `);

// const resolvers = {
    
//     Mutation: {
//       signup: async (_, args) => {
//         const { username, email, password } = args;
  
//         try {
//           // Hash the password before storing it in the database
//           const hashedPassword = await bcrypt.hash(password, 10);
  
//           // Insert user data into the PostgreSQL database
//           const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
//           const values = [username, email, hashedPassword];
  
//           const client = await pool.connect();
//           const result = await client.query(query, values);
//           const user = result.rows[0];
//           client.release();
  
//           return user;
//         } catch (error) {
//           console.error('Error signing up:', error);
//           throw new Error('Signup failed');
//         }
//       },
//     },
//   }; 

// module.exports = { typeDefs, resolvers };


