const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    title: String,
    author: String,
    notes: String,
    createdAt: String,
    imageUrl: String,
    readers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  { usePushEach: true }
);

BookSchema.statics.fetchReaders = function(id) {
  return this.findById(id)
    .populate("readers")
    .then(book => book.readers);
};

BookSchema.statics.addBook = function(
  userID,
  imageUrl,
  title,
  author,
  createdAt
) {
  const User = mongoose.model("user");
  const Book = mongoose.model("book");

  return User.findById(userID).then(user => {
    const book = new Book({ imageUrl, title, author, createdAt });
    user.books.push(book);
    return Promise.all([book.save(), user.save()]).then(([book, user]) => book);
  });
};

BookSchema.statics.updateBook = function(
  bookID,
  imageUrl,
  title,
  author,
  notes
) {
  console.log("book", imageUrl);
  const Book = mongoose.model("book");
  return Book.findById(bookID).then(book => {
    book.title = title;
    book.imageUrl = imageUrl;
    book.author = author;
    book.notes = notes;
    return Promise.all([book.save()]).then(([book]) => book);
  });
};

mongoose.model("book", BookSchema);
