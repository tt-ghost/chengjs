// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportPassport from '../../../app/middleware/passport';

declare module 'egg' {
  interface IMiddleware {
    passport: typeof ExportPassport;
  }
}
