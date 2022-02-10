import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JS", "CPP", "JAVA", "PY"];

function DragDrop({ setSelectedFile }) {
	const [file, setFile] = useState(null);
	const [files, setFiles] = useState([]);
	useEffect(() => {
		if (!file) return;
		var listFiles = files;
		listFiles = [...listFiles, file];
		setFiles(listFiles);
	}, [file]);
	const handleChange = (file) => {
		setFile(file);
		setSelectedFile(file);
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
			{files.map((file, idx) => {
				return <p key={idx}>{file.name}</p>;
			})}
		</div>
	);
}

export default DragDrop;
