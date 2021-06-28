import 'egg';
import EggPassport from 'egg-passport'

declare module 'egg' {
  interface Application {
    mysql: any;
    validate: any;
    passport: EggPassport;
  }

  interface ThirdUser {
    name: string;
    displayName?: string;
    provider: string;
    id: string;
    photo?: string;
  }

  interface User {
    name: string;
    display_name?: string;
    age?: number;
    sex?: string;
    photo?: string;
    password?: string;
  }
}