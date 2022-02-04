import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { printTree } from "./index.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const map = new Map();

app.get("/", (req, res) => {
	res.send("hello");
});

app.post("/", (req, res) => {
	const { data, langIndex } = req.body;
	const obj = printTree(langIndex, data);
	map.set(obj["codeFingerprint"], obj["hashSet"]);
	res.send(obj);
});

app.post("/hashset", (req, res) => {
	const { codeFingerprint } = req.body;
	console.log(codeFingerprint);
	if (map.has(codeFingerprint)) res.send(map.get(codeFingerprint));
	else res.send("Hash Set does not exist for corresponding Code Fingerprint");
});

app.listen(8000, () => {
	console.log("Listening at port 8000");
});
