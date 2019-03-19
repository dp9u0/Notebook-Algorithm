const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');

const expect = require("chai").expect;

describe('Graph', () => {
  it('should add vertices to graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    graph
      .addVertex(vertexA)
      .addVertex(vertexB);

    expect(graph.toString()).to.equal('A,B');
    expect(graph.findVertex(vertexA.value)).to.equal(vertexA);
    expect(graph.findVertex(vertexB.value)).to.equal(vertexB);
  });

  it('should add edges to undirected graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    expect(graph.allVertices.length).to.equal(2);
    expect(graph.allVertices[0]).to.equal(vertexA);
    expect(graph.allVertices[1]).to.equal(vertexB);

    const graphVertexA = graph.findVertex(vertexA.value);
    const graphVertexB = graph.findVertex(vertexB.value);

    expect(graph.toString()).to.equal('A,B');
    expect(graphVertexA).to.be.not.undefined;
    expect(graphVertexB).to.be.not.undefined;

    expect(graph.findVertex('not existing')).to.be.undefined;

    expect(graphVertexA.neighbors.length).to.equal(1);
    expect(graphVertexA.neighbors[0]).to.equal(vertexB);
    expect(graphVertexA.neighbors[0]).to.equal(graphVertexB);

    expect(graphVertexB.neighbors.length).to.equal(1);
    expect(graphVertexB.neighbors[0]).to.equal(vertexA);
    expect(graphVertexB.neighbors[0]).to.equal(graphVertexA);
  });

  it('should add edges to directed graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    const graphVertexA = graph.findVertex(vertexA.value);
    const graphVertexB = graph.findVertex(vertexB.value);

    expect(graph.toString()).to.equal('A,B');
    expect(graphVertexA).to.be.not.undefined;
    expect(graphVertexB).to.be.not.undefined;

    expect(graphVertexA.neighbors.length).to.equal(1);
    expect(graphVertexA.neighbors[0]).to.equal(vertexB);
    expect(graphVertexA.neighbors[0]).to.equal(graphVertexB);

    expect(graphVertexB.neighbors.length).to.equal(0);
  });

  it('should find edge by vertices in undirected graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    expect(graphEdgeAC).to.be.null;
    expect(graphEdgeCA).to.be.null;
    expect(graphEdgeAB).to.equal(edgeAB);
    expect(graphEdgeBA).to.equal(edgeAB);
    expect(graphEdgeAB.weight).to.equal(10);
  });

  it('should find edge by vertices in directed graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    expect(graphEdgeAC).to.be.null;
    expect(graphEdgeCA).to.be.null;
    expect(graphEdgeBA).to.be.null;
    expect(graphEdgeAB).to.equal(edgeAB);
    expect(graphEdgeAB.weight).to.equal(10);
  });

  it('should return vertex neighbors', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC);

    const neighbors = graph.neighbors(vertexA);

    expect(neighbors.length).to.equal(2);
    expect(neighbors[0]).to.equal(vertexB);
    expect(neighbors[1]).to.equal(vertexC);
  });

  it('should throw an error when trying to add edge twice', () => {
    function addSameEdgeTwice() {
      const graph = new Graph(true);

      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');

      const edgeAB = new GraphEdge(vertexA, vertexB);

      graph
        .addEdge(edgeAB)
        .addEdge(edgeAB);
    }

    expect(addSameEdgeTwice).to.throw();
  });

  it('should return the list of all added edges', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC);

    const edges = graph.allEdges;

    expect(edges.length).to.equal(2);
    expect(edges[0]).to.equal(edgeAB);
    expect(edges[1]).to.equal(edgeBC);
  });

  it('should calculate total graph weight for default graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeAD = new GraphEdge(vertexA, vertexD);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD);

    expect(graph.weight).to.equal(0);
  });

  it('should calculate total graph weight for weighted graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 1);
    const edgeBC = new GraphEdge(vertexB, vertexC, 2);
    const edgeCD = new GraphEdge(vertexC, vertexD, 3);
    const edgeAD = new GraphEdge(vertexA, vertexD, 4);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD);

    expect(graph.weight).to.equal(10);
  });

  it('should be possible to delete edges from graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC);

    expect(graph.allEdges.length).to.equal(3);

    graph.removeEdge(edgeAB);

    expect(graph.allEdges.length).to.equal(2);
    expect(graph.allEdges[0].value).to.equal(edgeBC.value);
    expect(graph.allEdges[1].value).to.equal(edgeAC.value);
  });

  it('should should throw an error when trying to delete not existing edge', () => {
    function deleteNotExistingEdge() {
      const graph = new Graph();

      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const vertexC = new GraphVertex('C');

      const edgeAB = new GraphEdge(vertexA, vertexB);
      const edgeBC = new GraphEdge(vertexB, vertexC);

      graph.addEdge(edgeAB);
      graph.removeEdge(edgeBC);
    }

    expect(deleteNotExistingEdge).to.throw();
  });

  it('should be possible to delete vertex from graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC);

    expect(graph.allEdges.length).to.equal(3);
    expect(graph.allVertices.length).to.equal(3);

    graph.removeVertex(vertexA);

    expect(graph.allEdges.length).to.equal(1);
    expect(graph.allVertices.length).to.equal(2);
    expect(graph.allEdges[0].value).to.equal(edgeBC.value);
  });

  it('should should throw an error when trying to delete not existing vertex', () => {
    function deleteNotExistingEdge() {
      const graph = new Graph();
      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const vertexC = new GraphVertex('C');
      graph.addVertex(vertexA).addVertex(vertexB);
      graph.removeVertex(vertexC);
    }

    expect(deleteNotExistingEdge).to.throw();
  });

  it('should be possible to reverse graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph(true);
    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeCD);

    expect(graph.toString()).to.equal('A,B,C,D');
    expect(graph.allEdges.length).to.equal(3);
    expect(graph.neighbors(vertexA).length).to.equal(2);
    expect(graph.neighbors(vertexA)[0].value).to.equal(vertexB.value);
    expect(graph.neighbors(vertexA)[1].value).to.equal(vertexC.value);
    expect(graph.neighbors(vertexB).length).to.equal(0);
    expect(graph.neighbors(vertexC).length).to.equal(1);
    expect(graph.neighbors(vertexC)[0].value).to.equal(vertexD.value);
    expect(graph.neighbors(vertexD).length).to.equal(0);

    graph.reverse();

    expect(graph.toString()).to.equal('A,B,C,D');
    expect(graph.allEdges.length).to.equal(3);
    expect(graph.neighbors(vertexA).length).to.equal(0);
    expect(graph.neighbors(vertexB).length).to.equal(1);
    expect(graph.neighbors(vertexB)[0].value).to.equal(vertexA.value);
    expect(graph.neighbors(vertexC).length).to.equal(1);
    expect(graph.neighbors(vertexC)[0].value).to.equal(vertexA.value);
    expect(graph.neighbors(vertexD).length).to.equal(1);
    expect(graph.neighbors(vertexD)[0].value).to.equal(vertexC.value);
  });

  it('should return vertices indices', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeBD = new GraphEdge(vertexB, vertexD);

    const graph = new Graph();
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const verticesIndices = graph.verticesIndices;
    expect(verticesIndices).to.deep.equal({
      A: 0,
      B: 1,
      C: 2,
      D: 3,
    });
  });

  it('should generate adjacency matrix for undirected graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeBD = new GraphEdge(vertexB, vertexD);

    const graph = new Graph();
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const adjacencyMatrix = graph.toAdjacencyMatrix();
    expect(adjacencyMatrix).to.deep.equal([
      [Infinity, 0, Infinity, Infinity],
      [0, Infinity, 0, 0],
      [Infinity, 0, Infinity, 0],
      [Infinity, 0, 0, Infinity],
    ]);
  });

  it('should generate adjacency matrix for directed graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 2);
    const edgeBC = new GraphEdge(vertexB, vertexC, 1);
    const edgeCD = new GraphEdge(vertexC, vertexD, 5);
    const edgeBD = new GraphEdge(vertexB, vertexD, 7);

    const graph = new Graph(true);
    graph.addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD);

    const adjacencyMatrix = graph.toAdjacencyMatrix();
    expect(adjacencyMatrix).to.deep.equal([
      [Infinity, 2, Infinity, Infinity],
      [Infinity, Infinity, 1, 7],
      [Infinity, Infinity, Infinity, 5],
      [Infinity, Infinity, Infinity, Infinity],
    ]);
  });
});