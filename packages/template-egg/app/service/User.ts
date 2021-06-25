import { Service } from 'egg'

export default class UserService extends Service {
  constructor(ctx) {
    super(ctx)
  }
  /**
   * 获取用户信息
   * @param name string
   * @returns user infomation
   */
  public async getOneByName (name: string) {
    const user = await this.app.model.User.findOne({ query: { name }})
    return user
  }

}