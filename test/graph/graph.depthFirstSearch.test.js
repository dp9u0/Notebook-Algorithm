const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const depthFirstSearch = require('../../src/graph/depthFirstSearch')

const expect = require("chai").expect;

describe('depthFirstSearch', () => {
  it('should perform DFS operation on graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCG = new GraphEdge(vertexC, vertexG);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeDG = new GraphEdge(vertexD, vertexG);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDG);

    expect(graph.toString()).to.equal('A,B,C,G,D,E,F');

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

    // Traverse graphs without callbacks first to check default ones.
    depthFirstSearch(graph, vertexA);

    // Traverse graph with enterVertex and leaveVertex callbacks.
    depthFirstSearch(graph, vertexA, {
      entering: entering,
      entered: entered,
    });

    expect(enteringCalled).to.equal(graph.allVertices.length);
    expect(enteredCalled).to.equal(graph.allVertices.length);

    const enterVertexParamsMap = [{
        current: vertexA,
        previous: null
      },
      {
        current: vertexB,
        previous: vertexA
      },
      {
        current: vertexC,
        previous: vertexB
      },
      {
        current: vertexG,
        previous: vertexC
      },
      {
        current: vertexD,
        previous: vertexA
      },
      {
        current: vertexE,
        previous: vertexA
      },
      {
        current: vertexF,
        previous: vertexE
      },
    ];

    const enteredVertexParamsMap = [{
        current: vertexG,
        previous: vertexC
      },
      {
        current: vertexC,
        previous: vertexB
      },
      {
        current: vertexB,
        previous: vertexA
      },
      {
        current: vertexD,
        previous: vertexA
      },
      {
        current: vertexF,
        previous: vertexE
      },
      {
        current: vertexE,
        previous: vertexA
      },
      {
        current: vertexA,
        previous: null
      },
    ];
    for (let index = 0; index < graph.allVertices.length; index += 1) {
      const params = enteringCalledInput[index];
      expect(params.current).to.equal(enterVertexParamsMap[index].current);
      expect(params.previous).to.equal(enterVertexParamsMap[index].previous);

      const params2 = enteredCalledInput[index];
      expect(params2.current).to.equal(enteredVertexParamsMap[index].current);
      expect(params2.previous).to.equal(enteredVertexParamsMap[index].previous);
    }

  });

  it('allow users to redefine vertex visiting logic', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCG = new GraphEdge(vertexC, vertexG);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeDG = new GraphEdge(vertexD, vertexG);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDG);

    expect(graph.toString()).to.equal('A,B,C,G,D,E,F');

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

    depthFirstSearch(graph, vertexA, {
      entering: entering,
      entered: entered,
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
        current: vertexG,
        previous: vertexD
      },
      {
        current: vertexE,
        previous: vertexA
      },
      {
        current: vertexF,
        previous: vertexE
      },
      {
        current: vertexD,
        previous: vertexF
      },
      {
        current: vertexG,
        previous: vertexD
      },
    ];
    const enteredVertexParamsMap = [{
        current: vertexG,
        previous: vertexD
      },
      {
        current: vertexD,
        previous: vertexA
      },
      {
        current: vertexG,
        previous: vertexD
      },
      {
        current: vertexD,
        previous: vertexF
      },
      {
        current: vertexF,
        previous: vertexE
      },
      {
        current: vertexE,
        previous: vertexA
      },
      {
        current: vertexA,
        previous: null
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
});