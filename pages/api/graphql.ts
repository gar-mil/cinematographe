import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs, resolvers } from '@/schemas/omdb'

/**
 * Generates GraphQL schema from typeDefs and resolvers. See: /pages/api/schemas/omdb.js
 */
const schema = createSchema({
  typeDefs,
  resolvers,
})

/**
 * GraphQL config values.
 */
export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * Access point for GraphQL.
 */
export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
})
