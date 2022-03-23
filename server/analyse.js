import { printTree } from "./index.js";
import Jaccard from "jaccard-index";

import fs from "fs";
var files = fs.readdirSync("./data/cpp");

var jaccard = Jaccard();

var hs1, hs2;
var jaccAns = [];

hs1 = printTree(1, `./data/cpp/${files[10]}`);
hs2 = printTree(1, `./data/cpp/${files[0]}`);
jaccAns.push(jaccard.index(hs1, hs2));
console.log(jaccAns);

// for (var i = 0; i < 10; i++) {
//   jaccAns.push(printTree(2, `./data/cpp/${files[i]}`));
// }
// for (var i = 0; i < 10; i++) {
//   var temp = [];
//   for (var j = 0; j < 10; j++) {
//     hs1 = printTree(2, `./data/cpp/${files[i]}`);
//     hs2 = printTree(2, `./data/cpp/${files[j]}`);
//     temp.push(jaccard.jaccardSimilarity(hs1, hs2));
//   }
//   ans.push(temp);
// }
