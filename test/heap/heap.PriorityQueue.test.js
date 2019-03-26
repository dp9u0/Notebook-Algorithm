let expect = require("chai").expect;
const PriorityQueue = require("../../src/heap/PriorityQueue");

describe('PriorityQueue', () => {
  it('should create default priority queue', () => {
    const priorityQueue = new PriorityQueue();
    expect(priorityQueue).to.not.be.undefined
  });

  it('should throw error when change priority for element not exists', () => {
    const priorityQueue = new PriorityQueue();
    expect(() => {
      priorityQueue.changePriority(1, 2);
    }).to.throw();
  });

  it('should insert items to the queue and respect priorities', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    expect(priorityQueue.peek()).to.equal(10);

    priorityQueue.add(5, 2);
    expect(priorityQueue.peek()).to.equal(10);

    priorityQueue.add(100, 0);
    expect(priorityQueue.peek()).to.equal(100);
  });

  it('should be possible to use objects in priority queue', () => {
    const priorityQueue = new PriorityQueue();

    const user1 = {
      name: 'Mike'
    };
    const user2 = {
      name: 'Bill'
    };
    const user3 = {
      name: 'Jane'
    };

    priorityQueue.add(user1, 1);
    expect(priorityQueue.peek()).to.equal(user1);

    priorityQueue.add(user2, 2);
    expect(priorityQueue.peek()).to.equal(user1);

    priorityQueue.add(user3, 0);
    expect(priorityQueue.peek()).to.equal(user3);
  });

  it('should pop from queue with respect to priorities', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    expect(priorityQueue.pop()).to.equal(100);
    expect(priorityQueue.pop()).to.equal(200);
    expect(priorityQueue.pop()).to.equal(10);
    expect(priorityQueue.pop()).to.equal(5);
  });

  it('should be possible to change priority of internal nodes', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(100, 10);
    priorityQueue.changePriority(10, 20);

    expect(priorityQueue.pop()).to.equal(200);
    expect(priorityQueue.pop()).to.equal(5);
    expect(priorityQueue.pop()).to.equal(100);
    expect(priorityQueue.pop()).to.equal(10);
  });

  it('should be possible to change priority of head node', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    expect(priorityQueue.pop()).to.equal(100);
    expect(priorityQueue.pop()).to.equal(5);
    expect(priorityQueue.pop()).to.equal(200);
    expect(priorityQueue.pop()).to.equal(10);
  });

  it('should be possible to change priority along with node addition', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);

    priorityQueue.changePriority(200, 10);
    priorityQueue.changePriority(10, 20);

    priorityQueue.add(15, 15);

    expect(priorityQueue.pop()).to.equal(100);
    expect(priorityQueue.pop()).to.equal(5);
    expect(priorityQueue.pop()).to.equal(200);
    expect(priorityQueue.pop()).to.equal(15);
    expect(priorityQueue.pop()).to.equal(10);
  });

  it('should be possible to search in priority queue by value', () => {
    const priorityQueue = new PriorityQueue();

    priorityQueue.add(10, 1);
    priorityQueue.add(5, 2);
    priorityQueue.add(100, 0);
    priorityQueue.add(200, 0);
    priorityQueue.add(15, 15);

  });
});