// const MD5 = require("crypto-js/md5.js");
import MD5 from "crypto-js/md5.js";
export function md5(str) {
	return MD5(str).toString();
}
