// https://stackoverflow.com/questions/39837678/why-no-array-prototype-flatmap-in-javascript

if (![].flatMap) { 
  const concat = (x,y) =>
  x.concat(y)
  
  const flatMap = (f,xs) =>
  xs.map(f).reduce(concat, [])
  
  Array.prototype.flatMap = function(f) {
    return flatMap(f,this)
  }
}