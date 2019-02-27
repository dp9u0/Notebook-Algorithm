class Class1 {
  constructor() {
    this._name = "Hello World"
    this._age = 10;
  }

  get age() {
    console.log('get age from class1')
    return this._age;
  }

  set age(value) {
    console.log('set age from class1')
    this._age = value;
  }
}

class Class2 extends Class1 {

  // get age() {
  //   console.log('get age from class2')
  //   return super.age;
  // }

  set age(value) {
    console.log('set age from class2')
    super.age = value;
  }
}


let cls2 = new Class2();

console.log(cls2.age);
cls2.age = 100;
console.log(cls2.age);