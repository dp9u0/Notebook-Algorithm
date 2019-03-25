const expect = require('chai').expect;
const {
  DisjointSet,
  DisjointSetNode
} = require('../../src/tree/DisjointSet');

describe('DisjointSetNode', () => {
  it('should do basic manipulation with disjoint set item', () => {
    const itemA = new DisjointSetNode('A');
    const itemB = new DisjointSetNode('B');
    const itemC = new DisjointSetNode('C');
    const itemD = new DisjointSetNode('D');

    expect(itemA.rank).to.equal(0);
    expect(itemA.children.length).to.equal(0);
    expect(itemA.key).to.equal('A');
    expect(itemA.root).to.equal(itemA);
    expect(itemA.isRoot).to.be.true;
    expect(itemB.isRoot).to.be.true;

    itemA.addChild(itemB);
    itemD.setParent(itemC);

    expect(itemA.rank).to.equal(1);
    expect(itemC.rank).to.equal(1);

    expect(itemB.rank).to.equal(0);
    expect(itemD.rank).to.equal(0);

    expect(itemA.children.length).to.equal(1);
    expect(itemC.children.length).to.equal(1);

    expect(itemA.children[0]).to.equal(itemB);
    expect(itemC.children[0]).to.equal(itemD);

    expect(itemB.children.length).to.equal(0);
    expect(itemD.children.length).to.equal(0);

    expect(itemA.root).to.equal(itemA);
    expect(itemB.root).to.equal(itemA);

    expect(itemC.root).to.equal(itemC);
    expect(itemD.root).to.equal(itemC);

    expect(itemA.isRoot).to.be.true;
    expect(itemB.isRoot).to.be.false;
    expect(itemC.isRoot).to.be.true;
    expect(itemD.isRoot).to.be.false;

    itemA.addChild(itemC);

    expect(itemA.isRoot).to.be.true;
    expect(itemB.isRoot).to.be.false;
    expect(itemC.isRoot).to.be.false;
    expect(itemD.isRoot).to.be.false;

    expect(itemA.rank).to.equal(3);
    expect(itemB.rank).to.equal(0);
    expect(itemC.rank).to.equal(1);
  });

  it('should do basic manipulation with disjoint set item with custom key extractor', () => {
    const keyExtractor = (value) => {
      return value.key;
    };

    const itemA = new DisjointSetNode({
      key: 'A',
      value: 1
    }, keyExtractor);
    const itemB = new DisjointSetNode({
      key: 'B',
      value: 2
    }, keyExtractor);
    const itemC = new DisjointSetNode({
      key: 'C',
      value: 3
    }, keyExtractor);
    const itemD = new DisjointSetNode({
      key: 'D',
      value: 4
    }, keyExtractor);

    expect(itemA.rank).to.equal(0);
    expect(itemA.children).to.deep.equal([]);
    expect(itemA.key).to.equal('A');
    expect(itemA.root).to.equal(itemA);
    expect(itemA.isRoot).to.be.true;
    expect(itemB.isRoot).to.be.true;

    itemA.addChild(itemB);
    itemD.setParent(itemC);

    expect(itemA.rank).to.equal(1);
    expect(itemC.rank).to.equal(1);

    expect(itemB.rank).to.equal(0);
    expect(itemD.rank).to.equal(0);

    expect(itemA.children.length).to.equal(1);
    expect(itemC.children.length).to.equal(1);

    expect(itemA.children[0]).to.equal(itemB);
    expect(itemC.children[0]).to.equal(itemD);

    expect(itemB.children.length).to.equal(0);
    expect(itemD.children.length).to.equal(0);

    expect(itemA.root).to.equal(itemA);
    expect(itemB.root).to.equal(itemA);

    expect(itemC.root).to.equal(itemC);
    expect(itemD.root).to.equal(itemC);

    expect(itemA.isRoot).to.be.true;
    expect(itemB.isRoot).to.be.false;
    expect(itemC.isRoot).to.be.true;
    expect(itemD.isRoot).to.be.false;

    itemA.addChild(itemC);

    expect(itemA.isRoot).to.be.true;
    expect(itemB.isRoot).to.be.false;
    expect(itemC.isRoot).to.be.false;
    expect(itemD.isRoot).to.be.false;

    expect(itemA.rank).to.equal(3);
    expect(itemB.rank).to.equal(0);
    expect(itemC.rank).to.equal(1);
  });
});

