// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCompress from '../../../app/middleware/compress';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportJwt from '../../../app/middleware/jwt';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';
import ExportRobot from '../../../app/middleware/robot';

declare module 'egg' {
	interface IMiddleware {
		compress: typeof ExportCompress;
		errorHandler: typeof ExportErrorHandler;
		jwt: typeof ExportJwt;
		notfoundHandler: typeof ExportNotfoundHandler;
		robot: typeof ExportRobot;
	}
}
