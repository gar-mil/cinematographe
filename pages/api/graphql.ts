import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs, resolvers } from '@/schemas/omdb'

const schema = createSchema({
  typeDefs,
  resolvers,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
})
