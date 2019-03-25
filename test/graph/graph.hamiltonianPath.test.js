const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const hamiltonianPath = require('../../src/graph/hamiltonianPath');

describe('hamiltonianPath', () => {
  it('should not found hamiltonian Path', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeAD = new GraphEdge(vertexA, vertexD);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeAD);

    let paths = hamiltonianPath(graph);
    expect(paths.length).to.equal(0);
  })

  it('should found hamiltonian Path', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD);

    let paths = hamiltonianPath(graph);
    expect(paths.length).to.equal(2);
    for (const path of paths) {
      expect(path.length).to.equal(graph.allVertices.length);
    }

  })

  it('should found hamiltonian Path in cycle graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeDA = new GraphEdge(vertexD, vertexA);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeDA)

    let paths = hamiltonianPath(graph);
    expect(paths.length).to.equal(8);
    for (const path of paths) {
      expect(path.length).to.equal(graph.allVertices.length);
    }

  })
})