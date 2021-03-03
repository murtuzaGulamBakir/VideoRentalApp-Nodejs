console.log('Before') ;
const result = getuser(1,(user)=>{
   getRepositories(user.gitUserName,(repos)=>{
       console.log(repos);
       getCommits(repos[0],(Commits)=>{
            console.log(Commits)
       });
   })
}) ;


function getuser(id,callback){
    setTimeout(()=>{
        console.log('Getting a User from Database...');
        callback({ id:id , gitUserName:'mosh'});
    },2000);
}
function getRepositories(username,callback){
    setTimeout(()=>{
        console.log(`Reading Repositories for ${username}`);
        callback(['repo1','repo2','repo3']);
    },2000);
}
function getCommits(repo,callback){
    setTimeout(()=>{
        console.log('Getting Commits for '+repo);
        callback('Commits');
    },2000);
}

console.log('After');
