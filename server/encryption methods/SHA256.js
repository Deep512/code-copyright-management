// const MD5 = require("crypto-js/md5.js");
import SHA256 from "crypto-js/sha256.js";
export function sha256(str) {
	return SHA256(str).toString();
}
