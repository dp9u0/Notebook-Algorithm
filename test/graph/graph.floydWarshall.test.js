const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const floydWarshall = require('../../src/graph/floydWarshall');

describe('floydWarshall', () => {
  it('should find minimum paths to all vertices for undirected graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB, 4);
    const edgeAE = new GraphEdge(vertexA, vertexE, 7);
    const edgeAC = new GraphEdge(vertexA, vertexC, 3);
    const edgeBC = new GraphEdge(vertexB, vertexC, 6);
    const edgeBD = new GraphEdge(vertexB, vertexD, 5);
    const edgeEC = new GraphEdge(vertexE, vertexC, 8);
    const edgeED = new GraphEdge(vertexE, vertexD, 2);
    const edgeDC = new GraphEdge(vertexD, vertexC, 11);
    const edgeDG = new GraphEdge(vertexD, vertexG, 10);
    const edgeDF = new GraphEdge(vertexD, vertexF, 2);
    const edgeFG = new GraphEdge(vertexF, vertexG, 3);
    const edgeEG = new GraphEdge(vertexE, vertexG, 5);

    const graph = new Graph();

    // Add vertices first just to have them in desired order.
    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD)
      .addVertex(vertexE)
      .addVertex(vertexF)
      .addVertex(vertexG)
      .addVertex(vertexH);

    // Now, when vertices are in correct order let's add edges.
    graph
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAC)
      .addEdge(edgeBC)
      .addEdge(edgeBD)
      .addEdge(edgeEC)
      .addEdge(edgeED)
      .addEdge(edgeDC)
      .addEdge(edgeDG)
      .addEdge(edgeDF)
      .addEdge(edgeFG)
      .addEdge(edgeEG);

    const {
      dist,
      next
    } = floydWarshall(graph);

    const vertices = graph.allVertices;

    const vertexAIndex = vertices.indexOf(vertexA);
    const vertexBIndex = vertices.indexOf(vertexB);
    const vertexCIndex = vertices.indexOf(vertexC);
    const vertexDIndex = vertices.indexOf(vertexD);
    const vertexEIndex = vertices.indexOf(vertexE);
    const vertexFIndex = vertices.indexOf(vertexF);
    const vertexGIndex = vertices.indexOf(vertexG);
    const vertexHIndex = vertices.indexOf(vertexH);

    expect(dist[vertexAIndex][vertexHIndex]).to.equal(Infinity);
    expect(dist[vertexAIndex][vertexAIndex]).to.equal(0);
    expect(dist[vertexAIndex][vertexBIndex]).to.equal(4);
    expect(dist[vertexAIndex][vertexEIndex]).to.equal(7);
    expect(dist[vertexAIndex][vertexCIndex]).to.equal(3);
    expect(dist[vertexAIndex][vertexDIndex]).to.equal(9);
    expect(dist[vertexAIndex][vertexGIndex]).to.equal(12);
    expect(dist[vertexAIndex][vertexFIndex]).to.equal(11);

    expect(next[vertexAIndex][vertexFIndex]).to.equal(vertexD);
    expect(next[vertexAIndex][vertexDIndex]).to.equal(vertexB);
    expect(next[vertexAIndex][vertexBIndex]).to.equal(vertexA);
    expect(next[vertexAIndex][vertexGIndex]).to.equal(vertexE);
    expect(next[vertexAIndex][vertexCIndex]).to.equal(vertexA);
    expect(next[vertexAIndex][vertexAIndex]).to.be.null;
    expect(next[vertexAIndex][vertexHIndex]).to.be.null;
  });

  it('should find minimum paths to all vertices for directed graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 3);
    const edgeBA = new GraphEdge(vertexB, vertexA, 8);
    const edgeAD = new GraphEdge(vertexA, vertexD, 7);
    const edgeDA = new GraphEdge(vertexD, vertexA, 2);
    const edgeBC = new GraphEdge(vertexB, vertexC, 2);
    const edgeCA = new GraphEdge(vertexC, vertexA, 5);
    const edgeCD = new GraphEdge(vertexC, vertexD, 1);

    const graph = new Graph(true);

    // Add vertices first just to have them in desired order.
    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD);

    // Now, when vertices are in correct order let's add edges.
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBA)
      .addEdge(edgeAD)
      .addEdge(edgeDA)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeCD);

    const {
      dist,
      next
    } = floydWarshall(graph);

    const vertices = graph.allVertices;

    const vertexAIndex = vertices.indexOf(vertexA);
    const vertexBIndex = vertices.indexOf(vertexB);
    const vertexCIndex = vertices.indexOf(vertexC);
    const vertexDIndex = vertices.indexOf(vertexD);

    expect(dist[vertexAIndex][vertexAIndex]).to.equal(0);
    expect(dist[vertexAIndex][vertexBIndex]).to.equal(3);
    expect(dist[vertexAIndex][vertexCIndex]).to.equal(5);
    expect(dist[vertexAIndex][vertexDIndex]).to.equal(6);

    expect(dist).to.deep.equal([
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ]);

    expect(next[vertexAIndex][vertexDIndex]).to.equal(vertexC);
    expect(next[vertexAIndex][vertexCIndex]).to.equal(vertexB);
    expect(next[vertexBIndex][vertexDIndex]).to.equal(vertexC);
    expect(next[vertexAIndex][vertexAIndex]).to.be.null;
    expect(next[vertexAIndex][vertexBIndex]).to.equal(vertexA);
  });

  it('should find minimum paths to all vertices for directed graph with negative edge weights', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeFE = new GraphEdge(vertexF, vertexE, 8);
    const edgeFA = new GraphEdge(vertexF, vertexA, 10);
    const edgeED = new GraphEdge(vertexE, vertexD, 1);
    const edgeDA = new GraphEdge(vertexD, vertexA, -4);
    const edgeDC = new GraphEdge(vertexD, vertexC, -1);
    const edgeAC = new GraphEdge(vertexA, vertexC, 2);
    const edgeCB = new GraphEdge(vertexC, vertexB, -2);
    const edgeBA = new GraphEdge(vertexB, vertexA, 1);

    const graph = new Graph(true);

    // Add vertices first just to have them in desired order.
    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD)
      .addVertex(vertexE)
      .addVertex(vertexF)
      .addVertex(vertexG);

    // Now, when vertices are in correct order let's add edges.
    graph
      .addEdge(edgeFE)
      .addEdge(edgeFA)
      .addEdge(edgeED)
      .addEdge(edgeDA)
      .addEdge(edgeDC)
      .addEdge(edgeAC)
      .addEdge(edgeCB)
      .addEdge(edgeBA);

    const {
      dist,
      next
    } = floydWarshall(graph);

    const vertices = graph.allVertices;

    const vertexAIndex = vertices.indexOf(vertexA);
    const vertexBIndex = vertices.indexOf(vertexB);
    const vertexCIndex = vertices.indexOf(vertexC);
    const vertexDIndex = vertices.indexOf(vertexD);
    const vertexEIndex = vertices.indexOf(vertexE);
    const vertexGIndex = vertices.indexOf(vertexG);
    const vertexFIndex = vertices.indexOf(vertexF);

    expect(dist[vertexFIndex][vertexGIndex]).to.equal(Infinity);
    expect(dist[vertexFIndex][vertexFIndex]).to.equal(0);
    expect(dist[vertexFIndex][vertexAIndex]).to.equal(5);
    expect(dist[vertexFIndex][vertexBIndex]).to.equal(5);
    expect(dist[vertexFIndex][vertexCIndex]).to.equal(7);
    expect(dist[vertexFIndex][vertexDIndex]).to.equal(9);
    expect(dist[vertexFIndex][vertexEIndex]).to.equal(8);

    expect(next[vertexFIndex][vertexGIndex]).to.be.null;
    expect(next[vertexFIndex][vertexFIndex]).to.be.null;
    expect(next[vertexAIndex][vertexBIndex]).to.equal(vertexC);
    expect(next[vertexAIndex][vertexCIndex]).to.equal(vertexA);
    expect(next[vertexFIndex][vertexBIndex]).to.equal(vertexE);
    expect(next[vertexEIndex][vertexBIndex]).to.equal(vertexD);
    expect(next[vertexDIndex][vertexBIndex]).to.equal(vertexC);
    expect(next[vertexCIndex][vertexBIndex]).to.equal(vertexC);
  });
});