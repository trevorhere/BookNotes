const graphql = require("graphql");
const mongoose = require("mongoose");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const UserType = require("./user_type");

const Book = mongoose.model("book");

const BookType = new GraphQLObjectType({
  name: "BookType",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    notes: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    imageUrl: { type: GraphQLString }

    // readers: {
    //   type: GraphQLList(UserType),
    //   resolve(parentValue) {
    //     return Book.fetchReaders(parentValue.id);
    //   }
    // }
  }
});

module.exports = BookType;
