import { version } from '../package.json'

export default class Tracking {
  public version: string
  constructor() {
    this.version = version
  }

  init() {
    // add listener
  }
}
