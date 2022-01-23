import { sha256 } from "./encryption methods/SHA256.js";

export function getCodeFingerprint(hashSet) {
	var str = hashSet.join("");
	return sha256(str).toString();
}
