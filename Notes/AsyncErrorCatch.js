
/*Async and await makes async work look 
like synchronous*/

// Async and await approach
 // makes it look like synchronous
 console.log("Before")
async function AysncAwaitApproach()
{    
    try{
        const user = await getuser(1); 
        const repos = await getRepositories(user.gitUserName);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch(err){
        
        console.log('Error: ',err.message);

    }
    }                               
  
AysncAwaitApproach(); //calling

function getuser(id)
{
    return new Promise((resolve,reject)=>
    {
        setTimeout(()=>{
            console.log('Getting a User from Database...');
            resolve({ id:id , gitUserName:'mosh'});
        },2000);
    });
    
}
function getRepositories(username)
{
    return new Promise((resolve,reject)=>
    {   
        setTimeout(()=>{
            console.log(`Reading Repositories for ${username}`);
            //resolve(['repo1','repo2','repo3']);
            reject(new Error ('Rejection From getRepositories'))
        },2000);
    });
    
}
function getCommits(repo)
{
    return new Promise((resolve,reject)=>{
        setTimeout( ( ) =>{
            console.log('Getting Commits for '+ repo);
            resolve('Commits');
        },2000);
    });
    
}
function printResult(para){
    console.log('Printing Repos with Callback')
    console.log(para);
    

}

console.log('After');
