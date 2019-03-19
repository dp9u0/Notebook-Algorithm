const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');

const expect = require("chai").expect;

describe('GraphVertex', () => {
  it('should throw an error when trying to create vertex without value', () => {
    let vertex = null;

    function createEmptyVertex() {
      vertex = new GraphVertex();
    }
    expect(vertex).to.be.null;
    expect(createEmptyVertex).to.throw();
  });

  it('should create graph vertex', () => {
    const vertex = new GraphVertex('A');
    expect(vertex).to.not.be.undefined;
    expect(vertex.value).to.equal('A');
    expect(vertex.toString()).to.equal('A');
    expect(vertex.edges.toString()).to.equal('');
    expect(vertex.edges).to.be.empty;
  });

  it('should add edges to vertex and check if it exists', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.hasEdge(edgeAB)).to.be.true;
    expect(vertexB.hasEdge(edgeAB)).to.be.false;
    expect(vertexA.edges.length).to.equal(1);
    expect(vertexA.edges[0].toString()).to.equal('A_B');
  });

  it('should delete edges from vertex', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA.addEdge(edgeAB).addEdge(edgeAC);

    expect(vertexA.hasEdge(edgeAB)).to.be.true;
    expect(vertexB.hasEdge(edgeAB)).to.be.false;

    expect(vertexA.hasEdge(edgeAC)).to.be.true;
    expect(vertexC.hasEdge(edgeAC)).to.be.false;

    expect(vertexA.edges.length).to.equal(2);

    expect(vertexA.edges[0].toString()).to.equal('A_B');
    expect(vertexA.edges[1].toString()).to.equal('A_C');

    vertexA.removeEdge(edgeAB);
    expect(vertexA.hasEdge(edgeAB)).to.be.false;
    expect(vertexA.hasEdge(edgeAC)).to.be.true;
    expect(vertexA.edges[0].toString()).to.equal('A_C');

    vertexA.removeEdge(edgeAC);
    expect(vertexA.hasEdge(edgeAB)).to.be.false;
    expect(vertexA.hasEdge(edgeAC)).to.be.false;
    expect(vertexA.edges.length).to.equal(0);
  });

  it('should delete all edges from vertex', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    expect(vertexA.hasEdge(edgeAB)).to.be.true;
    expect(vertexB.hasEdge(edgeAB)).to.be.false;

    expect(vertexA.hasEdge(edgeAC)).to.be.true;
    expect(vertexC.hasEdge(edgeAC)).to.be.false;
    expect(vertexA.edges.length).to.equal(2);
    vertexA.deleteAllEdges();
    expect(vertexA.hasEdge(edgeAB)).to.be.false;
    expect(vertexB.hasEdge(edgeAB)).to.be.false;
    expect(vertexA.hasEdge(edgeAC)).to.be.false;
    expect(vertexC.hasEdge(edgeAC)).to.be.false;

    expect(vertexA.edges.length).to.equal(0);
  });

  it('should return vertex neighbors in case if current node is start one', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    vertexA
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    expect(vertexB.neighbors).to.be.empty;

    const neighbors = vertexA.neighbors;

    expect(neighbors.length).to.equal(2);
    expect(neighbors[0]).to.equal(vertexB);
    expect(neighbors[1]).to.equal(vertexC);
  });

  it('should return vertex neighbors in case if current node is end one', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeBA = new GraphEdge(vertexB, vertexA);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    vertexA
      .addEdge(edgeBA)
      .addEdge(edgeCA);
    expect(vertexB.neighbors).to.be.empty;
    const neighbors = vertexA.neighbors;

    expect(neighbors.length).to.equal(2);
    expect(neighbors[0]).to.equal(vertexB);
    expect(neighbors[1]).to.equal(vertexC);
  });

  it('should check if vertex has specific neighbor', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.hasNeighbor(vertexB)).to.be.true;
    expect(vertexA.hasNeighbor(vertexC)).to.be.false;
  });

  it('should edge by vertex', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.findEdge(vertexB)).to.equal(edgeAB);
    expect(vertexA.findEdge(vertexC)).to.be.null;
  });

  it('should calculate vertex degree', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    expect(vertexA.degree).to.equal(0);

    const edgeAB = new GraphEdge(vertexA, vertexB);
    vertexA.addEdge(edgeAB);

    expect(vertexA.degree).to.equal(1);

    const edgeBA = new GraphEdge(vertexB, vertexA);
    vertexA.addEdge(edgeBA);

    expect(vertexA.degree).to.equal(2);

    const edgeAB2 = new GraphEdge(vertexA, vertexB);

    vertexA.addEdge(edgeAB2);
    expect(vertexA.degree).to.equal(3);

    expect(vertexA.edges.length).to.equal(3);
  });

  it('should throw error when add same edge to vertex', () => {
    function addSameEdge() {
      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const edgeAB = new GraphEdge(vertexA, vertexB);
      vertexA.addEdge(edgeAB);
      vertexA.addEdge(edgeAB);
    }

    expect(addSameEdge).to.throw();
  })
});