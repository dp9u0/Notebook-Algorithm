/**
 * Graph
 */
class Graph {

  /**
   * 是否是有向图
   * @param {boolean} isDirected
   */
  constructor(isDirected = false) {
    this._vertices = {};
    this._edges = {};
    this._isDirected = isDirected;
  }

  /**
   * @param {GraphVertex} newVertex
   * @returns {Graph}
   */
  addVertex(newVertex) {
    this._vertices[newVertex.value] = newVertex;
    return this;
  }

  /**
   * @param {string} vertexValue find Vertex by value
   * @returns GraphVertex
   */
  findVertex(vertexValue) {
    return this._vertices[vertexValue];
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {GraphVertex[]}
   */
  neighbors(vertex) {
    return vertex.neighbors;
  }

  /**
   * @return {GraphVertex[]}
   */
  get allVertices() {
    return Object.values(this._vertices);
  }

  /**
   * @return {GraphEdge[]}
   */
  get allEdges() {
    return Object.values(this._edges);
  }

  /**
   * @param {GraphEdge} edge
   * @returns {Graph}
   */
  addEdge(edge) {
    // Try to find and end start vertices.
    let startVertex = this.findVertex(edge.startVertex.value);
    let endVertex = this.findVertex(edge.endVertex.value);

    // Insert start vertex if it wasn't inserted.
    if (!startVertex) {
      this.addVertex(edge.startVertex);
      startVertex = this.findVertex(edge.startVertex.value);
    }

    // Insert end vertex if it wasn't inserted.
    if (!endVertex) {
      this.addVertex(edge.endVertex);
      endVertex = this.findVertex(edge.endVertex.value);
    }

    // Check if edge has been already added.
    if (this._edges[edge.value]) {
      throw new Error('Edge has already been added before');
    } else {
      this._edges[edge.value] = edge;
    }

    // Add edge to the vertices.
    if (this._isDirected) {
      // If graph IS directed then add the edge only to start vertex.
      startVertex.addEdge(edge);
    } else {
      // If graph ISN'T directed then add the edge to both vertices.
      startVertex.addEdge(edge);
      endVertex.addEdge(edge);
    }

    return this;
  }

  /**
   * @param {GraphEdge} edge
   */
  removeEdge(edge) {
    // Delete edge from the list of edges.
    if (this._edges[edge.value]) {
      delete this._edges[edge.value];
    } else {
      throw new Error('Edge not found in graph');
    }
    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.findVertex(edge.startVertex.value);
    const endVertex = this.findVertex(edge.endVertex.value);
    startVertex.removeEdge(edge);
    endVertex.removeEdge(edge);
  }

  /**
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @return {(GraphEdge|null)}
   */
  findEdge(startVertex, endVertex) {
    const vertex = this.findVertex(startVertex.value);
    if (!vertex) {
      return null;
    }
    return vertex.findEdge(endVertex);
  }

  /**
   * @return {number}
   */
  get weight() {
    return this.allEdges.reduce((weight, graphEdge) => {
      return weight + graphEdge.weight;
    }, 0);
  }

  /**
   * Reverse all the edges in directed graph.
   * @return {Graph}
   */
  reverse() {
    /** @param {GraphEdge} edge */
    this.allEdges.forEach((edge) => {
      // Delete straight edge from graph and from vertices.
      this.removeEdge(edge);
      // Reverse the edge.
      edge.reverse();
      // Add reversed edge back to the graph and its vertices.
      this.addEdge(edge);
    });

    return this;
  }

  /**
   * @return {object}
   */
  get verticesIndices() {
    const verticesIndices = {};
    this.allVertices.forEach((vertex, index) => {
      verticesIndices[vertex.value] = index;
    });
    return verticesIndices;
  }

  /**
   * @return {*[][]}
   */
  toAdjacencyMatrix() {
    const vertices = this.allVertices;
    const verticesIndices = this.verticesIndices;
    // Init matrix with infinities meaning that there is no ways of
    // getting from one vertex to another yet.
    const adjacencyMatrix = Array(vertices.length).fill(null).map(() => {
      return Array(vertices.length).fill(Infinity);
    });
    // Fill the columns.
    vertices.forEach((vertex, vertexIndex) => {
      vertex.neighbors.forEach((neighbor) => {
        const neighborIndex = verticesIndices[neighbor.value];
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(vertex, neighbor).weight;
      });
    });
    return adjacencyMatrix;
  }

  /**
   * @return {string}
   */
  toString() {
    return Object.keys(this._vertices).toString();
  }
}

/**
 * GraphEdge
 */
class GraphEdge {

