import { Service, User } from 'egg'

export default class UserService extends Service {
  constructor(ctx) {
    super(ctx)
  }
  /**
   * 根据用户名获取用户信息
   * @param name string
   * @returns user infomation
   */
  public async getOneByName (name: string) {
    const user = await this.app.model.User.findOne({ where: { name }})
    return user
  }

  /**
   * 根据用户id获取用户
   * @param id number
   * @returns user infomation
   */
   public async getOneById (id: number) {
    const user = await this.app.model.User.findByPk(id)

    return user
  }

  /**
   * 添加用户
   * @param user object
   * @returns user infomation
   */
   public async add (user: any) {
    const { name, displayName, sex, photo, age, password } = user
    const newUser: User = await this.app.model.User.create({
      name,
      display_name: displayName,
      sex,
      photo,
      age,
      password
    })
    return newUser
  }

}