import inquirer from 'inquirer'
import * as path from 'path'
import * as fs from 'fs'

const questions = [
  {
    name: 'name',
    message: 'What\'s the name of your project?',
    default: 'coolApp'
  },
  {
    type: 'list',
    name: 'spa',
    message: 'Do you have any specific SPA library in your mind?',
    choices: [
      'ReactJS',
      'AngularJS 1.x',
      'AngularJS 2',
      'No, thanks.'
    ]
  },
  {
    type: 'confirm',
    name: 'redux',
    message: 'With redux?',
    when: (answer) => { return answer.spa == 'ReactJS' }
  },
  {
    type: 'list',
    name: 'frontend',
    message: 'Cool. For the frontend framework?',
    choices: [
      'Twitter bootstrap',
      'Semantic-UI',
      'No, thanks.'
    ]
  },
  {
    type: 'confirm',
    name: 'jquery',
    message: 'And do you need old pal jQuery too?'
  },
  {
    type: 'list',
    name: 'build tool',
    message: 'Last but not least, your build/bundling tool?',
    choices: [
      'webpack',
      'rollup',
      'gulp'
    ]
  }
]

export default () => {
  inquirer
  .prompt(questions)
  .then(answer => {
    fs.mkdir(path.join(process.cwd(), answer.name), (err) => {
      if (err) {
        console.log(err.message)
      } else {
        Object.keys(answer).map(key => console.log(`${key}: ${answer[key]}`))
      }
    })
  })
}
