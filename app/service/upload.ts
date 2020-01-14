import { Service } from 'egg';

import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

const pump = require('mz-modules/pump');

export default class UploadService extends Service {
	public async uploadFile({ stream, prefix }) {
		const filename = uuid.v1() + path.extname(stream.filename);
		const uploadPath = path.join(this.config.baseDir, 'app/public/upload');
		const hasUpload = fs.existsSync(uploadPath);
		if (!hasUpload) {
			fs.mkdirSync(uploadPath);
		}
		const target = path.join(uploadPath, filename);
		const writeStream = fs.createWriteStream(target);
		await pump(stream, writeStream);

		return {
			url: prefix + filename,
			name: filename,
		};
	}
}
