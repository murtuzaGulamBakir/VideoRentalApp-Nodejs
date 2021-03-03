const promise_1= new Promise((resolve)=>
    {
        setTimeout(()=>{
            console.log('Calling facebook API...');
            resolve("Mark Zukerburg");
        },2000);
    });
    const promise_2 = new Promise((resolve)=>
    {
        setTimeout(()=>{
            console.log('Calling Google API...');
            resolve("Sundar Pichai");
        },2000);
    });

 Promise.all( [promise_1,promise_2] ) // Consuming promises together
 .then(promise_1_2 => console.log(promise_1_2)); //result available as an array
 
 /* Promise.race([promise_1,promise_2]) // consuming Promise which completes first
 .then(promise_1_2 => console.log(promise_1_2));*/       