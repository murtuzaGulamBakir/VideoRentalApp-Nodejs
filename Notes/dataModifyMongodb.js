const mongoose = require('mongoose');
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

async function getCources(){
return await Course.find();
}

async function run(){
  const courses = await getCources();
  console.log(courses);
}

async function courseQueryFirst(id)
{
  const cource = await Course.findById( {_id: id} );
  
    course.author = 'Mosh',
    course.isPublished =  true
    
     const result = await course.save();
  console.log(result);
}

async function courseUpdateFirst(name)
{
  
  const result = await Course.updateOne( {name : name },{
      $set : {
        author: 'Murtaza',
        isPublished : false
      }
    }) ;
  
  console.log(result);
}

async function deleteCource(id){
  const result = await Course.deleteOne( {_id : id });
  console.log(result);
}
 run();
//deleteCource('5a6900fff467be65019a9001')


 
