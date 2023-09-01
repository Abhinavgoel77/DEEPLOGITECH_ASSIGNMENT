const fs = require('fs');

function getConnectionObject(filename) {
  const connections = {};

  const fileContents = fs.readFileSync(filename, 'utf8');
  const lines = fileContents.split('\n');

  for (let line of lines) {
    const [sourceNode, targets] = line.split('->').map((s) => s.trim());
    const targetNodes = targets.split(',').map((s) => s.trim());
    connections[sourceNode] = targetNodes;
  }

  return connections;
}

function distanceBetweenNodes(connections, startNode, endNode) {
  const queue = [{ node: startNode, distance: 0 }];
  const visited = new Set();

  while (queue.length > 0) {
    const { node, distance } = queue.shift();

    if (node === endNode) {
      return distance;
    }

    if (!visited.has(node)) {
      visited.add(node);
      const neighbors = connections[node] || [];

      for (const neighbor of neighbors) {
        queue.push({ node: neighbor, distance: distance + 1 });
      }
    }
  }

  return -1; 
}

function main(){
    const connectionsFile = process.argv[2];
    const startNode = process.argv[3];
    const endNode = process.argv[4];
    
    const connections = getConnectionObject(connectionsFile);
    console.log(connections);
    const distance = distanceBetweenNodes(connections, startNode, endNode);
    const distance1 = distanceBetweenNodes(connections, endNode, startNode);
    
    
    if (distance !== -1) {
      console.log(`Shortest distance between ${startNode} and ${endNode} is ${distance}`);
    }
    else if(distance1 !== -1){
        console.log(`Shortest distance between ${startNode} and ${endNode} is ${distance1}`);
    }
    else {
      console.log(`No path found between ${startNode} and ${endNode}`);
    }
}

main();

