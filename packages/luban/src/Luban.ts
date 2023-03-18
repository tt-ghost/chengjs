// https://developer.mozilla.org/zh-CN/docs/Web/API/fetch
import Context from './Context'
import { install, useContext, useCreate, useMounte } from './static'

type IContext = Context
/**
 * http 库
 * @example
 *
 */

export default class Luban {
  public config: CJ.ILuban
  public static install: (app: any, config?: any) => any
  public static useContext?: () => IContext
  public static useCreate?: (ctx: IContext) => any
  public static useMounte?: (ctx: IContext) => any

  constructor(conf?: CJ.ILuban) {
    this.config = conf
  }
}

// for vue
Luban.install = install

Luban.useContext = useContext

Luban.useCreate = useCreate

Luban.useMounte = useMounte
