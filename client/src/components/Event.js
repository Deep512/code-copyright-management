import React from "react";
import "./Events.css";
function Event({ event, idx }) {
	// console.log(event.returnValues[0]);
	// console.log(event.returnValues[2]);
	return (
		<div>
			<table className="events" key={idx} style={{ marginBottom: "5px" }}>
				<thead>
					<tr>
						<th>Timestamp</th>
						<th>Name</th>
						<th>BlockHash</th>
						<th>File Name</th>
						<th>File IPFS ID</th>
						<th>PlagiarismResult</th>
					</tr>
				</thead>
				<tbody>
					{event.event === "CodeSubmitted" ? (
						<tr>
							<td>{event.returnValues.timeUploaded}</td>
							<td> {event.event}</td>
							<td>{event.blockHash}</td>
							<td>{event.returnValues.fileName}</td>
							<td></td>
							<td></td>
						</tr>
					) : event.event === "CheckingPlagiarism" ? (
						<tr>
							<td>{event.returnValues.timeUploaded}</td>
							<td> {event.event}</td>
							<td>{event.blockHash}</td>
							<td>{event.returnValues.fileName}</td>
							<td></td>
							<td></td>
						</tr>
					) : event.event === "CodeFileUploadEvent" ? (
						<tr>
							<td>{event.returnValues.timeUploaded}</td>
							<td> {event.event}</td>
							<td>{event.blockHash}</td>
							<td>{event.returnValues.fileName}</td>
							<td>{event.returnValues.fileIPFSCID}</td>
							<td>false</td>
						</tr>
					) : (
						<tr>
							<td>{event.returnValues.timeUploaded}</td>
							<td> {event.event}</td>
							<td>{event.blockHash}</td>
							<td></td>
							<td></td>
							<td>true</td>
						</tr>
					)}
				</tbody>
			</table>
			----------------------------------------------------------------------------------------------------------------------------------
		</div>
	);
}

export default Event;
