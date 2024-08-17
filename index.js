const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
// const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// load environment variables from .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const dbUrl = `mongodb+srv://${process.env.DBADMIN}:${process.env.ADMINPWD}@${process.env.DBHOST}/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // receive/parse JSON from request

// allow requests from anywhere
app.use(cors({
  origin: "*"
}));

// const skillSchema = new mongoose.Schema({
//   _id: String,
//   Skill: String,
//   imageUrl: String,
// });

// const projectSchema = new mongoose.Schema({
//   _id: String,
//   imageUrl: String,
//   Name: String,
//   Link: String,
//   README: String,
// })

// const SkillModel = mongoose.model('skill', skillSchema);
// const ProjectModel = mongoose.model('project', projectSchema);

// API endpoints
app.get("/api/skills", async (request, response) => {
  let skills = await getSkills();
  response.json(skills);
});
app.get("/api/projects", async (request, response) => {
  let projects = await getProjects();
  response.json(projects);
})

// set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

// MongoDB functions
async function connection() {
  await client.connect();
  db = client.db("Portfolio_API");
  return db;
}

// mongoose.connect(dbUrl, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((error) => {
//   console.log('Error connecting to MongoDB: ', error);
// });

// async function to get all skills documents from Skills collection
async function getSkills() {
  db = await connection();
  var results = db.collection('Skills').find({});
  res = await results.toArray();
  return res;
}
// async function to get all project documents from Projects collection
async function getProjects() {
  db = await connection();
  var results = db.collection('Projects').find({});
  res = await results.toArray();
  return res;
}
