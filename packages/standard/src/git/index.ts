import { writeFile } from '../utils'

const gitIgnore = () => writeFile('.gitignore')

export { gitIgnore }
