
export class AvatarImage {
	constructor(width, height) {
		if (typeof width !== 'number' && typeof height === 'number')
			width = height;
		else if (typeof width === 'number' && typeof height !== 'number')
			height = width;
		else if (typeof width !== 'number' && typeof height !== 'number')
			width = height = 5;
		width = Math.max(1, Math.floor(width));
		height = Math.max(1, Math.floor(height));
		
		this.width = width;
		this.height = height;
		this.byteLength = width * height * 4;
		this.data = new Uint8Array(this.byteLength);
	}
}

export default class AvatarGenerator {
	generate(seed, width, height, options) {
		const avatar = new AvatarImage(width, height);
		
		if (typeof seed !== 'string')
			seed = JSON.stringify(seed) || '';
		
		this.generateImpl(seed, avatar, options);
		
		return avatar;
	}
	
	generateImpl(seed, avatar, options) {
		return avatar;
	}
}

