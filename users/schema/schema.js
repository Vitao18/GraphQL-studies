const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = require("graphql");

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "25", firstName: "Samantha", age: 23 }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryTypes",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return users.find(user => user.id === args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