describe('DisjointSet', () => {
  it('should throw error when trying to union and check not existing sets', () => {
    function mergeNotExistingSets() {
      const disjointSet = new DisjointSet();
      disjointSet.union('A', 'B');
    }

    function checkNotExistingSets() {
      const disjointSet = new DisjointSet();
      disjointSet.inSameSet('A', 'B');
    }

    expect(mergeNotExistingSets).to.throw();
    expect(checkNotExistingSets).to.throw();
  });

  it('should do basic manipulations on disjoint set', () => {
    const disjointSet = new DisjointSet();

    expect(disjointSet.find('A')).to.be.null;
    expect(disjointSet.find('B')).to.be.null;

    disjointSet.add('A');

    expect(disjointSet.find('A')).to.equal('A');
    expect(disjointSet.find('B')).to.be.null;

    disjointSet.add('B');

    expect(disjointSet.find('A')).to.equal('A');
    expect(disjointSet.find('B')).to.equal('B');

    disjointSet.add('C');

    expect(disjointSet.inSameSet('A', 'B')).to.be.false;

    disjointSet.union('A', 'B');

    expect(disjointSet.find('A')).to.equal('A');
    expect(disjointSet.find('B')).to.equal('A');
    expect(disjointSet.inSameSet('A', 'B')).to.be.true;
    expect(disjointSet.inSameSet('B', 'A')).to.be.true;
    expect(disjointSet.inSameSet('A', 'C')).to.be.false;

    disjointSet.union('A', 'A');

    disjointSet.union('B', 'C');

    expect(disjointSet.find('A')).to.equal('A');
    expect(disjointSet.find('B')).to.equal('A');
    expect(disjointSet.find('C')).to.equal('A');

    expect(disjointSet.inSameSet('A', 'B')).to.be.true;
    expect(disjointSet.inSameSet('B', 'C')).to.be.true;
    expect(disjointSet.inSameSet('A', 'C')).to.be.true;

    disjointSet
      .add('E')
      .add('F')
      .add('G')
      .add('H')
      .add('I');

    disjointSet
      .union('E', 'F')
      .union('F', 'G')
      .union('G', 'H')
      .union('H', 'I');

    expect(disjointSet.inSameSet('A', 'I')).to.be.false;
    expect(disjointSet.inSameSet('E', 'I')).to.be.true;

    disjointSet.union('I', 'C');

    expect(disjointSet.find('I')).to.equal('E');
    expect(disjointSet.inSameSet('A', 'I')).to.be.true;
  });

  it('should union smaller set with bigger one making bigger one to be new root', () => {
    const disjointSet = new DisjointSet();

    disjointSet
      .add('A')
      .add('B')
      .add('C')
      .union('B', 'C')
      .union('A', 'C');

    expect(disjointSet.find('A')).to.equal('B');
  });

  it('should do basic manipulations on disjoint set with custom key extractor', () => {
    const keyCallback = value => value.key;
    const disjointSet = new DisjointSet(keyCallback);

    const itemA = {
      key: 'A',
      value: 1
    };
    const itemB = {
      key: 'B',
      value: 2
    };
    const itemC = {
      key: 'C',
      value: 3
    };

    expect(disjointSet.find(itemA)).to.be.null;
    expect(disjointSet.find(itemB)).to.be.null;

    disjointSet.add(itemA);

    expect(disjointSet.find(itemA)).to.equal('A');
    expect(disjointSet.find(itemB)).to.be.null;

    disjointSet.add(itemB);

    expect(disjointSet.find(itemA)).to.equal('A');
    expect(disjointSet.find(itemB)).to.equal('B');

    disjointSet.add(itemC);

    expect(disjointSet.inSameSet(itemA, itemB)).to.be.false;

    disjointSet.union(itemA, itemB);

    expect(disjointSet.find(itemA)).to.equal('A');
    expect(disjointSet.find(itemB)).to.equal('A');
    expect(disjointSet.inSameSet(itemA, itemB)).to.be.true;
    expect(disjointSet.inSameSet(itemB, itemA)).to.be.true;
    expect(disjointSet.inSameSet(itemA, itemC)).to.be.false;

    disjointSet.union(itemA, itemC);

    expect(disjointSet.find(itemA)).to.equal('A');
    expect(disjointSet.find(itemB)).to.equal('A');
    expect(disjointSet.find(itemC)).to.equal('A');

    expect(disjointSet.inSameSet(itemA, itemB)).to.be.true;
    expect(disjointSet.inSameSet(itemB, itemC)).to.be.true;
    expect(disjointSet.inSameSet(itemA, itemC)).to.be.true;
  });
});