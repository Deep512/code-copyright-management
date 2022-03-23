import React, { useState, useEffect, useRef } from "react";
import Event from "./Event";

function Events({ contract, logs }) {
	const eventsEndRef = useRef(null);

	const scrollToBottom = () => {
		if (eventsEndRef.current)
			eventsEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [logs]);

	return (
		<div>
			<h4>
				Welcome to Code Plagiarism Detection and Copyright Management System
			</h4>
			This section shows you the events emitted by the smart contract when you
			upload a code file.
			<br />
			<br />
			If your code file is original, it would be added to the private blockchain
			running on Go-Ethereum.
			<br />
			If your code file is plagiarized, it would be rejected by the smart
			contract.
			<br />
			<br />
			------------------------------------------------------------------------------------------------------------------------------------
			<br />
			{logs.map((event, idx) => {
				return (
					<Event event={event} idx={idx} key={idx} />
					// <div key={idx}>{event.blockNumber}</div>;
				);
			})}
			<div ref={eventsEndRef} />
		</div>
	);
}

export default Events;
