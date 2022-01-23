import { nGram } from "n-gram";

function ngrams(str, length) {
	var ngramsArray = [];

	for (var i = 0; i < str.length - (length - 1); i++) {
		var subNgramsArray = [];

		for (var j = 0; j < length; j++) {
			subNgramsArray.push(str[i + j]);
		}

		ngramsArray.push(subNgramsArray);
	}
	console.log(ngramsArray);
	return ngramsArray;
}

export function getNGrams(arr, n) {
	return nGram(n)(arr);
}
