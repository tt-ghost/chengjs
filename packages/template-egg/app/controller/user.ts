import { Controller } from 'egg'

export default class UserController extends Controller {
  /**
   * 获取用户信息
   */
  public async get() {
    const { ctx } = this

    if (ctx.user) {
      ctx.body = ctx.user
    } else {
      ctx.status = 401
      ctx.body = {
        redirectURL: '/api/passport/login'
      }
    }
  }

  /**
   * 获取指定用户信息
   */
   public async getUserByName() {
    const { ctx } = this
    ctx.body = ctx.user
    const { name } = ctx.params
    const user = await ctx.service.user.getOneByName(name)

    if (user) {
      ctx.body = user
    } else {
      ctx.status = 404
      ctx.body = {
        message: 'not found'
      }
    }
  }
}