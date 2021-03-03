console.log('Before') ;
// const result = getuser(1,(user)=>{
//    getRepositories(user.gitUserName,(repos)=>{
//        console.log(repos);
//        getCommits(repos[0],(commits)=>{
//             console.log(commits)
//        });
//    })
// }) ;

getuser(1)
.then(user=> getRepositories(user.gitUserName))
.then(repos=> getCommits(repos[0],printResult(repos)))//To print repos'callback'
.then( commits=> console.log(commits))
.catch(err => console.log('Error:', err.message));
                        




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
            resolve(['repo1','repo2','repo3']);
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

