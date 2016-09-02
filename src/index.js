import inquirer from 'inquirer'

const questions = [
  {
    type: 'confirm',
    name: 'trivial',
    message: 'Do you think Heejong is awesome?',
    default: true
  }
]

inquirer
  .prompt(questions)
  .then(answer => {
    if (answer.trivial) {
      console.log('That\'s right! Great job done there!')
    } else {
      console.log('You\'re stupid.')
    }
  })
