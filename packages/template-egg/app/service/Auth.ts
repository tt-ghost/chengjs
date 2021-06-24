import { Service } from 'egg'
import { AES, enc } from 'crypto-js'

export default class Auth extends Service {

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
}