/**
 * DisjointSetNode
 */
class DisjointSetNode {

  /**
   * DisjointSetNode
   * @param {*} value value
   * @param {(value: *)=>any} keyCallback keyCallback
   */
  constructor(value, keyCallback) {
    this._value = value;
    this._keyCallback = keyCallback || ((value) => value);
    this._parent = null;
    this._children = new Map();
  }

  /**
   * getter for key
   * @return {*} key
   */
  get key() {
    return this._keyCallback(this._value);
  }

  /**
   * getter for value
   * @return {*} value
   */
  get value() {
    return this._value;
  }

  /**
   * root node
   * @return {DisjointSetNode} root
   */
  get root() {
    return this.isRoot ? this : this._parent.root;
  }

  /**
   * if this node is root
   * @return {boolean} true or false
   */
  get isRoot() {
    return this._parent === null;
  }

  /**
   * Rank : the number of all ancestors.
   * @return {number} Rank
   */
  get rank() {
    if (!this.children.length) {
      return 0;
    }
    // TODO: OPT: update rank when add children
    let rank = 0;
    for (const child of this.children) {
      rank += 1;
      rank += child.rank;
    }
    return rank;
  }

  /**
   * get all children
   * @return {DisjointSetNode[]}
   */
  get children() {
    let children = [];
    for (const [, value] of this._children.entries()) {
      children.push(value);
    }
    return children;
  }

  /**
   * add child to this node
   * @param {DisjointSetNode} child child
   * @return {DisjointSetNode} this node
   */
  addChild(child) {
    this._children.set(child.key, child);
    child.setParent(this, false);
    return this;
  }

  /**
   * set parent
   * @param {*} parent  parent
   * @param {*} forceSetChild  set this as parent' child
   */
  setParent(parent, forceSetChild = true) {
    this._parent = parent;
    if (forceSetChild) {
      parent.addChild(this);
    }
    return this;
  }
}

/**
 * DisjointSet
 */
class DisjointSet {

  /**
   * @param {(value: *)=>any} [keyCallback] keyCallback
   */
  constructor(keyCallback) {
    this._keyCallback = keyCallback || ((value) => value);
    this._nodes = new Map();
  }

  /**
   * add node to this.set
   * @param {*} value
   * @return {DisjointSet}
   */
  add(value) {
    let key = this._keyCallback(value);
    if (!this._nodes.has(key)) {
      this._nodes.set(key, new DisjointSetNode(value, this._keyCallback));
    }
    return this;
  }

  /**
   * Find root node key of value
   * @param {*} value
   * @return {(string|null)}
   */
  find(value) {
    let key = this._keyCallback(value);
    if (!this._nodes.has(key)) {
      return null;
    }
    return this._nodes.get(key).root.key;
  }

  /**
   * Union by rank.
   * @param {*} valueA
   * @param {*} valueB
   * @return {DisjointSet}
   */
  union(valueA, valueB) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);
    if (!rootKeyA || !rootKeyB) {
      throw new Error('One or two values are not in sets');
    }
    if (rootKeyA === rootKeyB) {
      // In case if both elements are already in the same set then just return its key.
      return this;
    }
    const rootA = this._nodes.get(rootKeyA);
    const rootB = this._nodes.get(rootKeyB);
    if (rootA.rank < rootB.rank) {
      // If rootB's tree is bigger then make rootB to be a new root.
      rootB.addChild(rootA);
      return this;
    }
    // If rootA's tree is bigger then make rootA to be a new root.
    rootA.addChild(rootB);
    return this;
  }

  /**
   * 
   * @param {*} valueA
   * @param {*} valueB
   * @return {boolean}
   */
  inSameSet(valueA, valueB) {
    const rootKeyA = this.find(valueA);
    const rootKeyB = this.find(valueB);
    if (!rootKeyA || !rootKeyB) {
      throw new Error('One or two values are not in sets');
    }
    return rootKeyA === rootKeyB;
  }
}

module.exports = {
  DisjointSet,
  DisjointSetNode
}