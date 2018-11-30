import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    allDressings: [Dressing!]!
    allGreens: [Green!]!
  }

  type Dressing {
    name: String!
  }

  type Green {
    name: String!
  }
`;

export default typeDefs;
