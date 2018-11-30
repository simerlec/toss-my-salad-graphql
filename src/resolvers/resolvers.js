import { Dressing } from "../models/dressing";
import { Green } from "../models/green";

const resolvers = {
  Query: {
    allDressings() {
      return Dressing.find();
    },
    allGreens() {
      return Green.find();
    }
  }
};

export default resolvers;
