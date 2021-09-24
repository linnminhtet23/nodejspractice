// const p = Promise.resolve({id:1});
// const p = Promise.reject(new Error('reason for rejection...'));
// p.catch(err=>console.log(err));

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Asynce operation 1...");
    // reject(new Error('Because something failed'));
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Asynce operation 2...");
    resolve(2);
  }, 2000);
  
});

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));
