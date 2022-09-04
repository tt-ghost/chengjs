import { writeFile } from '../utils'

const gitignore = () => writeFile('.gitignore')

export {
  gitignore
}
