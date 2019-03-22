 const depthFirstSearch = require('./depthFirstSearch');

 /**
  * VertexData
  */
 class VertexData {

   /**
    * 
    * @param {number} discoveryTime discoveryTime
    * @param {number} children children
    * @param {number} lowDiscoveryTime lowDiscoveryTime
    */
   constructor(discoveryTime, lowDiscoveryTime = discoveryTime, children = 0) {
     this.discoverTime = discoveryTime;
     this.lowDiscoveryTime = lowDiscoveryTime;
     this.children = children;
   }
 }
 /**
  * Tarjan's algorithm for finding articulation points in graph.
  *
  * @param {Graph} graph graph
  * @return {Object} articulationPoints
  */
 function articulationPoints(graph) {
   let articulationPointsSet = new Set();
   let seen = new Map();
   let start = graph.allVertices[0];
   let discoverTime = 0;
   const callbacks = {
     entering: ({
       previous,
       current
     }) => {
       discoverTime++;
       seen.set(current, new VertexData(discoverTime));
       // set children of this vertex
       if (seen.has(previous)) {
         seen.get(previous).children++;
       }
     },
     entered: ({
       previous,
       current
     }) => {
       if (previous === null) {
         return;
       }
       // 更新当前current 的统计值
       let neighbors = current.neighbors;
       let data = seen.get(current);
       for (const neighbor of neighbors) {
         if (neighbor !== previous) {
           data.lowDiscoveryTime = Math.min(seen.get(neighbor).lowDiscoveryTime, data.lowDiscoveryTime);
         }
       }
       // 判断previous 是否是割点
       let previousData = seen.get(previous);
       if (previous === start) {
         // CASE: 1. previous vertex is root
         if (previousData.children > 1) {
           articulationPointsSet.add(previous);
         }
       } else {
         // CASE: 2. current 无法不通过 previous 到达previous 的父节点
         if ((data.lowDiscoveryTime >= previousData.discoverTime)) {
           articulationPointsSet.add(previous);
         }
       }
     },
     canTraverse: ({
       next
     }) => {
       return !seen.has(next);
     },
   };
   // Do Depth First Search traversal over submitted graph.
   depthFirstSearch(graph, start, callbacks);
   return Array.from(articulationPointsSet);
 }

 module.exports = articulationPoints;