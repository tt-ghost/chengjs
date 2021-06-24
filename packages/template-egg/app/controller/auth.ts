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
      rememberMe: { required: true, type: 'boolean' }
    }
    const result = ctx.validate(rules, ctx.request.body)
    console.log(result)
    ctx.body = {
      message: 'login'
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