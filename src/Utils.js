
export function hashFnv32a(str, seed) {
	var i, l, hval = (seed === undefined) ? 0x811c9dc5 : seed;
	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return hval >>> 0;
}

export function hashFnv32aArr(str, length) {
	const arr = new Uint32Array(Math.ceil(length/4));
	for (let i=0; i<length; i++)
		arr[i] = hashFnv32a(str, i);
	return new Uint8Array(arr.buffer);
}
