import { isString} from './util'
import Jsx from './main.jsx'

interface Config{
  is?: boolean;
}

console.log(32)
export default function(config: Config): string{
  console.log(Jsx, '00000000000000000')
  return isString(config) + ''
}