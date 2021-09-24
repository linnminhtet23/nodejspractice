const mongoose = require("mongoose");

//1. connecting to mongodb
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connect to MongoDB...", err);
  });
//collection in mongodb is like table in rdb
//document in mongodb is like row in database

// 2.add the schema 
// schema maps to a MongoDB collection and defines the shape of the documents
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
// 2 schema 
const Course = mongoose.model('Course', courseSchema);//this is class

async function createCourse(){
const course = new Course({
    name:'Angular Course',
    author:'Linn Min Htet',
    tags: ['angular', 'frontend'],  
    isPublished:true
});

// saving document to mongodb
const result = await course.save();
console.log(result);
}

createCourse();

async function getCourses(){
  const courses = await Course.find();
}
getCourses