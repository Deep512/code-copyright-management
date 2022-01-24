import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { printTree } from "./index.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("hello");
});

app.post("/", (req, res) => {
	const { data, langIndex } = req.body;
	const obj = printTree(langIndex, data);
	res.send(obj);
});

app.listen(8000, () => {
	console.log("Listening at port 8000");
});
