// eslint-disable-next-line
namespace CJ {
  type BASE_TYPE = string | number
  // eslint-disable-next-line
  export interface URL {
    protocol: string
    domain: string
    port: string
    path: string
    hash: string
    params: { [key: string]: string | number | BASE_TYPE[] }
  }
}
