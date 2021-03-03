console.log('Before') ;
/*This Approach contains a bug 
i.e. while giving reference function during call it dosesnt know which funtion with this name
 call as their are two functions with same name
 So the Solution is differentiate every function */
getUser(1,getRepositories) ;

function getRepositories(user_object)
{
    getRepositories(user_object.gitUserName , getCommits) ; 
}
function getCommits(repos)
{
    console.log(repos);
    getCommits(repos[0],displayCommits);
}

function displayCommits(Commits)
{
console.log(Commits);
}

function getUser(id,callback)
{
    setTimeout(()=>
    {
        console.log('Getting a User from Database...');
        callback( { id:id , gitUserName:'mosh'} );
    },2000);
}
function getRepositories(username,callback)
{
    setTimeout(()=>
    {
        console.log(`Reading Repositories for ${username}`);
        callback( ['repo1','repo2','repo3']);
        
    },2000);
}
function getCommits(repos,callback)
{
    setTimeout(()=>
    {
        console.log('Getting Commits for ' + repos);
        callback('Commits');
    },2000);
}

console.log('After');
