import Context from './Context'

type IContext = Context

interface IConf {
  name?: string
}

const DEFAULT_CONF: IConf = {
  name: 'Luban'
}

/**
 * vue项目注册入口
 * @param app Vue instance
 * @param config Vue app config
 */
export function install(app: any, config: IConf) {
  const conf = { ...DEFAULT_CONF, ...(config || {}) }
  const component = {
    template: '<div ref="el">ele</div>',
    mounted() {
      this.$emit('mounted', this.$refs.el)
    }
  }
  app.component(conf.name, component)
}

/**
 * 创建微前端上下文
 * @returns Context 上下文
 */
export function useContext() {
  return new Context()
}

/**
 * 主应用create生命周期回调hook
 * @param ctx IContext
 */
export function useCreate(ctx?: IContext) {
  console.log('create: ', ctx)
}

/**
 * 主应用mounte生命周期回调hook，主应用已挂在dom
 * @param ctx IContext
 */
export function useMount(ctx?: IContext) {
  console.log('mounte: ', ctx)
}
