import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JS", "CPP", "JAVA"];
function DragDrop({ setSelectedFile }) {
	const [file, setFile] = useState(null);
	const handleChange = (file) => {
		setFile(file);
		setSelectedFile(file);
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-around",
			}}
		>
			<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
			{file && (
				<p
					style={{
						backgroundColor: "#2c3e50",
						width: "250px",
						justifyContent: "center",
						height: "70px",
						lineHeight: "70px",
					}}
				>
					{file.name}
				</p>
			)}
		</div>
	);
}

export default DragDrop;
