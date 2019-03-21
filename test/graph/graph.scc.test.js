const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const stronglyConnectedComponents = require('../../src/graph/strongly-connected-components');
const expect = require("chai").expect;

describe('stronglyConnectedComponents', () => {
  it('should detect strongly connected components in simple graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph(true);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeCD);


    const components = stronglyConnectedComponents(graph);

    expect(components.length).to.equal(2);
    expect(components[0][0].value).to.equal(vertexD.value);
    expect(components[1][0].value).to.equal(vertexC.value);
    expect(components[1][1].value).to.equal(vertexB.value);
    expect(components[1][2].value).to.equal(vertexA.value);
  });


  it('should detect strongly connected components in simple graph(Kosaraju)', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph(true);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeCD);

    const components = stronglyConnectedComponents(graph, false);
    expect(components.length).to.equal(2);
    expect(components[0][0].value).to.equal(vertexD.value);
    expect(components[1][0].value).to.equal(vertexC.value);
    expect(components[1][1].value).to.equal(vertexB.value);
    expect(components[1][2].value).to.equal(vertexA.value);
  });

  it('should detect strongly connected components in graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');
    const vertexI = new GraphVertex('I');
    const vertexJ = new GraphVertex('J');
    const vertexK = new GraphVertex('K');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDE = new GraphEdge(vertexD, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeGF = new GraphEdge(vertexG, vertexF);
    const edgeGH = new GraphEdge(vertexG, vertexH);
    const edgeHI = new GraphEdge(vertexH, vertexI);
    const edgeIJ = new GraphEdge(vertexI, vertexJ);
    const edgeJG = new GraphEdge(vertexJ, vertexG);
    const edgeJK = new GraphEdge(vertexJ, vertexK);

    const graph = new Graph(true);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeBD)
      .addEdge(edgeDE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeGF)
      .addEdge(edgeGH)
      .addEdge(edgeHI)
      .addEdge(edgeIJ)
      .addEdge(edgeJG)
      .addEdge(edgeJK);

    const components = stronglyConnectedComponents(graph);
    expect(components.length).to.equal(4);


    expect(components[0][0].value).to.equal(vertexF.value);
    expect(components[0][1].value).to.equal(vertexE.value);
    expect(components[0][2].value).to.equal(vertexD.value);


    expect(components[1][0].value).to.equal(vertexC.value);
    expect(components[1][1].value).to.equal(vertexB.value);
    expect(components[1][2].value).to.equal(vertexA.value);

    expect(components[2][0].value).to.equal(vertexK.value);

    expect(components[3][0].value).to.equal(vertexJ.value);
    expect(components[3][1].value).to.equal(vertexI.value);
    expect(components[3][2].value).to.equal(vertexH.value);
    expect(components[3][3].value).to.equal(vertexG.value);
  });

  it('should detect strongly connected components in graph(Kosaraju)', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');
    const vertexI = new GraphVertex('I');
    const vertexJ = new GraphVertex('J');
    const vertexK = new GraphVertex('K');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCA = new GraphEdge(vertexC, vertexA);
    const edgeBD = new GraphEdge(vertexB, vertexD);
    const edgeDE = new GraphEdge(vertexD, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeGF = new GraphEdge(vertexG, vertexF);
    const edgeGH = new GraphEdge(vertexG, vertexH);
    const edgeHI = new GraphEdge(vertexH, vertexI);
    const edgeIJ = new GraphEdge(vertexI, vertexJ);
    const edgeJG = new GraphEdge(vertexJ, vertexG);
    const edgeJK = new GraphEdge(vertexJ, vertexK);

    const graph = new Graph(true);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCA)
      .addEdge(edgeBD)
      .addEdge(edgeDE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeGF)
      .addEdge(edgeGH)
      .addEdge(edgeHI)
      .addEdge(edgeIJ)
      .addEdge(edgeJG)
      .addEdge(edgeJK);

    const components = stronglyConnectedComponents(graph, false);

    expect(components.length).to.equal(4);

    expect(components[0][0].value).to.equal(vertexK.value);

    expect(components[1][0].value).to.equal(vertexF.value);
    expect(components[1][1].value).to.equal(vertexE.value);
    expect(components[1][2].value).to.equal(vertexD.value);

    expect(components[2][0].value).to.equal(vertexJ.value);
    expect(components[2][1].value).to.equal(vertexI.value);
    expect(components[2][2].value).to.equal(vertexH.value);
    expect(components[2][3].value).to.equal(vertexG.value);

    expect(components[3][0].value).to.equal(vertexC.value);
    expect(components[3][1].value).to.equal(vertexB.value);
    expect(components[3][2].value).to.equal(vertexA.value);
  });
});