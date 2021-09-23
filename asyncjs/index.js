console.log('Before');
const user = getUser(1,getRepositories);
console.log('After');

function getRepositories(user){
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos){
    getCommmits(repos,displayCommit);
}

function displayCommit(commits){
    console.log(commits);
}

//Callback
//Promises
//Async await

function getUser(id, callback){
    setTimeout(()=>{
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername:'linnminhtet23'});
        },2000);
}

function getRepositories(username, callback){
    setTimeout(()=>{
        console.log('Calling GitHub API...');
        callback (['repo1', 'repo2', 'repo3']);
    },2000);
}