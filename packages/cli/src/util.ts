
interface MergeRegurn {
  server?: {[key: string]: any},
  [key: string]: any
}

export const merge = function(...configs: Config[]): MergeRegurn {
  let result: MergeRegurn = {}
 
  if(configs.length) {
    result = configs.reduce((pre, result) => {
      const { server, ...others } = pre
      if (typeof server === 'object' && server !== null) {
        server
      }
      return Object.assign({}, pre, result)
    }, {})
  }
  return result
}

export const validate = (config: Config) => {
  // console.log('validate: ', config)
  return true
}