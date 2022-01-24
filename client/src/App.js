import React, { useState, useEffect } from "react";
import PlagiarismContract from "./contracts/PlagiarismContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
	const [lang, setLang] = useState(null);
	const [file, setFile] = useState(null);
	const [web3, setWeb3] = useState(null);
	const [contract, setContract] = useState(null);
	const [accounts, setAccounts] = useState(null);
	const [hashSet, setHashSet] = useState(null);
	const [codeFingerprint, setCodeFingerprint] = useState(null);

	const langIndexes = {
		java: 0,
		python: 1,
		cpp: 2,
		js: 3,
	};

	useEffect(() => {
		async function fetchData() {
			try {
				// Get network provider and web3 instance.
				const web3 = await getWeb3();

				// Use web3 to get the user's accounts.
				const accounts = await web3.eth.getAccounts();

				// Get the contract instance.
				const networkId = await web3.eth.net.getId();
				const deployedNetwork = PlagiarismContract.networks[networkId];
				const instance = new web3.eth.Contract(
					PlagiarismContract.abi,
					deployedNetwork && deployedNetwork.address
				);

				// Set web3, accounts, and contract to the state
				setWeb3(web3);
				setContract(instance);
				setAccounts(accounts);
			} catch (error) {
				// Catch any errors for any of the above operations.
				alert(
					`Failed to load web3, accounts, or contract. Check console for details.`
				);
				console.error(error);
			}
		}

		if (!codeFingerprint) {
			fetchData();
		} else {
			sendToContract();
		}
	}, [codeFingerprint]);

	const sendToContract = async () => {
		await contract.methods
			.uploadFile(
				256,
				"uidsfkjdsfkjsd",
				"jskdfjk.js",
				"js file",
				codeFingerprint,
				["4444"]
			)
			.send({ from: accounts[0] });

		var res = await contract.methods.fileCount().call();
		console.log(res);
	};

	var onLangChange = (e) => {
		setLang(e.target.value);
	};

	var onFileChange = async (e) => {
		setFile(e.target.files[0]);
	};

	var onSubmit = () => {
		if (!file || !lang || lang === "Select") {
			console.log("Please choose a language and upload the file properly");
			return;
		}
		let text;
		const reader = new FileReader();
		reader.onload = async (e) => {
			text = e.target.result;
			console.log(text);
			const langIndex = langIndexes[lang];
			fetch("http://localhost:8000", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: text,
					langIndex: langIndex,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setHashSet(data["hashSet"]);
					setCodeFingerprint(data["codeFingerprint"]);
				});
		};
		reader.readAsText(file);
		console.log("SUBMITTED");
	};

	return web3 ? (
		<div className="App">
			<header>Code Copyright and Code Plagiarism Detection</header>
			<br />
			<label htmlFor="language">Select the language</label>
			<select name="language" id="language" onChange={(e) => onLangChange(e)}>
				<option value="Select">Select</option>
				<option value="js">Javascript</option>
				<option value="cpp">C++</option>
				<option value="java">JAVA</option>
				<option value="python">Python</option>
			</select>
			<br />
			<label htmlFor="codeFile">Upload the Code File here: </label>
			<input
				type="file"
				className="codeFileInput"
				onChange={(e) => onFileChange(e)}
			></input>
			<br />
			<button type="submit" onClick={onSubmit}>
				Submit
			</button>
		</div>
	) : (
		<div>Loading Web3, accounts, and contract...</div>
	);
}

export default App;
