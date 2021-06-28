import { Controller } from 'egg';

/**
 * 本站登录及第三方授权登录
 */
export default class PassportController extends Controller{
  /**
   * 用户注册
   */
  public async register() {
    const { ctx } = this
    const rules = {
      name: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
      repassword: { required: true, type: 'string' }
    }
    const result: any = await ctx.validate(rules, ctx.request.body)

    if (!result) {
      const { name } = ctx.request.body
      const user = await ctx.service.user.getOneByName(name)

      if (user) {
        ctx.status = 409
        ctx.body = {
          message: '用户已经存在'
        }
      } else {
        const newUser = await ctx.service.user.add(ctx.request.body)

        ctx.body = newUser
      }
    }
  }

  /**
   * 用户登录
   */
   public async login() {
    const { ctx } = this
    const rules = {
      name: { required: true, type: 'string' },
      password: { required: true, type: 'string' },
      rememberMe: { required: false, type: 'boolean' }
    }

    const result: any = await ctx.validate(rules, ctx.request.body)
    if (!result) {
      const { name } = ctx.request.body
      const user = await ctx.service.user.getOneByName(name)
      if (!user) {
        ctx.status = 404
        ctx.body = {
          message: '用户还未注册'
        }
      } else {
        ctx.cookies.set('user', name, {
          httpOnly: true
        })
        ctx.body = {
          message: 'login'
        }
      }
    }
  }

  /**
   * 用户退出登录
   */
   public async logout() {
    const { ctx } = this
    ctx.logout()
    ctx.cookies.set('user', null)
    ctx.body = {
      message: '已退出'
    }
  }
}