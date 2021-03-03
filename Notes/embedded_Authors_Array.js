// Dealing with array of Authors.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String, 
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({ // cource schema
  name: String,
  authors : [authorSchema]     // * Dealing with many Authors for same Cource
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors: authors  // an array
  }); 
  
  const result = await course.save();
  console.log(result);
}
async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// to add a new author to array of authors in cource collection
async function addAuthor(courceID,author_object){ 
    const course = await Course.findById(courceID);
    course.authors.push(author_object);
    course.save();
}

// to remove a particular author from array 
async function removeAuthor(courceID,authorID){ 
    const course = await Course.findById(courceID);
    const reqAuthor = course.authors.id(authorID); // to find a child with this id
    reqAuthor.remove(); // to remove that author
    course.save();
}

// createCourse('Node Course', [ 
//     new Author({ name: 'Mosh' }), 
//     new Author({ name: 'john' }),
//     new Author({ name: 'Marry' }) 
// ] ); // array of authors passed

//addAuthor('5f12f2a4e076f21714b21739',new Author({ name: 'Sarra' })); // add new author to array
removeAuthor('5f12f2a4e076f21714b21739','5f12f584d7ae53165482ae01'); // to remove an author for a course
