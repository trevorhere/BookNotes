const graphql = require("graphql");
const mongoose = require("mongoose");

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

// const ListType = require("./list_type");
// const TeamType = require("./team_type");

const BookType = require("./book_type");
const User = mongoose.model("user");
// const Team = mongoose.model("team");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    fullName: { type: GraphQLString },
    userName: { type: GraphQLString },
    books: {
      type: GraphQLList(BookType),
      resolve(parentValue) {
        return User.fetchBooks(parentValue.id);
      }
    }
  }
});

module.exports = UserType;
