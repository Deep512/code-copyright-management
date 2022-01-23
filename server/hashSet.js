import { md5 } from "./encryption methods/MD5.js";

export function getHashSet(nArr) {
	return nArr.map((arr) => {
		var str = arr.join("");
		return md5(str).toString();
	});
}
