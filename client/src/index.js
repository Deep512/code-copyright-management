import React from "react";
import ReactDOM from "react-dom";
import Particles from "react-tsparticles";
import "./index.css";
import App from "./App";
import particlesConfig from "./config/particlesConfig";

ReactDOM.render(
	<div style={{ position: "relative" }}>
		<Particles
			id="tsparticles"
			// init={particlesInit}
			// loaded={particlesLoaded}
			options={particlesConfig}
		/>
		<App />
	</div>,
	document.getElementById("root")
);
