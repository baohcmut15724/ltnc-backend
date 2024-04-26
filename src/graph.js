import Graph from "graphology";
import fs from "fs";
import { dijkstra } from "graphology-shortest-path";

export let graph = new Graph({ type: "undirected" });

const filePath = "src\\tinhthanh.txt"; // Thay đổi đường dẫn tới tệp tin .txt tại đây
fs.readFile(filePath, "utf8", function (err, contents) {
  // console.log("hamchay");
  if (err) {
    console.error(err);
    return;
  }
  const lines = contents.split("\n");
  // // console.log(lines.length);

  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].trim().split(" ");
    if (words.length > 0) {
      const vertex = words[0];
      graph.addNode(vertex);
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].trim().split(" ");
    for (let j = 1; j < words.length; j++) {
      const temp = words[j].trim().split(",");
      for (let k = 0; k < temp.length; k++) {
        const startIndex = temp[k].indexOf("("); // Tìm vị trí của dấu "("
        const target = temp[k].substring(0, startIndex).trim(); // Lấy chuỗi từ đầu đến trước dấu "("
        const value = parseInt(
          temp[k].substring(startIndex + 1, temp[k].length - 1)
        );
        const name = words[0] + target;
        if (!graph.hasEdge(words[0], target) && target != "")
          graph.addEdgeWithKey(name, words[0], target, { weight: value });
      }
    }
  }
});

export function findShortestPath(start, end) {
  const path = dijkstra.bidirectional(graph, start, end);
  // console.log(path);
  let totalWeight = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const source = path[i];
    const target = path[i + 1];
    const edge = graph.edge(source, target);
    const weight = graph.getEdgeAttribute(edge, "weight");
    totalWeight += weight;
  }
  // console.log(totalWeight);
  return {
    path,
    totalWeight,
  };
}
