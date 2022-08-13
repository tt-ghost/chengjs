// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthorization from '../../../app/model/authorization';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Authorization: ReturnType<typeof ExportAuthorization>;
    User: ReturnType<typeof ExportUser>;
  }
}
