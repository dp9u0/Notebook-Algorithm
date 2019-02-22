let {
  LinkedList
} = require("./LinkedList")

let ll = new LinkedList();

for (let i = 0; i < 3; i++) {
  ll.prepend("h" + i);
  ll.prepend(i);
  ll.prepend(i);
  ll.append(i);
  ll.prepend(i);
  ll.append(i);
  ll.append(i);
  ll.prepend("h" + (i + 1000));
  ll.append("t" + (i + 100));
  ll.append("t" + (i + 10000));
  ll.remove(i);
  ll.removeHead();
  ll.removeTail();
}