const mongoose = require('mongoose');
const { date, tags } = require('joi');
mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=>console.log('Connected to MongoDB'))
.catch(( err ) => console.error('Connection Failed'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date:  Date,
  isPublished: Boolean,
  price: Number
});

 const Course = mongoose.model('Course',courseSchema);

async function getCources()
{
  return await Course.find();
}

async function run(){
  
  const cources  = await getCources();
  console.log(cources)
 
}

async function courseQueryFirst(id)
{
  const course = await Course.findById(id);
    course.author = 'Murtuza',
    course.isPublished =  false
    
     const result = await course.save();
  console.log(result);
}

async function courseUpdateFirst(id)
{
  
  const result = await Course.findByIdAndUpdate(id ,{
      $set : {
        author: 'Murtaza',
        isPublished : false
      }
    }) ;
  
  console.log(result);
}

async function deleteCource(id){
  const result = await Course.findByIdAndRemove( id );
  console.log(result);
}

deleteCource('5a68fdd7bee8ea64649c2777');


 
