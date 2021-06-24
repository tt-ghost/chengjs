import { Controller } from 'egg'

export default class UserController extends Controller {
  /**
   * 获取用户信息
   */
  public async get() {
    const { ctx } = this
    const name = ctx.cookies.get('name', {
      signed: false
    })
    const user = await ctx.service.user.getOneByName(name)
    if (!user) {
      ctx.status = 404
    } else {
      ctx.body = user
    }
  }
  /**
   * 添加用户
   */
  public async add() {
    const { ctx } = this
    const name = 'xx'
    ctx.cookies.set('user', name, {
      httpOnly: true
    })
    ctx.body = {
      name
    }
  }

  /**
   * 删除用户
   */
  public async remove() {
    const { ctx } = this
    ctx.cookies.set('user', null)
    ctx.status = 204
  }
}