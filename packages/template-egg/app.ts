import { Application } from "egg";

export default class AppBootHook {
  app: Application;

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    const { app } = this

    app.passport.verify(async (ctx, user) => {

      const newUser = await ctx.service.authorization.thirdAuth(user)
      // ctx.login(user)
      // app.passport.serializeUser(user, ctx.request, () => user)
      // app.passport.deserializeUser(ctx.request, user)
      return newUser
    })
    // app.passport.serializeUser((ctx, user) => {
    //   console.log(111, ctx.ss, user)
    //   return user
    // })
    // app.passport.deserializeUser((ctx, user) => {
    //   console.log(222, ctx.ss, user)
    //   return user
    // })
  }
}