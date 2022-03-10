import antlr4 from "antlr4";
import Java8Lexer from "./tools/java/Java8Lexer.js";
import Java8Parser from "./tools/java/Java8Parser.js";
import JavaScriptLexer from "./tools/javascript/JavaScriptLexer.js";
import JavaScriptParser from "./tools/javascript/JavaScriptParser.js";
import Python3Lexer from "./tools/python/Python3Lexer.js";
import Python3Parser from "./tools/python/Python3Parser.js";

import CPP14Lexer from "./tools/cpp/CPP14Lexer.js";
import CPP14Parser from "./tools/cpp/CPP14Parser.js";
import fs from "fs";

import { getHashSet } from "./hashSet.js";
import { getNGrams } from "./nGrams.js";
import { getCodeFingerprint } from "./codeFingerprint.js";
class Visitor {
	languageParsers = [Java8Parser, Python3Parser, CPP14Parser, JavaScriptParser];
	constructor(languageIndex) {
		this.languageIndex = languageIndex;
		this.listOfRuleNamesIndices = [];
		this.listOfRuleNames = [];
	}

	getRuleNames() {
		return this.listOfRuleNames;
	}
	getRuleNamesIndices() {
		return this.listOfRuleNamesIndices;
	}
	visitChildren(ctx) {
		if (!ctx) {
			return;
		}
		if (ctx.children) {
			let toIgnore =
				ctx.children.length >= 1 &&
				ctx.children[0] instanceof antlr4.ParserRuleContext;

			if (!toIgnore) {
				let ruleName =
					this.languageParsers[this.languageIndex].ruleNames[ctx.ruleIndex];
				console.log(ruleName + " -> " + ctx.getText());
				this.listOfRuleNames.push(ruleName);
				this.listOfRuleNamesIndices.push(ctx.ruleIndex);
			}

			return ctx.children.map((child) => {
				if (child.children && child.children.length != 0) {
					return child.accept(this);
				} else {
					return child.getText();
				}
			});
		}
	}
}

const sourceCodeFileNames = [
	"java_source_code.java",
	"python_source_code.py",
	"cpp_source_code.cpp",
	"js_source_code.js",
];

function getJavaParser(chars) {
	const lexer = new Java8Lexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new Java8Parser(tokens);
	return parser;
}

function getJavaScriptParser(chars) {
	const lexer = new JavaScriptLexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new JavaScriptParser(tokens);
	return parser;
}

function getPythonParser(chars) {
	const lexer = new Python3Lexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new Python3Parser(tokens);
	return parser;
}

function getCPPParser(chars) {
	const lexer = new CPP14Lexer(chars);
	const tokens = new antlr4.CommonTokenStream(lexer);
	const parser = new CPP14Parser(tokens);
	return parser;
}

function printTree(languageIndex, input) {
	//   var fname = sourceCodeFileNames[languageIndex];
	//   const input = fs.readFileSync(`./source_code/${fname}`, "utf8");
	// const input = fs.readFileSync(fileName, "utf8");
	const chars = new antlr4.InputStream(input);
	var parser;
	var tree;
	switch (languageIndex) {
		case 0:
			parser = getJavaParser(chars);
			parser.buildParseTrees = true;
			tree = parser.classDeclaration();
			break;
		case 1:
			parser = getPythonParser(chars);
			parser.buildParseTrees = true;
			tree = parser.compound_stmt();
			break;
		case 2:
			parser = getCPPParser(chars);
			parser.buildParseTrees = true;
			tree = parser.compoundStatement();
			break;
		case 3:
			parser = getJavaScriptParser(chars);
			parser.buildParseTrees = true;
			tree = parser.program();
	}

	var visitorObject = new Visitor(languageIndex);
	tree.accept(visitorObject);

	var ruleNamesIndices = visitorObject.getRuleNamesIndices();
	// console.log("rulenameIndices", ruleNamesIndices);
	// console.log("Rule names : \n", visitorObject.getRuleNames());

	//Define n
	var n = 4;

	//Get N-Grams
	var nArr = getNGrams(ruleNamesIndices, n);
	// console.log(nArr);

	// Encrypt using MD5 and get HashSet
	var hashSet = getHashSet(nArr);
	console.log("Hash Set:", hashSet);

	// Encrypt the HashSet using SHA256 and get the Code Fingerprint
	var codeFingerprint = getCodeFingerprint(hashSet);
	console.log("Code Fingerprint:", codeFingerprint);

	return {
		hashSet,
		codeFingerprint,
	};
}
export { printTree };
