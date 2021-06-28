import { Service, ThirdUser } from 'egg'
import { AES, enc } from 'crypto-js'

export default class Authorization extends Service {

  /**
   * 创建密码
   * @param password 用户明文密码
   * @returns 返回hash之后的密码
   */
  public async createPassword(password: string) {
    const hash = AES.encrypt(password, this.config.crypto.secret).toString();
    return hash;
  }

  /**
   * 检查密码时候一致
   * @param password 用户明文密码
   * @param hash_password 加密后密码
   * @returns 返回校验结果
   */
  public async checkPassword(password: string, hash_password: string) {
    const bytes = AES.decrypt(hash_password, this.config.crypto.secret)
    const originalText = bytes.toString(enc.Utf8)

    return password === originalText
  }

  // /**
  //  * 获取token
  //  * @param arr 列表
  //  * @returns token值
  //  */
  //  public async getToken(arr) {
  //    console.log(99999, jwt)
  //   return this.ctx.jwt.sign(arr, this.app.config.jwt.secret);
  // }

  // /**
  //  * 检查token
  //  * @param token 用户token
  //  * @returns 返回校验结果
  //  */
  // public async checkToken(token) {

  //   return this.ctx.jwt.verify(token, this.config.jwt.secret);
  // }
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

  /**
   * 第三方登录认证
   * @param user ThirdUser 第三方用户对象
   * @returns 已认证则返回用户，未认证则先注册在返回用户信息
   */
  public async thirdAuth(user: ThirdUser) {
    const { ctx } = this
    const { provider, id } = user
    const existUser = await ctx.model.Authorization.findOne({
      where: {
        provider,
        uid: id
      }
    })
    if (existUser) {
      const tmpUser = await ctx.service.user.getOneById(existUser.user_id)
      return tmpUser
    }

    const newUser = await this.registerThirdUser(user)

    return newUser
  }

  /**
   * 注册第三方认证的用户
   * @param user ThirdUser 第三方用户对象
   * @returns 已认证用户信息
   */
   public async registerThirdUser(user: ThirdUser) {
    const { ctx } = this
    let { provider, name, id, photo, displayName } = user
    const existUser = await ctx.model.User.findOne({
      where: {
        name
      }
    })
    if (existUser) {
      name += '_' + Date.now()
    }
    const newUser = await ctx.model.User.create({
      name,
      display_name: displayName,
      photo
    })

    await this.ctx.model.Authorization.create({
      name,
      display_name: displayName,
      provider,
      photo,
      uid: id,
      user_id: newUser.id,
    })

    return newUser
  }
}