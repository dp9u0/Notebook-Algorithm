// Warn if overriding existing method
if (Array.prototype.equals)
  // console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;
  // compare lengths - can save a lot of time 
  if (this.length !== array.length)
    return false;
  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;
    } else if (this[i] !== array[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {
  enumerable: false
});

Object.prototype.equals = function (obj) {
  //For the first loop, we only check for types
  for (const propName in this) {
    //Check for inherited methods and properties - like .equals itself
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    //Return false if the return value is different
    if (this.hasOwnProperty(propName) !== obj.hasOwnProperty(propName)) {
      return false;
    }
    //Check instance type
    else if (typeof this[propName] !== typeof obj[propName]) {
      //Different types => not equal
      return false;
    }
  }
  //Now a deeper check using other objects property names
  for (const propName in obj) {
    //We must check instances anyway, there may be a property that only exists in object2
    //I wonder, if remembering the checked values from the first loop would be faster or not 
    if (this.hasOwnProperty(propName) !== obj.hasOwnProperty(propName)) {
      return false;
    } else if (typeof this[propName] !== typeof obj[propName]) {
      return false;
    }
    //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!this.hasOwnProperty(propName))
      continue;

    //Now the detail check and recursion

    //This returns the script back to the array comparing
    /**REQUIRES Array.equals**/
    if (this[propName] instanceof Array && obj[propName] instanceof Array) {
      // recurse into the nested arrays
      if (!this[propName].equals(obj[propName]))
        return false;
    } else if (this[propName] instanceof Object && obj[propName] instanceof Object) {
      // recurse into another objects
      //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!this[propName].equals(obj[propName]))
        return false;
    }
    //Normal value comparison for strings and numbers
    else if (this[propName] !== obj[propName]) {
      return false;
    }
  }
  //If everything passed, let's say YES
  return true;
}

// Hide method from for-in loops
Object.defineProperty(Object.prototype, "equals", {
  enumerable: false
});