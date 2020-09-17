# npm_module_inputsync
npm package to take command line inputs with Promise return

## How to install
```
$ npm i inputsync
```

## How to use
Include npm Package `inputsync` in you JS file
```
const InputSync = require("inputsync");
```
To take command line input

### Using `await`
```
const name = await InputSync.getline("Your Name : ")
console.log( "Your name is : " + name )

//best practice with error handling
try{
  const name_withoutErr = await InputSync.getline("Your Name : ")
  //if no error in line above
  console.log( "Your name is : " + name_withoutErr )
}catch(e){
  console.error(e)
}
```
### Using `Promise.prototype.then()`
```
InputSync.getline("Your favorite city : ").then( (input) => {
  console.log( "Your favorite city : " + input )
}, (err) => {
  console.error(err) //incase error is returned
})
```

## Functions in the package

InputSync.getline(question)

> `question` [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

> Returns [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## How to Contribute

Email me at : <b19kiit@gmail.com>

  Subject : Contribute to npm package inputsync

  Body : Describe why & how would you like you contribute