  /**
   * @param {GraphVertex} startVertex startVertex
   * @param {GraphVertex} endVertex endVertex
   * @param {number} [weight=0] weight default 0
   */
  constructor(startVertex, endVertex, weight = 0) {
    /**
     * @type {GraphVertex}
     */
    this._startVertex = startVertex;
    /**
     * @type {GraphVertex}
     */
    this._endVertex = endVertex;
    this._weight = weight;
  }

  /**
   * 
   */
  get startVertex() {
    return this._startVertex;
  }

  /**
   * 
   */
  get endVertex() {
    return this._endVertex;
  }

  /**
   * 
   */
  get weight() {
    return this._weight;
  }

  /**
   * get value string of `${start}_${end}`
   * @return {string}
   */
  get value() {
    const start = this.startVertex.value;
    const end = this.endVertex.value;
    return `${start}_${end}`;
  }

  /**
   * reverse graph edge vertex
   * @return {GraphEdge}
   */
  reverse() {
    [this._startVertex, this._endVertex] = [this._endVertex, this._startVertex];
    return this;
  }

  /**
   * @return {string}
   */
  toString() {
    return this.value;
  }
}

/**
 * GraphVertex
 */
class GraphVertex {

  /**
   * @param {*} value
   */
  constructor(value) {
    if (value === undefined) {
      throw new Error('Graph vertex must have a value');
    }
    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this._value = value;
    this._edges = [];
  }

  /**
   * @param {GraphEdge} edge
   * @returns {GraphVertex}
   */
  addEdge(edge) {
    this._edges.push(edge);
    return this;
  }

  /**
   * @param {GraphEdge} edge
   */
  removeEdge(edge) {
    let index = this._edges.indexOf(edge);
    if (index !== -1) {
      this._edges.splice(index, 1);
    }
  }

  /**
   * @returns {GraphVertex[]}
   */
  get neighbors() {
    const edges = this._edges;
    /** @param {GraphEdge} edge */
    const neighborsConverter = (edge) => {
      return edge.startVertex === this ? edge.endVertex : edge.startVertex;
    };
    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  /**
   * @return {GraphEdge[]}
   */
  get edges() {
    return [...this._edges];
  }

  /**
   * @return {number}
   */
  get degree() {
    return this._edges.length;
  }

  /**
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge) {
    let index = this._edges.indexOf(requiredEdge);
    return index !== -1;
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex) {
    const vertices = this._edges.find(edge => edge.startVertex === vertex || edge.endVertex === vertex);
    return !!vertices;
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {(GraphEdge|null)}
   */
  findEdge(vertex) {
    const edgeFinder = (edge) => {
      return edge.startVertex === vertex || edge.endVertex === vertex;
    };
    const edge = this._edges.find(edgeFinder);
    return edge ? edge : null;
  }

  /**
   * value
   */
  get value() {
    return this._value;
  }

  /**
   * @return {GraphVertex}
   */
  deleteAllEdges() {
    this.edges.forEach(edge => this.removeEdge(edge));
    return this;
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  toString(callback) {
    return callback ? callback(this._value) : `${this._value}`;
  }
}

module.exports = {
  Graph,
  GraphVertex,
  GraphEdge
}