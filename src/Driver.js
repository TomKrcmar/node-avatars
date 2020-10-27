
export default class Driver {
	constructor(generator) {
		this.generator = generator;
	}
	
	generate(seed, width, height, options) {
		const avatar = this.generator.generate(seed, width, height, options);
		return avatar.data;
	}

	dataUrl(seed, width, height, options) {
		const avatar = this.generator.generate(seed, width, height, options);
		width = avatar.width;
		height = avatar.height;
		
		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const imageData = new ImageData(new Uint8ClampedArray(avatar.data), width, height);
		const ctx = canvas.getContext('2d');
		ctx.putImageData(imageData, 0, 0);
		return canvas.toDataURL();
	}
	
	applyToImage(seed, width, height, options, img) {
		img.style.imageRendering = 'pixelated';
		img.src = this.dataUrl(seed, width, height, options);
		return img;
	}
	
	createImage(seed, width, height, options) {
		return applyToImage(seed, width, height, options, document.createElement('img'));
	}
}


