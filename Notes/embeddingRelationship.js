const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,  // to apply validation on a particular property
  bio: {            // make it require here itself
      type : String , // as this authorSchema is passed to Cource collection as type to author
      required : true
  },     
  website: String   // website may or may not be passed as not required
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author : {
      type : authorSchema,
      required:true
  } //author is of type Author Schema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  //console.log(result);
  console.log('%j',result);
}

async function listCourses() { 
  const courses = await Course.find();
  //console.log(courses);
  console.log('%j',courses);
}

async function updAuthorQueryFirst(courceID){ // to update author object in Cource collection

const reqCource = await Course.findById(courceID);

reqCource.author.name ='Mosh Hamedani';

reqCource.save(); /* cource.author.save() does not exist as 'name' is embedded*/                   
}

async function updateFirst(courceID){  // to update author object in Cource collection 

    const reqCource = await Course.update( { _id : courceID } ,{
        $set:{ 
                'author.name': 'John Smith'  // Method 1
             } 
        
        // $set: { 
        //     author: {
        //                 name:'John Smith'       // Method 2
        //             }
        //      }    
     });                 
}

async function deleteAuthorObject(courceID){  // to update author object in Cource collection 

    const reqCourse = await Course.update( { _id : courceID } ,{
        // $unset:{ 
        //         'author.name': ''  // Method 1 'Removes name from author object
        //      } 
        
        $unset:{ 
                author:''  // Method 2 'Removes complete 'author' object from collection
               } 
          
     });                 
}

// you can pass either one or all properties of authorSchema in createCourse() below;
// whatever other wrong properties you pass will not be saved
createCourse('Node Course', new Author({ name: 'Moshi' ,bio :'Funny'  })); // bio required

updAuthorQueryFirst('5f12e278cfd2c2061853cf90');

updateFirst('5f12e278cfd2c2061853cf90')

deleteAuthorObject('5f12ee668b567b15983ee03e') //deletes properties from 'author' object of Cources