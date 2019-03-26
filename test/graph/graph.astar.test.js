const {
  Graph,
  GraphVertex,
  GraphEdge
} = require('../../src/graph/Graph');
const expect = require("chai").expect;

const astar = require('../../src/graph/astar');

/**
 * matrixToGraph
 * @param {number[][]]} matrix 
 */
function matrixToGraph(matrix) {
  let graph = new Graph();
  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    for (let j = 0; j < line.length; j++) {
      let vertexi_j = graph.findVertex(`${i}_${j}`) || new GraphVertex(`${i}_${j}`);
      graph.addVertex(vertexi_j);
      if (matrix[i][j] === 1) {
        if (((j + 1) < line.length) && matrix[i][j + 1] === 1) {
          let vertexi_j1 = graph.findVertex(`${i}_${j + 1}`) || new GraphVertex(`${i}_${j + 1}`);
          let edge = new GraphEdge(vertexi_j, vertexi_j1, 1);
          graph.addVertex(vertexi_j1).addEdge(edge);
        }

        if (((i + 1) < matrix.length) && matrix[i + 1][j] === 1) {
          let vertexi1_j = graph.findVertex(`${i + 1}_${j}`) || new GraphVertex(`${i + 1}_${j}`);
          let edge = new GraphEdge(vertexi_j, vertexi1_j, 1);
          graph.addVertex(vertexi1_j).addEdge(edge);
        }
      }
    }
  }
  return graph;
}

/**
 * 
 * @param {GraphVertex} first 
 * @param {GraphVertex} second 
 */
function h(first, second) {
  let [x1, y1] = first.value.split('_');
  let [x2, y2] = second.value.split('_');
  let xdist = Math.abs(x2 - x1);
  let ydist = Math.abs(y2 - y1);
  if (xdist > ydist) {
    [ydist, xdist] = [xdist, ydist];
  }
  return xdist * 1.4 + (ydist - xdist);
}

describe('astar', () => {
  it('should not find minimum paths from start to end', () => {
    let graph = matrixToGraph([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
    ]);
    let vertices = graph.allVertices;
    let {
      dist,
      prev
    } = astar(graph, vertices[0], vertices[vertices.length - 1], h);
    expect(dist[vertices[vertices.length - 1]]).to.be.undefined;
    expect(prev[vertices[vertices.length - 1]]).to.be.undefined;

  })

  it('should find minimum paths from start to end', () => {
    let graph = matrixToGraph([
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]);
    let vertices = graph.allVertices;
    let {
      dist,
      prev
    } = astar(graph, vertices[0], vertices[vertices.length - 1], h);
    expect(dist[vertices[vertices.length - 1]]).to.be.equal(18);
  });
})