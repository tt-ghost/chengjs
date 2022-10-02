namespace CJ {
  type BASE_TYPE = string | number
  interface URL {
    protocol: string
    domain: string
    port: string
    path: string
    hash: string
    params: { [key: string]: string | number | BASE_TYPE[] }
  }
}
