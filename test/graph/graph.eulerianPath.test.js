const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const eulerianPath = require('../../src/graph/eulerianPath');

describe('eulerianPath', () => {
  it('should throw an error when graph is not Eulerian', () => {
    function findEulerianPathInNotEulerianGraph() {
      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const vertexC = new GraphVertex('C');
      const vertexD = new GraphVertex('D');
      const vertexE = new GraphVertex('E');

      const edgeAB = new GraphEdge(vertexA, vertexB);
      const edgeAC = new GraphEdge(vertexA, vertexC);
      const edgeBC = new GraphEdge(vertexB, vertexC);
      const edgeBD = new GraphEdge(vertexB, vertexD);
      const edgeCE = new GraphEdge(vertexC, vertexE);

      const graph = new Graph();

      graph
        .addEdge(edgeAB)
        .addEdge(edgeAC)
        .addEdge(edgeBC)
        .addEdge(edgeBD)
        .addEdge(edgeCE);

      eulerianPath(graph);
    }
    expect(findEulerianPathInNotEulerianGraph).to.throw();
  });

  it('should throw an error when graph is not Eulerian#2', () => {
    function findEulerianPathInNotEulerianGraph() {
      const vertexA = new GraphVertex('A');
      const vertexB = new GraphVertex('B');
      const vertexC = new GraphVertex('C');
      const vertexE = new GraphVertex('E');

      const edgeAB = new GraphEdge(vertexA, vertexB);
      const edgeCE = new GraphEdge(vertexC, vertexE);

      const graph = new Graph();

      graph
        .addEdge(edgeAB)
        .addEdge(edgeCE);

      eulerianPath(graph);
    }
    expect(findEulerianPathInNotEulerianGraph).to.throw();
  });

  it('should find Eulerian Circuit in graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeAF = new GraphEdge(vertexA, vertexF);
    const edgeAG = new GraphEdge(vertexA, vertexG);
    const edgeGF = new GraphEdge(vertexG, vertexF);
    const edgeBE = new GraphEdge(vertexB, vertexE);
    const edgeEB = new GraphEdge(vertexE, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeED = new GraphEdge(vertexE, vertexD);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAE)
      .addEdge(edgeAF)
      .addEdge(edgeAG)
      .addEdge(edgeGF)
      .addEdge(edgeBE)
      .addEdge(edgeEB)
      .addEdge(edgeBC)
      .addEdge(edgeED)
      .addEdge(edgeCD);

    const graphEdgesCount = graph.allEdges.length;

    const eulerianPathSet = eulerianPath(graph);

    expect(eulerianPathSet.length).to.equal(graphEdgesCount + 1);

    expect(eulerianPathSet[0].value).to.equal(vertexA.value);
    expect(eulerianPathSet[1].value).to.equal(vertexB.value);
    expect(eulerianPathSet[2].value).to.equal(vertexE.value);
    expect(eulerianPathSet[3].value).to.equal(vertexB.value);
    expect(eulerianPathSet[4].value).to.equal(vertexC.value);
    expect(eulerianPathSet[5].value).to.equal(vertexD.value);
    expect(eulerianPathSet[6].value).to.equal(vertexE.value);
    expect(eulerianPathSet[7].value).to.equal(vertexA.value);
    expect(eulerianPathSet[8].value).to.equal(vertexF.value);
    expect(eulerianPathSet[9].value).to.equal(vertexG.value);
    expect(eulerianPathSet[10].value).to.equal(vertexA.value);
  });

  it('should find Eulerian Path in graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDC = new GraphEdge(vertexD, vertexC);
    const edgeCE = new GraphEdge(vertexC, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFH = new GraphEdge(vertexF, vertexH);
    const edgeFG = new GraphEdge(vertexF, vertexG);
    const edgeHG = new GraphEdge(vertexH, vertexG);

    const graph = new Graph();

    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeBD)
      .addEdge(edgeDC)
      .addEdge(edgeCE)
      .addEdge(edgeEF)
      .addEdge(edgeFH)
      .addEdge(edgeFG)
      .addEdge(edgeHG);

    const graphEdgesCount = graph.allEdges.length;

    const eulerianPathSet = eulerianPath(graph);

    expect(eulerianPathSet.length).to.equal(graphEdgesCount + 1);

    expect(eulerianPathSet[0].value).to.equal(vertexC.value);
    expect(eulerianPathSet[1].value).to.equal(vertexA.value);
    expect(eulerianPathSet[2].value).to.equal(vertexB.value);
    expect(eulerianPathSet[3].value).to.equal(vertexD.value);
    expect(eulerianPathSet[4].value).to.equal(vertexC.value);
    expect(eulerianPathSet[5].value).to.equal(vertexE.value);
    expect(eulerianPathSet[6].value).to.equal(vertexF.value);
    expect(eulerianPathSet[7].value).to.equal(vertexH.value);
    expect(eulerianPathSet[8].value).to.equal(vertexG.value);
    expect(eulerianPathSet[9].value).to.equal(vertexF.value);
  });
});