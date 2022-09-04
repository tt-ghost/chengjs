import fs from 'fs'
import path from 'path'

export const writeFile = (filename: string) => {
  const fullpath = path.resolve(process.cwd(), filename)
  const isExist = fs.existsSync(path.resolve(fullpath))
  if (isExist) return console.warn(`${filename} has existed!`)

  fs.readFile(fullpath, (err, data) => {
    if (err) return console.warn(err)

    fs.writeFileSync(filename, data, { encoding: 'utf8' })
  })
}
