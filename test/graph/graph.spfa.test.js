const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const spfa = require('../../src/graph/spfa');

describe('spfa', () => {
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
    graph
      .addVertex(vertexH)
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
      prev
    } = spfa(graph, vertexA);

    expect(dist).to.deep.equal({
      H: Infinity,
      A: 0,
      B: 4,
      E: 7,
      C: 3,
      D: 9,
      G: 12,
      F: 11,
    });

    expect(prev.F.value).to.equal('D');
    expect(prev.D.value).to.equal('B');
    expect(prev.B.value).to.equal('A');
    expect(prev.G.value).to.equal('E');
    expect(prev.C.value).to.equal('A');
    expect(prev.A).to.be.null;
    expect(prev.H).to.be.null;
  });

  it('should find minimum paths to all vertices for directed graph with negative edge weights', () => {
    const vertexS = new GraphVertex('S');
    const vertexE = new GraphVertex('E');
    const vertexA = new GraphVertex('A');
    const vertexD = new GraphVertex('D');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexH = new GraphVertex('H');

    const edgeSE = new GraphEdge(vertexS, vertexE, 8);
    const edgeSA = new GraphEdge(vertexS, vertexA, 10);
    const edgeED = new GraphEdge(vertexE, vertexD, 1);
    const edgeDA = new GraphEdge(vertexD, vertexA, -4);
    const edgeDC = new GraphEdge(vertexD, vertexC, -1);
    const edgeAC = new GraphEdge(vertexA, vertexC, 2);
    const edgeCB = new GraphEdge(vertexC, vertexB, -2);
    const edgeBA = new GraphEdge(vertexB, vertexA, 1);

    const graph = new Graph(true);
    graph
      .addVertex(vertexH)
      .addEdge(edgeSE)
      .addEdge(edgeSA)
      .addEdge(edgeED)
      .addEdge(edgeDA)
      .addEdge(edgeDC)
      .addEdge(edgeAC)
      .addEdge(edgeCB)
      .addEdge(edgeBA);

    const {
      dist,
      prev
    } = spfa(graph, vertexS);

    expect(dist).to.deep.equal({
      H: Infinity,
      S: 0,
      A: 5,
      B: 5,
      C: 7,
      D: 9,
      E: 8,
    });

    expect(prev.H).to.be.null;
    expect(prev.S).to.be.null;
    expect(prev.B.value).to.equal('C');
    expect(prev.C.value).to.equal('A');
    expect(prev.A.value).to.equal('D');
    expect(prev.D.value).to.equal('E');
  });
  
  it('should throw when find minimum paths but graph contains a negative-weight cycle', () => {
    const vertexS = new GraphVertex('S');
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeSA = new GraphEdge(vertexS, vertexA, 3);
    const edgeSB = new GraphEdge(vertexS, vertexB, 4);
    const edgeAB = new GraphEdge(vertexA, vertexB, -2);

    const graph = new Graph();
    graph
      .addEdge(edgeSA)
      .addEdge(edgeSB)
      .addEdge(edgeAB);

    expect(() => spfa(graph, vertexS)).to.throw();
  });


  it('should find minimum paths to all vertices for directed graph with negative edge weights', () => {
    const vertexS = new GraphVertex('S');
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeSA = new GraphEdge(vertexS, vertexA, 3);
    const edgeSB = new GraphEdge(vertexS, vertexB, 4);
    const edgeBA = new GraphEdge(vertexB, vertexA, -2);

    const graph = new Graph(true);
    graph
      .addEdge(edgeSA)
      .addEdge(edgeSB)
      .addEdge(edgeBA);

    const {
      dist,
      prev
    } = spfa(graph, vertexS);

    expect(dist).to.deep.equal({
      S: 0,
      A: 2,
      B: 4
    });

    expect(prev.S).to.be.null;
    expect(prev.A.value).to.equal('B');
    expect(prev.B.value).to.equal('S');
  });
});