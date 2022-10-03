import { writeFile } from '../utils'

const eslintIgnore = () => writeFile('.eslintignore')

export { eslintIgnore }
