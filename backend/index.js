const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    ingredients: (_, args, context, info) => {
      return context.db.query.ingrediences({ }, info);
    },
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/petr-canek-398ab8/cookbook-orm/dev'
    })
  })
});
server.start(() =>
  console.log(`🚀  Server ready at http://localhost:4000`)
);
