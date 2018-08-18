const pg = require('pg');
const {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = require('graphql');


const pgpool = new pg.Pool({
  database: 'chronist',
  user: 'postgres',
  password: 'postgres',
  port: 5432,
  ssl: true,
  max: 20, // set pool max size to 20
  min: 4, // set min pool size to 4
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000
});

const languageType = new GraphQLObjectType({
  name: 'Language',
  fields: {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
  }
});

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    languages: {
      type: new GraphQLList(GraphQLString)
    },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields: {

      post: {
        type: postType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (obj, args) => {
          return pgpool.query(`
            SELECT * FROM posts
            WHERE id = $1
          `, [args.id]).then((result) => result.rows[0]);
        }
      },

      posts: {
        type: new GraphQLList(postType),
        resolve: () => {
          return pgpool.query(`
            SELECT * FROM posts
          `, []).then((result) => result.rows);
        }
      },

      languages: {
        type: languageType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (obj, args) => {
          console.log('langauge type resole', obj, args);
          return pgpool.query(`
            SELECT * FROM languages
            WHERE id = $1
            `, [args.id]).then((result) => result.rows[0]);
        }
      }
    },
  }),
});

// const schema = new GraphQLSchema({
//   query: RootQuery,
//   // mutation: RootMutation,
// });

module.exports = schema;
