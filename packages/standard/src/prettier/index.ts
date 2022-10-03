import prettier from './.prettier'
import { writeFile } from '../utils'

const prettierIgnore = () => writeFile('.prettierignore')

export {
  // https://prettier.io/docs/en/configuration.html
  prettier,
  prettierIgnore
}
