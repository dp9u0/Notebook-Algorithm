function performance() {
  var diff = process.hrtime();
  return (diff[0] * 1e9 + diff[1]) / 1e6; // nano second -> ms
};

class Class1 {
  constructor() {
    this._age = 0;
  }
  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
}

class Class2 extends Class1 {
  constructor() {
    super()
  }
}

class Class3 extends Class1 {

  constructor() {
    super()
  }

  get age() {
    return this._age;
  }
  set age(value) {
    this._age = value;
  }
}

class Class4 extends Class1 {

  constructor() {
    super()
    this._age = 0;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }
}

class Class5 extends Class1 {
  constructor() {
    super()
  }

  get age() {
    return super.age;
  }

  set age(value) {
    super.age = value;
  }
}

const TEST_COUNT = Math.pow(10, 8);

function Benckmark(obj, desc) {
  let start = performance()
  let sum = 0;
  for (let index = 0; index < TEST_COUNT; index++) {
    sum += obj.age;
    obj.age = index;
  }
  console.log(performance() - start)
}

console.profile('性能分析器');

Benckmark(new Class1(), 'class1');
Benckmark(new Class1(), 'class1');
Benckmark(new Class2(), 'class2');
Benckmark(new Class2(), 'class2');
Benckmark(new Class3(), 'class3');
Benckmark(new Class3(), 'class3');
Benckmark(new Class4(), 'class4');
Benckmark(new Class4(), 'class4');
// Benckmark(new Class5(), 'class5');
// Benckmark(new Class5(), 'class5');

console.profileEnd();
/*
class1: 121.518ms
class1: 88.137ms
class2: 118.080ms
class2: 87.715ms
class3: 235.605ms
class3: 208.067ms
class4: 270.519ms
class4: 236.995ms
class5: 31453.589ms
class5: 31666.641ms
*/