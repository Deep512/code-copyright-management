import React, { useState, useEffect } from "react";
import PlagiarismContract from "./contracts/PlagiarismContract.json";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";
import "./App.css";
import DragDrop from "./components/DragDrop";
import Events from "./components/Events";
import Files from "./components/Files";
import PlagiarismReport from "./components/PlagiarismReport";

function App() {
	const [lang, setLang] = useState(null);
	const [file, setFile] = useState(null);
	const [web3, setWeb3] = useState(null);
	const [contract, setContract] = useState(null);
	const [accounts, setAccounts] = useState(null);
	const [hashSet, setHashSet] = useState(null);
	const [codeFingerprint, setCodeFingerprint] = useState(null);
	const [buffer, setBuffer] = useState(null);
	const [ipfsHash, setIpfsHash] = useState("");
	const [data, setData] = useState("");
	const [newFile, setNewFile] = useState(0);
	const [events, setEvents] = useState([]);
	const [event, setEvent] = useState(null);
	const [result, setResult] = useState(null);
	const [plagiarismReport, setPlagiarismReport] = useState([]);
	const langIndexes = {
		java: 0,
		cpp: 1,
		js: 2,
	};

	useEffect(() => {
		if (newFile === 0) return;

		sendToContract();
	}, [newFile]);

	useEffect(() => {
		getData();
	}, [result]);

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
				setAccounts(accounts);
				setContract(instance);
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
		}
	}, [codeFingerprint]);

	useEffect(() => {
		if (event) setEvents((e) => [...e, event]);
	}, [event]);

	const setSelectedFile = (selectedFile) => {
		setFile(selectedFile);
		const reader = new FileReader();
		reader.readAsArrayBuffer(selectedFile);
		reader.onloadend = () => {
			setBuffer(Buffer(reader.result));
			console.log("buffer", reader.result);
		};
	};

	const sendToContract = async () => {
		var newHashSet = Array();
		var len = 0;
		const mySet1 = new Set();
		for (var i = 0; i < hashSet.length; i++) {
			if (!mySet1.has(hashSet[i])) {
				mySet1.add(hashSet[i]);
				newHashSet.push("0x" + hashSet[i]);
				len++;
			}
		}
		setPlagiarismReport([]);
		const receipt1 = await contract.methods.fileInIPFS(ipfsHash).call();
		if (receipt1) {
			alert("File has already been submitted to the blockchain!");
		} else {
			const receipt = await contract.methods
				.uploadFile(
					file.size,
					ipfsHash,
					file.name,
					"some desc",
					codeFingerprint,
					newHashSet,
					len,
					langIndexes[lang]
				)
				.send({ from: accounts[0] });

			setEvent(receipt.events.CodeSubmitted);
			setEvent(receipt.events.CheckingPlagiarism);
			if (receipt.events.PlagiarismReport) {
				if (receipt.events.PlagiarismReport.length)
					setPlagiarismReport(receipt.events.PlagiarismReport);
				else setPlagiarismReport([receipt.events.PlagiarismReport]);
			}
			if (receipt.events.PlagiarismResult) {
				setEvent(receipt.events.PlagiarismResult);
				alert(
					"File is plagiarized!!! Plagiarism Report is given at the bottom of the page"
				);
			}
			if (receipt.events.CodeFileUploadEvent) {
				setEvent(receipt.events.CodeFileUploadEvent);
				alert(
					"File is Original and has been successfully uploaded on the blockchain"
				);
			}
		}

		// const receipt2 = await contract.methods
		// 	.doesUserHavePermission(ipfsHash, accounts[0])
		// 	.call();
		// console.log(receipt2);
	};

	var onLangChange = (e) => {
		setLang(e.target.value);
	};

	var onSubmit = async (e) => {
		e.preventDefault();
		if (!file || !lang || lang === "Select") {
			alert("Please choose a language and upload the file properly");
			return;
		}
		if (file.name.charAt(file.name.length - 1) === "s" && lang !== "js") {
			alert("File type and language must be same");
			return;
		}
		if (file.name.charAt(file.name.length - 1) === "a" && lang !== "java") {
			alert("File type and language must be same");
			return;
		}
		if (file.name.charAt(file.name.length - 1) === "p" && lang !== "cpp") {
			alert("File type and language must be same");
			return;
		}
		ipfs.add(buffer).then((res) => {
			setIpfsHash(res["path"]);
			const reader = new FileReader();
			reader.onload = async (e) => {
				let text = e.target.result;
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
						setNewFile(newFile === 1 ? 2 : 1);
					});
			};
			reader.readAsText(file);
		});
	};

	const getData = async () => {
		if (ipfsHash !== "") {
			const stream = ipfs.cat(ipfsHash, accounts[0]);
			let data = "";

			for await (const chunk of stream) {
				// chunks of data are returned as a Buffer, convert it back to a string
				for (const x of chunk) data += String.fromCharCode(x);
			}

			setData(data);
		}
	};

	return web3 ? (
		<div className="App">
			<header
				style={{
					paddingTop: "10px",
					fontWeight: "bold",
					fontSize: "large",
					color: "white",
					position: "relative",
				}}
			>
				Code Plagiarism Detection and Copyright Management System
			</header>

			<br />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: "20px",
						marginTop: "10px",
					}}
				>
					<div
						style={{
							marginLeft: "45px",
							marginRight: "25px",
							border: "2px solid black",
							// borderRadius: "20px",
							height: "250px",
							paddingTop: "75px",
							position: "relative",
							// zIndex: "1",
							backgroundColor: "#09d3ac",
							width: "580px",
						}}
					>
						<DragDrop setSelectedFile={setSelectedFile} />
						<br />
						<label htmlFor="language" style={{ fontWeight: "bold" }}>
							Select the language:{" "}
						</label>
						<select
							name="language"
							id="language"
							onChange={(e) => onLangChange(e)}
						>
							<option value="Select">Select</option>
							<option value="js">Javascript</option>
							<option value="cpp">C++</option>
							<option value="java">JAVA</option>
							{/* <option value="python">Python</option> */}
						</select>
						<br />
						<br />
						<button
							type="submit"
							style={{ color: "white", backgroundColor: "#007AA6" }}
							onClick={onSubmit}
						>
							Submit
						</button>
						{/* <p>{data}</p> */}
					</div>
					<div
						style={{
							// borderRadius: "20px",
							marginRight: "45px",
							border: "2px solid black",
							// paddingTop: "75px",
							width: "555px",
							position: "relative",
							backgroundColor: "#222336",
							overflowY: "scroll",
							height: "325px",
						}}
					>
						<Files contract={contract} event={event} accounts={accounts} />
					</div>
				</div>
				<div
					style={{
						textAlign: "left",
						border: "2px solid black",
						marginLeft: "175px",
						marginRight: "175px",
						marginBottom: "12px",
						color: "#A2A3B0",
						position: "relative",
						backgroundColor: "#222336",
						height: "290px",
						overflowY: "scroll",
						fontFamily: "Consolas",
					}}
				>
					<Events contract={contract} logs={events} />
				</div>
				{plagiarismReport.length === 0 ? null : (
					<div
						style={{
							// paddingTop: "75px",
							alignItems: "center",
							marginLeft: "250px",
							marginRight: "250px",
							position: "relative",
						}}
					>
						<PlagiarismReport reports={plagiarismReport} />
					</div>
				)}{" "}
			</div>
		</div>
	) : (
		<div>Loading Web3, accounts, and contract...</div>
	);
}

export default App;
