const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const UserType = require("./user_type");

const Book = mongoose.model("book");

const BookSearchType = new GraphQLObjectType({
  name: "BookSearchType",
  fields: {
    results: { type: GraphQLString }

    // readers: {
    //   type: GraphQLList(UserType),
    //   resolve(parentValue) {
    //     return Book.fetchReaders(parentValue.id);
    //   }
    // }
  }
});

module.exports = BookSearchType;
