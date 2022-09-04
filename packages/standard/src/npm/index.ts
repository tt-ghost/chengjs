import { writeFile } from '../utils'

const npmrc = () => writeFile('.npmrc')

export {
  npmrc
}
