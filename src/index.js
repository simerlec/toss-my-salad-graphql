import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers/resolvers";
import typeDefs from "./schema/schema";
import mongoose from "mongoose";
import { initSeed } from "./initdb";

mongoose.connect(
  `mongodb://root:testroot1@ds119734.mlab.com:19734/toss-my-salad`,
  { useNewUrlParser: true }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "dark"
    }
  }
});

var app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("/graphql");
});

app.get("/initdb", function(req, res, next) {
  initSeed().then(
    () => res.json({ msg: "Init database done!" }),
    reason => res.json({ msg: "Something went wrong!", error: reason })
  );
});

server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, function() {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
});
