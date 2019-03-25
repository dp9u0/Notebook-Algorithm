/**
 * Graph
 */
class Graph {

  /**
   * Graph
   * @param {boolean} [isDirected=false] graph is directed or not
   */
  constructor(isDirected = false) {
    this._vertices = {};
    this._edges = {};
    this._isDirected = isDirected;
  }

  /**
   * add vertex
   * @param {GraphVertex} vertex vertex
   * @returns {Graph} this graph after add vertex
   */
  addVertex(vertex) {
    this._vertices[vertex.value] = vertex;
    return this;
  }

  /**
   * find vertex by value
   * @param {string} value value to find
   * @returns {GraphVertex|undefined} vertex found,if not found return undefined
   */
  findVertex(value) {
    return this._vertices[value];
  }

  /**
   * remove vertex from this graph
   * @param {GraphVertex} vertex vertex to remove
   * @returns {Graph} this graph after remove
   */
  removeVertex(vertex) {
    if (this._isDirected) {
      throw new Error('Donnot Support remove vertex in directed graph,because this may cause some bugs');
    }
    // Delete edge from the list of edges.
    if (this._vertices[vertex.value]) {
      // Try to remove edges.
      const edges = vertex.edges;
      for (const edge of edges) {
        this.removeEdge(edge);
      }
      delete this._vertices[vertex.value];
    } else {
      throw new Error('Vertex not found in graph');
    }
    return this;
  }

  /**
   * add edge to this graph
   * @param {GraphEdge} edge edge to add
   * @returns {Graph} this graph after add
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
   * remove edge from this graph
   * @param {GraphEdge} edge edge to remove
   * @returns {Graph} this graph after remove
   */
  removeEdge(edge) {
    // Delete edge from the list of edges.
    if (this._edges[edge.value]) {
      delete this._edges[edge.value];
      // Try to find and end start vertices and delete edge from them.
      const startVertex = this.findVertex(edge.startVertex.value);
      const endVertex = this.findVertex(edge.endVertex.value);
      startVertex.removeEdge(edge);
      endVertex.removeEdge(edge);
    } else {
      throw new Error('Edge not found in graph');
    }
    return this;
  }

  /**
   * find edge by vertex
   * @param {GraphVertex} startVertex startVertex
   * @param {GraphVertex} endVertex endVertex
   * @return {(GraphEdge|null)} edge found or null
   */
  findEdge(startVertex, endVertex) {
    const vertex = this.findVertex(startVertex.value);
    if (!vertex) {
      return null;
    }
    return vertex.findEdge(endVertex);
  }

  /**
   * get neighbors of vertex
   * this is a wrap if vertex.neighbors
   * @param {GraphVertex} vertex vertex to found neighbors
   * @returns {GraphVertex[]} neighbors
   */
  neighbors(vertex) {
    return vertex.neighbors;
  }

  /**
   * get all vertex of this graph
   * @return {GraphVertex[]} vertex
   */
  get allVertices() {
    return Object.values(this._vertices);
  }

  /**
   * get all edges of this graph
   * @return {GraphEdge[]} edges
   */
  get allEdges() {
    return Object.values(this._edges);
  }

  /**
   * weight of all edges
   * @return {number} weight
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
   * index of vertices
   * @return {object} map indexes
   */
  get verticesIndices() {
    const verticesIndices = {};
    this.allVertices.forEach((vertex, index) => {
      verticesIndices[vertex.value] = index;
    });
    return verticesIndices;
  }

  /**
   * to adjacency matrix
   * @return {*[][]} matrix
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
   * 是否是有向图
   */
  get isDirected() {
    return this._isDirected;
  }
  /**
   * toString
   * @return {string} string value
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
   * GraphEdge
   * 
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
   * start vertex
   * @return {GraphVertex} start vertex
   */
  get startVertex() {
    return this._startVertex;
  }

  /**
   * end vertex
   * @return {GraphVertex} end vertex
   */
  get endVertex() {
    return this._endVertex;
  }

  /**
   * weight of this edge
   * @return {number} weight
   */
  get weight() {
    return this._weight;
  }

  /**
   * get value string of `${start}_${end}`
   * @return {string} value string
   */
  get value() {
    const start = this.startVertex.value;
    const end = this.endVertex.value;
    return `${start}_${end}`;
  }

  /**
   * reverse graph edge vertex
   * @return {GraphEdge} this edge after reverse
   */
  reverse() {
    [this._startVertex, this._endVertex] = [this._endVertex, this._startVertex];
    return this;
  }

  /**
   * toString
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
   * GraphVertex
   * @param {*} value value of this vertex
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
   * addEdge to this vertex
   * 
   * @param {GraphEdge} edge edge to remove
   * @returns {GraphVertex} this value
   */
  addEdge(edge) {
    let index = this._edges.indexOf(edge);
    if (index !== -1) {
      // throw new Error("Cannot add edge already existed");
    } else {
      this._edges.push(edge);
    }
    return this;
  }

  /**
   * removeEdge to this vertex
   * @param {GraphEdge} edge edge to remove
   * @returns {GraphVertex} this value
   */
  removeEdge(edge) {
    let index = this._edges.indexOf(edge);
    if (index !== -1) {
      this._edges.splice(index, 1);
    } else {
      // throw new Error("Cannot remove edge not existed")
    }
    return this;
  }

  /**
   * get all neighbors
   * 
   * @returns {GraphVertex[]} neighbors of this vertex
   */
  get neighbors() {
    const edges = this._edges;
    /** 
     * map fn
     * @param {GraphEdge} edge input edge
     * */
    const neighborsConverter = (edge) => {
      return edge.startVertex === this ? edge.endVertex : edge.startVertex;
    };
    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter);
  }

  /**
   * getter for edges 
   * @return {GraphEdge[]} edges
   */
  get edges() {
    return [...this._edges];
  }

  /**
   * degree number of edges
   * @return {number} number of edges
   */
  get degree() {
    return this._edges.length;
  }

  /**
   * check if this vertex has edge
   * @param {GraphEdge} edge edge to find
   * @returns {boolean} have or not
   */
  hasEdge(edge) {
    let index = this._edges.indexOf(edge);
    return index !== -1;
  }

  /**
   *  check if this vertex has vertex as neighbor
   * @param {GraphVertex} vertex vertex as neighbor
   * @returns {boolean} have or not
   */
  hasNeighbor(vertex) {
    const vertices = this._edges.find(edge => edge.startVertex === vertex || edge.endVertex === vertex);
    return !!vertices;
  }

  /**
   * find edge to another neighbor vertex
   * @param {GraphVertex} vertex neighbor
   * @returns {(GraphEdge|null)} edge found or null
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
   * @returns {number} value
   */
  get value() {
    return this._value;
  }

  /**
   * remove all edges
   * @return {GraphVertex} this value after remove all edges
   */
  deleteAllEdges() {
    this.edges.forEach(edge => this.removeEdge(edge));
    return this;
  }

  /**
   * to string
   * @param {(value:any)=>string} [callback] callback fn to format value
   * @returns {string} string
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