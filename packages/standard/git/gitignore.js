const fs = require('fs')
const path = require('path')

module.exports = function () {
  const finename = '.gitignore'
  const isExist = fs.existsSync(path.resolve(__dirname, finename))
  const content = `
  .DS_Store
  node_modules
  dist
  .nuxt
  
  # local env files
  .env.local
  .env.*.local
  
  # Logs
  logs
  *.log
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  pnpm-debug.log*
  
  # Editor directories and files
  .idea
  *.suo
  *.ntvs*
  *.njsproj
  *.sln
  *.sw?
  
  # vscode
  .vscode/*
  !.vscode/settings.json
  !.vscode/tasks.json
  !.vscode/launch.json
  !.vscode/extensions.json
  !.vscode/*.code-snippets
  
  # Local History for Visual Studio Code
  .history/
  
  # Built Visual Studio Code Extensions
  *.vsix
  
  # Output of 'npm pack'
  *.tgz
  
  # parcel-bundler cache (https://parceljs.org/)
  .cache
  .parcel-cache
  
  # Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
  .grunt
  
  # Coverage directory used by tools like istanbul
  coverage
  *.lcov
`
  if (!isExist) {
    fs.writeFileSync(finename, content, { encoding: 'utf8' })
  } else {
    console.warn('.gitignore has existed!')
  }
}
