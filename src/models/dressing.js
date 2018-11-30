import mongoose from "mongoose";
const Schema = mongoose.Schema;

const dressingSchema = new Schema({
  name: { type: String }
});

export const Dressing = mongoose.model("Dressing", dressingSchema);
export default Dressing;
