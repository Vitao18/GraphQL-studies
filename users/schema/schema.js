const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");
const { prop } = require("../utils");

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:4000/companies/${parentValue.id}/users`)
          .then(resp => prop("data", resp));
      }
    }
  }
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:4000/companies/${parentValue.companyId}`)
          .then(resp => prop("data", resp));
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryTypes",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:4000/users/${args.id}`)
          .then(resp => prop("data", resp));
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:4000/companies/${args.id}`)
          .then(resp => prop("data", resp));
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
