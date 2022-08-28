
// interface MergeRegurn {
//   server?: {[key: string]: any},
//   [key: string]: any
// }

export const merge = function (...config) {
  let result = {}

  if (config.length) {
    result = config.reduce((pre, result) => {
      const { server, ...others } = pre
      if (typeof server === 'object' && server !== null) {
        console.log(server, others)
      }
      return Object.assign({}, pre, result)
    }, {})
  }
  return result
}

export const validate = (config) => {
  // console.log('validate: ', config)
  return true
}
