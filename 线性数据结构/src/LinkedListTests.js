let {
  LinkedList
} = require("./LinkedList")

let ll = new LinkedList();

for (let i = 0; i < 10; i++) {
  ll.prepend("h" + i);
  ll.prepend("h" + i + 1000);
  ll.append("t" + (i + 100));
  ll.append("t" + (i + 10000));
  ll.removeHead();
  ll.removeTail();
  console.log(ll.toArray());
}