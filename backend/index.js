const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    info: () => `This is the API for a simple cookbook.`,
    ingredients: (_, args, context, info) => {
      return context.db.query.ingredients({}, info);
    },
    recepies: (_, args, context, info) => {
      return context.db.query.recepies({}, info);
    },
  },
  Mutation: {
    createRecepie: (root, args, context) => {
      return context.db.mutation.createRecepie(args);
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/petr-canek-398ab8/cookbook-orm/dev',
    }),
  }),
});

server.start(() => console.log(`🚀  Server ready at http://localhost:4000`));
