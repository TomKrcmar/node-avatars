
import AvatarGenerator from './AvatarGenerator';
import { hashFnv32aArr } from './Utils';

export default class PixelAvatarGenerator extends AvatarGenerator {

	generateImpl(seed, avatar, options) {
		const { data, width, height } = avatar;
		
		const halfWidth = Math.ceil(width / 2);
		//const even = (width+1) % 2;
		
		let hash;
		let headerLength = 0;
		let r = 128;
		let g = 128;
		let b = 128;
		
		let useSeededColor = true;
		const useAlpha = options.useAlpha !== undefined ? options.useAlpha : true;
		
		if (typeof options.color === 'string') {
			const { color } = options;
			if (color[0] === '#' && color.length === 7) {
				r = color[1]*16 + color[2];
				g = color[3]*16 + color[4];
				b = color[5]*16 + color[6];
				useSeededColor = false;
			}
		}
		
		if (useSeededColor) {
			headerLength = 3;
			hash = hashFnv32aArr(seed, headerLength + halfWidth * height);
			r = hash[0];
			g = hash[1];
			b = hash[2];
		}
		else {
			headerLength = 0;
			hash = hashFnv32aArr(seed, halfWidth * height);
		}
		
		if (useAlpha) {
			for (let y=0; y<height; y++) {
				for (let x=0; x<halfWidth; x++) {
					let i = (y*width+x)*4 - 1;
					let j = ((y+1)*width-1-x)*4 - 1;
					const k = y*halfWidth + x + headerLength;
					const a = (hash[k] % 2 === 0) ? 255 : 0;
					data[++i] = r; data[++i] = g; data[++i] = b; data[++i] = a;
					data[++j] = r; data[++j] = g; data[++j] = b; data[++j] = a;
				}
			}
		}
		else {
			for (let y=0; y<height; y++) {
				for (let x=0; x<halfWidth; x++) {
					let i = (y*width+x)*4 - 1;
					let j = ((y+1)*width-1-x)*4 - 1;
					const k = y*halfWidth + x + headerLength;
					if (hash[k] % 2 === 0) {
						data[++i] = r; data[++i] = g; data[++i] = b; data[++i] = 255;
						data[++j] = r; data[++j] = g; data[++j] = b; data[++j] = 255;
					}
					else {
						data[++i] = 0; data[++i] = 0; data[++i] = 0; data[++i] = 255;
						data[++j] = 0; data[++j] = 0; data[++j] = 0; data[++j] = 255;
					}
				}
			}
		}
	}
}
