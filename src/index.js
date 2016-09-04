import inquirer from 'inquirer'
import * as path from 'path'
import * as fs from 'mz/fs'

const questions = [
  {
    name: 'name',
    message: 'What\'s the name of your project?',
    default: 'coolApp'
  },
  {
    name: 'description',
    message: 'A brief description, please.',
    default: 'An application cooler than DJ Kool Herc'
  },
  {
    type: 'list',
    name: 'spa',
    message: 'Do you have any specific SPA library in your mind?',
    choices: [
      'react',
      'angular',
      'angular2',
      'Nothing'
    ]
  },
  {
    type: 'checkbox',
    name: 'additional',
    message: 'I suppose some of these might come handy with your choice..',
    choices: answer => {
      const base = ['jquery', 'whatwg-fetch', 'eslint']
      switch (answer.spa) {
        case 'react':
          return base.concat(['redux', 'react-router'])
        case 'angular':
        case 'angular2':
          return base.concat(['angular-material'])
        default:
          return base
      }
    }
  },
  {
    type: 'list',
    name: 'frontend',
    message: 'Cool. For the frontend framework?',
    choices: [
      'bootstrap',
      'semantic-ui',
      'Nothing'
    ]
  },
  {
    type: 'list',
    name: 'buildTool',
    message: 'Last but not least, your build/bundling tool?',
    choices: [
      'webpack',
      'rollup',
      'gulp',
      'Nothing'
    ]
  }
]

const parseAnswer = (answer) => {
  const { name, spa, additional, frontend, buildTool } = answer
  const packages = [spa, frontend, buildTool]
    .filter(item => item !== 'Nothing')
    .concat(additional)

  return { name, packages }
}

export default () => {
  const cwd = process.cwd()

  inquirer
  .prompt(questions)
  .then(answer => {
    const packageInfo = parseAnswer(answer)

    fs.mkdirSync(path.join(cwd, packageInfo.name))
    console.log(packageInfo.packages)
  })
  .catch(err => console.log(err.message))
}
