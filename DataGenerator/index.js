const fs = require('fs')
//const fsProm = fs.promises // this is the standard module to work with files



const generate = (array) => {
    console.log(array)
    // Array has many functions to help you, like .map in this case.
// https://devdocs.io/javascript-array/
const arrayOfPromises = array.map(jsonFileContent,idx => {
  // I get each occurrence of `array` as parameter and I return back a Promise to avoid to block the Nodejs event loop:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  return fsProm.writeFile(`./DataTrustedGraph_${idx + 1 }.json`, JSON.stringify(jsonFileContent, null, 2))
})

// I need to wait for async operation to understand when it is finished
Promise.all(arrayOfPromises)
  .then(() => {
    console.log('files created')
  })
  .catch(err => {
    console.log('error creating the files', err)
  })
}



const start = () => {
    fs.readFile('./openImages.json', 'utf8', function(err, data){
      
    // Display the file content
    generate(JSON.parse( data));
});
}
start()