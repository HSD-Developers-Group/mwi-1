import inquirer from 'inquirer'
import * as path from 'path'
import * as fs from 'fs'

const questions = [
  {
    name: 'name',
    message: 'What\'s the name of your project?',
    default: 'coolApp'
  }
]

export default () => {
  inquirer
  .prompt(questions)
  .then(answer => {
    fs.mkdir(path.join(process.cwd(), answer.name), (err) => {
      if (err) {
        console.log('Oops, something went wrong')
      } else {
        console.log('There you go :-)')
      }
    })
  })
}
