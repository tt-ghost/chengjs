import { Service } from 'egg';

/**
 * Home Service
 */
export default class Home extends Service {

  /**
   * welcome to you
   * @param name - your name
   */
  public async welcome(name: string) {
    return name;
  }
}
