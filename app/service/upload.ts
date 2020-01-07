import { Service } from 'egg';

import { FILE_BASE_URL } from '../constants';

import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

const pump = require('mz-modules/pump');

export default class UploadService extends Service {
	public async uploadFile(stream) {
		const filename = uuid.v1() + path.extname(stream.filename);
		const target = path.join(
			this.config.baseDir,
			'app/public/upload',
			filename,
		);
		const writeStream = fs.createWriteStream(target);
		await pump(stream, writeStream);

		return {
			url: FILE_BASE_URL + filename,
			name: filename,
		};
	}
}
