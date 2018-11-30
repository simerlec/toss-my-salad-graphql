import mongoose from "mongoose";
const Schema = mongoose.Schema;

const greenSchema = new Schema({
  name: { type: String }
});

export const Green = mongoose.model("Green", greenSchema);
export default Green;
