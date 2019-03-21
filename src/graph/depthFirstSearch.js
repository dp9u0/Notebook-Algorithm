/* eslint-disable no-unused-vars */
// const {
//   Graph,
//   GraphVertex
// } = require('./Graph');

/**
 * @typedef {Object} TraverseVertices
 * @property {GraphVertex} [current=null] - current vertex traverse
 * @property {GraphVertex} [previous=null] - previous vertex traverse
 * @property {GraphVertex} [next=null] - next vertex traverse
 */

/**
 * @typedef {Object} VertexTraverseCallbacks
 * @property {(vertices: TraverseVertices)=>boolean} [canTraverse] - Determines whether should traverse next vertex
 * @property {(vertices: TraverseVertices)=>void} [entering] - Called when enters the vertex.
 * @property {(vertices: TraverseVertices)=>void} [entered] - Called when leaves the vertex.
 */

/**
 * 
 * init callbacks
 * @param {VertexTraverseCallbacks} callbacks callbacks to init
 * @returns {VertexTraverseCallbacks} callbacks after inited
 */
function initCallbacks(callbacks) {
  const noop = () => {};
  const seen = new Set(); // NOTE: closure,to record vertex has been traversed
  /**
   * allow traversal current vertex
   * @param {TraverseVertices} param0 
   */
  const canTraverseCallback = ({
    next
  }) => {
    if (!seen.has(next)) {
      seen.add(next);
      return true;
    }
    return false;
  };
  callbacks.canTraverse = callbacks.canTraverse || canTraverseCallback;
  callbacks.entered = callbacks.entered || noop;
  callbacks.entering = callbacks.entering || noop;
  return callbacks;
}

/**
 * Depth First Search Recursive
 * @param {Graph} graph graph to search
 * @param {GraphVertex} current vertex 
 * @param {GraphVertex} previous vertex 
 * @param {VertexTraverseCallbacks} callbacks callbacks when traverse
 */
function depthFirstSearch(graph, current, previous, callbacks) {
  callbacks.entering({
    current,
    previous
  })
  let neighbors = graph.neighbors(current);
  for (const next of neighbors) {
    // traverse next
    if (callbacks.canTraverse({
        current,
        previous,
        next
      })) {
      depthFirstSearch(graph, next, current, callbacks);
    }
  }
  callbacks.entered({
    current,
    previous
  })

}

/**
 * dfs graph
 * @param {Graph} graph graph to search
 * @param {GraphVertex} start vertex start
 * @param {VertexTraverseCallbacks} callbacks callbacks when traverse
 */
function dfs(graph, start, callbacks = {}) {
  callbacks = initCallbacks(callbacks);
  depthFirstSearch(graph, start, null, callbacks);
}

module.exports = dfs;