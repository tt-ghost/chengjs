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
    // const user = {}
    console.log(111, this.app.model.User.findOne, name)
    return user
  }

  /**
   * 注册用户
   * @param name string
   * @returns user infomation
   */
  public async register (name: string, password: string) {
    return {
      name,
      password
    }
  }

  /**
   * 登录
   * @param name string 用户名
   * @param pwd string 用户密码
   * @param rememberMe boolean 时候记录登录状态
   * @returns user infomation
   */
  public async login(name: string, password: string, rememberMe: boolean) {
    return {
      status: 1,
      body: {
        name,
        password, 
        rememberMe
      }
    }
  }
}