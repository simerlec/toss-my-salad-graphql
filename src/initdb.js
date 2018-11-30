import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import Dressing from "./models/dressing";
import Green from "./models/green";

async function dressingSeeder() {
  const createPromises = [];
  await Dressing.deleteMany({});
  await Green.deleteMany({});

  const dressingsfilePath = path.join(
    __dirname,
    "../salad-data/dressings.json"
  );
  const greensfilePath = path.join(__dirname, "../salad-data/greens.json");
  const dressings = JSON.parse(fs.readFileSync(dressingsfilePath));
  const greens = JSON.parse(fs.readFileSync(greensfilePath));

  dressings.forEach(dressing => {
    createPromises.push(Dressing.create(dressing));
  });

  greens.forEach(green => {
    createPromises.push(Green.create(green));
  });

  return Promise.all(createPromises);
}

const closeConnection = () => {
  mongoose.connection.close(() => {
    console.log("Done, mongoose connection disconnected.");
  });
};

export async function initSeed() {
  let error = "none";

  await mongoose.connect(
    `mongodb://root:testroot1@ds119734.mlab.com:19734/toss-my-salad`,
    { useNewUrlParser: true }
  );

  console.log("***** seeding session instances...");
  await dressingSeeder();
  closeConnection();
}
