const fs = require('fs');

console.time('syn');
const data = fs.readFileSync('/Users/Mendi/Desktop/pelicula.rar');
console.timeEnd('syn');
console.time('callback');
console.time('asyn');
fs.readFile('/Users/Mendi/Desktop/pelicula.rar', (err, data) => {
  console.timeLog('callback');
});
console.timeEnd('asyn');


