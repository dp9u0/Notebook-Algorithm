const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const detectCycle = require('../../src/graph/detectCycle');

describe('DetectCycle', () => {

  it('should detect directed cycle', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeDA = new GraphEdge(vertexD, vertexA);
    const edgeDE = new GraphEdge(vertexD, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC)
      .addEdge(edgeDA)
      .addEdge(edgeDE)
      .addEdge(edgeEF);

    expect(detectCycle(graph)).to.be.null;

    graph.addEdge(edgeFD);

    expect(detectCycle(graph)).to.deep.equal({
      D: vertexF,
      F: vertexE,
      E: vertexD,
    });
  });

  it('should detect directed cycle #2', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeBA = new GraphEdge(vertexB, vertexA);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC);

    expect(detectCycle(graph)).to.be.null;

    graph.addEdge(edgeBA);

    expect(detectCycle(graph)).to.deep.equal({
      A: vertexB,
      B: vertexA
    });
  });
  
  it('should detect undirected cycle', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');

    const edgeAF = new GraphEdge(vertexA, vertexF);
    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBE = new GraphEdge(vertexB, vertexE);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeDE = new GraphEdge(vertexD, vertexE);

    const graph = new Graph();
    graph
      .addEdge(edgeAF)
      .addEdge(edgeAB)
      .addEdge(edgeBE)
      .addEdge(edgeBC)
      .addEdge(edgeCD);

    expect(detectCycle(graph)).to.be.null;

    graph.addEdge(edgeDE);

    expect(detectCycle(graph)).to.deep.equal({
      B: vertexC,
      C: vertexD,
      D: vertexE,
      E: vertexB,
    });
  });
});