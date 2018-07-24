const { ApolloServer, gql } = require('apollo-server');
const { Prisma } = require('prisma-binding');

const resolvers = {
  Query: {
    ingredients: (_, args, context, info) => {
      return context.db.query.ingrediences({ }, info);
    },
  }
};

const typeDefs = gql`
  type Ingredient {
    id: ID! @unique
    name: String!
    group: IngredientGroup!
    amount: Int
    unit: String
  }

  type IngredientGroup {
    id: ID! @unique
    name: String!
    ingredienceList: [Ingredient!]!
  }

  type Query {
    ingredients: [Ingredient!]!
  }
`;

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/petr-canek-398ab8/cookbook-orm/dev'
    })
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
