const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const prim = require('../../src/graph/prim');

describe('prim', () => {
  it('should fire an error for directed graph', () => {
    expect(() => {
      const graph = new Graph(true);
      prim(graph);
    }).to.throw();
  });

  it('should find minimum spanning tree', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeAB = new GraphEdge(vertexA, vertexB, 2);
    const edgeAD = new GraphEdge(vertexA, vertexD, 3);
    const edgeAC = new GraphEdge(vertexA, vertexC, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 4);
    const edgeBE = new GraphEdge(vertexB, vertexE, 3);
    const edgeDF = new GraphEdge(vertexD, vertexF, 7);
    const edgeEC = new GraphEdge(vertexE, vertexC, 1);
    const edgeEF = new GraphEdge(vertexE, vertexF, 8);
    const edgeFG = new GraphEdge(vertexF, vertexG, 9);
    const edgeFC = new GraphEdge(vertexF, vertexC, 6);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBE)
      .addEdge(edgeDF)
      .addEdge(edgeEC)
      .addEdge(edgeEF)
      .addEdge(edgeFC)
      .addEdge(edgeFG);

    expect(graph.weight).to.equal(46);

    const mst = prim(graph);

    expect(mst.weight).to.equal(24);
    expect(mst.allVertices.length).to.equal(graph.allVertices.length);
    expect(mst.allEdges.length).to.equal(graph.allVertices.length - 1);
    // expect(mst.toString()).to.equal('E,C,A,B,D,F,G');
  });

  it('should find minimum spanning tree for simple graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 1);
    const edgeAD = new GraphEdge(vertexA, vertexD, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 1);
    const edgeBD = new GraphEdge(vertexB, vertexD, 3);
    const edgeCD = new GraphEdge(vertexC, vertexD, 1);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeCD);

    expect(graph.weight).to.equal(9);

    const mst = prim(graph);

    expect(mst.weight).to.equal(3);
    expect(mst.allVertices.length).to.equal(graph.allVertices.length);
    expect(mst.allEdges.length).to.equal(graph.allVertices.length - 1);
    // expect(mst.toString()).to.equal('C,D,A,B');
  });
});