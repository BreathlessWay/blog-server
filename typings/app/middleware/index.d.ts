// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRobot from '../../../app/middleware/robot';

declare module 'egg' {
  interface IMiddleware {
    robot: typeof ExportRobot;
  }
}
