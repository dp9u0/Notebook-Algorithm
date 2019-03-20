const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const breadthFirstSearch = require('../../src/graph/breadthFirstSearch')

const expect = require("chai").expect;

describe('breadthFirstSearch', () => {
  it('should perform BFS operation on graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCG = new GraphEdge(vertexC, vertexG);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeDH = new GraphEdge(vertexD, vertexH);
    const edgeGH = new GraphEdge(vertexG, vertexH);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDH)
      .addEdge(edgeGH);

    expect(graph.toString()).to.equal('A,B,C,G,D,E,F,H');

    let enteringCalled = 0;
    let enteredCalled = 0;
    let enteringCalledInput = [];
    let enteredCalledInput = [];
    const entering = (vertices) => {
      enteringCalledInput.push(vertices)
      enteringCalled++;
    };
    const entered = (vertices) => {
      enteredCalledInput.push(vertices);
      enteredCalled++;;
    };

    // Traverse graphs without callbacks first.
    breadthFirstSearch(graph, vertexA);

    // Traverse graph with enterVertex and leaveVertex callbacks.
    breadthFirstSearch(graph, vertexA, {
      entering,
      entered,
    });

    expect(enteringCalled).to.equal(8);
    expect(enteredCalled).to.equal(8);

    const enteringVertexParamsMap = [{
        current: vertexA,
        previous: null
      },
      {
        current: vertexB,
        previous: vertexA
      },
      {
        current: vertexD,
        previous: vertexB
      },
      {
        current: vertexE,
        previous: vertexD
      },
      {
        current: vertexC,
        previous: vertexE
      },
      {
        current: vertexH,
        previous: vertexC
      },
      {
        current: vertexF,
        previous: vertexH
      },
      {
        current: vertexG,
        previous: vertexF
      },
    ];


    const enteredVertexParamsMap = [{
        current: vertexA,
        previous: null
      },
      {
        current: vertexB,
        previous: vertexA
      },
      {
        current: vertexD,
        previous: vertexB
      },
      {
        current: vertexE,
        previous: vertexD
      },
      {
        current: vertexC,
        previous: vertexE
      },
      {
        current: vertexH,
        previous: vertexC
      },
      {
        current: vertexF,
        previous: vertexH
      },
      {
        current: vertexG,
        previous: vertexF
      },
    ];

    for (let index = 0; index < graph.allVertices.length; index += 1) {
      const params = enteringCalledInput[index];
      expect(params.current).to.equal(enteringVertexParamsMap[index].current);
      expect(params.previous).to.equal(enteringVertexParamsMap[index].previous);

      const params2 = enteredCalledInput[index];
      expect(params2.current).to.equal(enteredVertexParamsMap[index].current);
      expect(params2.previous).to.equal(enteredVertexParamsMap[index].previous);
    }
  });

  it('should allow to create custom vertex visiting logic', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCG = new GraphEdge(vertexC, vertexG);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeDH = new GraphEdge(vertexD, vertexH);
    const edgeGH = new GraphEdge(vertexG, vertexH);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDH)
      .addEdge(edgeGH);

    expect(graph.toString()).to.equal('A,B,C,G,D,E,F,H');

    let enteringCalled = 0;
    let enteredCalled = 0;
    let enteringCalledInput = [];
    let enteredCalledInput = [];
    const entering = (vertices) => {
      enteringCalledInput.push(vertices)
      enteringCalled++;
    };
    const entered = (vertices) => {
      enteredCalledInput.push(vertices);
      enteredCalled++;;
    };

    // Traverse graph with enterVertex and leaveVertex callbacks.
    breadthFirstSearch(graph, vertexA, {
      entering,
      entered,
      canTraverse: ({
        previous,
        current,
        next
      }) => {
        return !(current === vertexA && next === vertexB);
      },
    });

    expect(enteringCalled).to.equal(7);
    expect(enteredCalled).to.equal(7);

    const enteringVertexParamsMap = [{
        current: vertexA,
        previous: null
      },
      {
        current: vertexD,
        previous: vertexA
      },
      {
        current: vertexE,
        previous: vertexD
      },
      {
        current: vertexH,
        previous: vertexE
      },
      {
        current: vertexF,
        previous: vertexH
      },
      {
        current: vertexD,
        previous: vertexF
      },
      {
        current: vertexH,
        previous: vertexD
      },
    ];


    const enteredVertexParamsMap = [{
        current: vertexA,
        previous: null
      },
      {
        current: vertexD,
        previous: vertexA
      },
      {
        current: vertexE,
        previous: vertexD
      },
      {
        current: vertexH,
        previous: vertexE
      },
      {
        current: vertexF,
        previous: vertexH
      },
      {
        current: vertexD,
        previous: vertexF
      },
      {
        current: vertexH,
        previous: vertexD
      },
    ];

    for (let index = 0; index < 7; index += 1) {
      const params = enteringCalledInput[index];
      expect(params.current).to.equal(enteringVertexParamsMap[index].current);
      expect(params.previous).to.equal(enteringVertexParamsMap[index].previous);
      const params2 = enteredCalledInput[index];
      expect(params2.current).to.equal(enteredVertexParamsMap[index].current);
      expect(params2.previous).to.equal(enteredVertexParamsMap[index].previous);
    }
  });
});