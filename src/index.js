import inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'mz/fs';

const questions = [
  {
    name: 'name',
    message: 'First off, what\'s the name of your project?',
    default: 'coolApp',
  },
  {
    name: 'description',
    message: 'A brief description, please.',
    default: 'An application cooler than DJ Kool Herc',
  },
  {
    type: 'list',
    name: 'spa',
    message: 'Do you have any specific SPA library in your mind?',
    choices: [
      'react',
      'angular',
      'angular2',
      'Nothing',
    ],
  },
  {
    type: 'checkbox',
    name: 'additional',
    message: 'I suppose some of these might come handy..',
    choices: answer => {
      const base = ['jquery', 'whatwg-fetch', 'eslint'];
      switch (answer.spa) {
        case 'react':
          return base.concat(['redux', 'react-router']);
        case 'angular':
        case 'angular2':
          return base.concat(['angular-material']);
        default:
          return base;
      }
    },
  },
  {
    type: 'list',
    name: 'frontend',
    message: 'Fantastic! For the frontend framework?',
    choices: [
      'bootstrap',
      'semantic-ui',
      'Nothing',
    ],
  },
  {
    type: 'list',
    name: 'buildTool',
    message: 'And what\'s your build/bundling tool?',
    choices: [
      'webpack',
      'rollup',
      'Nothing',
    ],
  },
  {
    type: 'confirm',
    name: 'es6',
    message: 'Last but not least, you\'re gonna write ES6, aren\'t you?',
    default: true,
  },
];

const parseAnswer = (answer) => {
  const { name, spa, additional, frontend, buildTool, es6 } = answer;
  const packages = [spa, frontend, buildTool]
    .filter(item => item !== 'Nothing')
    .concat(additional);

  if (es6) {
    if (buildTool === 'webpack') {
      packages.push(...['babel-loader', 'babel-preset-es2015']);
    } else if (buildTool === 'rollup') {
      packages.push(...['babelrc-rollup', 'babel-preset-es2015-rollup',
        'rollup-plugin-babel']);
    }
  }

  return { name, packages };
};

const createGitignore = (location) =>
  fs.writeFile(path.join(location, '.gitignore'), 'node_modules/\ndist/');

export default () => {
  let packageInfo;
  let projectPath;

  inquirer
    .prompt(questions)
    .then(answer => {
      packageInfo = parseAnswer(answer);
      projectPath = path.join(process.cwd(), packageInfo.name);
    })
    .then(() => fs.mkdir(projectPath))
    .then(err => {
      if (err) { throw new Error(err); }
      return createGitignore(projectPath);
    })
    .then(err => {
      if (err) { throw new Error(err); }
      console.log('Created folder and gitignore');
    })
    .catch(e => console.log(e.msg));
};
