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
return await Course.find({ isPublished:true} )
.or([{price: { $gte: 15 }},{ name: /.*by.*/i }])
}

async function run(){
  const courses = await getCources();
  console.log(courses);
}
run();


