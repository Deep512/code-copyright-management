import React from "react";
import { useState, useEffect } from "react";

import "./Files.css";

export default function Files({ contract, event, accounts }) {
	const [file, setFile] = useState(null);
	const [files, setFiles] = useState([]);
	const [cppIdx, setCppIdx] = useState(1);
	const [javaIdx, setJavaIdx] = useState(1);
	const [jsIdx, setJsIdx] = useState(1);
	const [first, setFirst] = useState(true);
	const langName = ["JAVA", "CPP", "JS"];
	useEffect(() => {
		if (file) setFiles((f) => [...f, file]);
	}, [file]);

	useEffect(() => {
		async function getFiles() {
			if (first || contract) {
				const out = await contract.methods.getFilesUploadedByUser().call();

				var i = javaIdx;
				let opt = await contract.methods.getFileByIndex(i, 0).call();
				while (opt.codeFingerPrint !== "") {
					setFile(opt);
					i++;
					opt = await contract.methods.getFileByIndex(i, 0).call();
				}
				setJavaIdx(i);

				i = cppIdx;
				opt = await contract.methods.getFileByIndex(i, 1).call();
				while (opt.codeFingerPrint !== "") {
					setFile(opt);
					i++;
					opt = await contract.methods.getFileByIndex(i, 1).call();
				}
				setCppIdx(i);

				i = jsIdx;
				opt = await contract.methods.getFileByIndex(i, 2).call();
				while (opt.codeFingerPrint !== "") {
					setFile(opt);
					i++;
					opt = await contract.methods.getFileByIndex(i, 2).call();
				}
				setJsIdx(i);
			}
		}
		if (contract) {
			if (first) {
				setFirst(false);
				getFiles();
			} else if (
				event.event == "CodeFileUploadEvent" ||
				event.event == "PlagiarismResult"
			) {
				getFiles();
			}
		}
	}, [contract, event]);

	return (
		<div>
			<p style={{ textAlign: "center" }}>
				<i>Original Files</i>
			</p>
			<table>
				<thead>
					<tr>
						<th>File name</th>
						<th>Language</th>
						{/* <th>Points</th> */}
					</tr>
				</thead>
				<tbody>
					{files === [] ? (
						<p>No files have been uploaded yet to the blockchain</p>
					) : (
						files.map((file, idx) => {
							return (
								<tr key={idx}>
									<td>{file.fileName}</td>
									<td>{langName[file.language]}</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
