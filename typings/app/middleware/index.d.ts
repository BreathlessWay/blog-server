// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCompress from '../../../app/middleware/compress';
import ExportErrorHandler from '../../../app/middleware/error_handler';
import ExportNotfoundHandler from '../../../app/middleware/notfound_handler';
import ExportRobot from '../../../app/middleware/robot';
import ExportUppercase from '../../../app/middleware/uppercase';

declare module 'egg' {
  interface IMiddleware {
    compress: typeof ExportCompress;
    errorHandler: typeof ExportErrorHandler;
    notfoundHandler: typeof ExportNotfoundHandler;
    robot: typeof ExportRobot;
    uppercase: typeof ExportUppercase;
  }
}
