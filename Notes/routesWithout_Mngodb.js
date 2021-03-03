const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json()); //enabling Post Request

const cources = [
    {   id :1,
        name :'cource1'
    },

    {
        id :2,
        name :'cource2' 
    },

    {
        id :3,
        name :'cource3' 
    }
]



app.get('/', (req,res)=>{
       res.send("HELLO WORLD");
    
});

app.get('/api/cources', (req,res)=>{
    res.send(cources)
});

app.get('/api/cources/:id', (req,res)=>{
        
 const reqCource = cources.find((cource) => cource.id==req.params.id);
 if(!reqCource) return res.send('The cource with the given ID was not Found');
 res.send(reqCource);
});

app.post('/api/cources',(req,res)=>{ 

    const schema = {  name : Joi.string().min(3).required() }

    const result = Joi.validate(req.body,schema); 

    console.log(result);

   if(result.error) return res.status(404).send(result.error.message)
  
     const cource = {
         id : cources.length+1,
         name : req.body.name ,
     }
     
     cources.push(cource);
      res.send(cource);
 
});

app.put('/api/cources/:id', (req,res)=>{
     
    const reqCource = cources.find((cource)=> cource.id == req.params.id);
     
    if(!reqCource) return res.status(404).send("The cource with given ID was not Found") 

    const schema = {  name : Joi.string().min(3).required() }
    const result = Joi.validate(req.body,schema); 

    console.log(result);

   if(result.error)  return res.status(400).send(result.error.message)
  
   reqCource.name = req.body.name;
   res.send(reqCource);
   });
   
   app.delete('/api/cources/:id',(req,res)=>{
    const reqCource = cources.find((cource)=> cource.id == req.params.id);
     
    if(!reqCource) return res.status(404).send("The cource with given ID was not Found") 
  
    const deleteIndex =cources.indexOf(reqCource);
    cources.splice(deleteIndex,1);
    res.send(reqCource);

   });

const port = process.env.PORT || 3000; //Set PORT =5000;

app.listen(port , () => { 
     console.log(`Listening on port ${port}...`);
});
