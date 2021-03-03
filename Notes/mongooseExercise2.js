const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date:  Date,
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course',courseSchema);
async function getCources(){
  return await Course.find({isPublished:true})
  .or([ {tags:'frontend'},{tags:'backend'} ])
  .sort('-name')
  .select('name author price');
}
async function run(){
  const courses = await getCources();
  console.log(courses);
}
run();


