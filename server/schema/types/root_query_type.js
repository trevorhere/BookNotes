const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const BookType = require("./book_type");
const BookSearchType = require("./bookSearch_type");

// const ListType = require("./list_type");
// const TaskType = require("./task_type");
// const TeamType = require("./team_type");

const User = mongoose.model("user");
const Book = mongoose.model("book");

// const List = mongoose.model("list");
// const Task = mongoose.model("task");
// const Team = mongoose.model("team");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    userID: {
      type: UserType,
      args: { userID: { type: GraphQLID } },
      resolve(parentValue, { userID }) {
        return User.findById(userID);
      }
    },
    book: {
      type: BookType,
      args: { bookID: { type: GraphQLID } },
      resolve(parentValue, { bookID }) {
        return Book.findById(bookID);
      }
    }
  })
});

module.exports = RootQueryType;
