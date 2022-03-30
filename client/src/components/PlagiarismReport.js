import React from "react";
import "./PlagiarismReport.css";

export default function PlagiarismReport({ reports }) {
	return (
		<div>
			<p style={{ textAlign: "center", fontSize: "large" }}>
				<i>Plagiarism Report</i>
			</p>
			-----------------------------------------------------------------------------------------------------------------------------------------------------------
			<table className="report">
				<thead>
					<tr style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
						<th style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>File name</th>
						<th style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>IPFS CID</th>
						<th style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>Similarity</th>
					</tr>
				</thead>
				<tbody>
					{reports.map((report, idx) => {
						return (
							<tr style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} key={idx}>
								<td style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
									{report.returnValues.fileName}
								</td>
								<td style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
									{report.returnValues.fileIPFSCID}
								</td>
								<td style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
									{report.returnValues.similarity}%
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			-----------------------------------------------------------------------------------------------------------------------------------------------------------
		</div>
	);
}
