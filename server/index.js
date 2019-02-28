const express = require("express");
const path = require("path");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const app = require("./server");
const fetch = require("node-fetch");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.BOOKS_KEY;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `Node cluster worker ${
        worker.process.pid
      } exited: code ${code}, signal ${signal}`
    );
  });
} else {
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, "../client/build")));

  app.get("/bookSearch/:keyword", (req, res) => {
    // console.log("book Search hit");
    // const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${
    //   req.params.keyword
    // }+inauthor:${req.params.author}&key=${API_KEY}`;

    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${
      req.params.keyword
    }&key=${API_KEY}`;

    res.set("Content-Type", "application/json");

    //res.send(getData(API_URL));

    fetch(API_URL)
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        //     console.log(responseJson["items"].volumeInfo);

        let bookArr = [];
        responseJson["items"].forEach(book => {
          //   console.log("book", book);
          let image = "";
          if (
            book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail
          ) {
            image = book.volumeInfo.imageLinks.thumbnail;
          }
          bookArr.push({
            title: `${book.volumeInfo.title}`,
            author: `${book.volumeInfo.authors}`,
            image: image,
            infoLink: `${book.volumeInfo.infoLink}`
          });
        });

        ///res.send(responseJson["items"]);
        res.send(bookArr);
      })
      .catch(err => {
        console.log("err", err);
      });

    // try {

    //   const response = await fetch(API_URL);
    //   const json = await response.json();
    //   console.log(json);
    //   res.send(json);
    // } catch (error) {
    //   console.log(error);
    // }
  });

  // Answer API requests.
  app.get("/api", function(req, res) {
    res.set("Content-Type", "application/json");
    res.send('{"message":"Hello from the custom server!"}');
  });

  // All remaining requests return the React app, so it can handle routing.
  app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });

  app.listen(PORT, function() {
    console.error(
      `Node ${
        isDev ? "dev server" : "cluster worker " + process.pid
      }: listening on port ${PORT}`
    );
  });
}
