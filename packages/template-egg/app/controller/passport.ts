import { Controller } from 'egg';

export default class AuthController extends Controller{
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
    ctx.body = {
      rules
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
    const result: any = ctx.validate(rules, ctx.request.body)
    if (result) {
      // ctx.status = 400
      ctx.body = result
    } else {
      ctx.body = {
        message: 'login'
      }
    }

    ctx.body = {
      message: result
    }
  }

  /**
   * 用户退出登录
   */
   public async logout() {
    const { ctx } = this

    ctx.body = {
      message: 'logout'
    }
  }
}