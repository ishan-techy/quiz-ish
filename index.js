#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'



let playerName

const sleep = (ms = 1500) => new Promise(resolve => setTimeout(resolve, ms))
const sleep2 = (ms=10000) => new Promise(r => setTimeout(r, ms))

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Let\'s check tum Ishan ke bestie ho ya ni..?!! \n')

  await sleep()
  rainbowTitle.stop()

  const rTitle = chalkAnimation.neon('Please make the terminal full screen! \n')

  await sleep2()
  rTitle.stop()

  console.log(`
  ${chalk.bgRed('Dekh lo phle,khelte kese h')}
  You just need to enter your name whenever asked and then answer 5 questions.
  That's it.
  
  ${chalk.bgBlue('Instructions:')}
  Don'y worry.. this won't hack your computer..
  If you get any question wrong to bhai tum rakh die jaoge..
  Soch rhe hoge.. kaha rakkhe jaoge.. wo choro agr bestie ni ho.. Jhel ni paoge
  `)
}
async function askName() {
  const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'Enter your name:',
    default() {
      return 'player';
    },
  })
  playerName = answer.player_name
}
async function question1() {
  const answer = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'What technology am I currently working on/learning?',
    choices: [
      'some js library or framework of library',
      'something related to blockchain',
      'something related to AI/AR/VR',
      'just nothing',
    ],
  })
  return handleAnswer(answer.question_1=='something related to blockchain');
}

async function question2() {
  const answer = await inquirer.prompt({
    name: 'question_2',
    type: 'list',
    message: 'My favourite programming language',
    choices: [
      'Python',
      'Swift',
      'Java',
      'JavaScript',
    ],
  })
  return handleAnswer(answer.question_2=='JavaScript');
}

async function question3() {
  const answer = await inquirer.prompt({
    name: 'question_3',
    type: 'list',
    message: 'My nickname',
    choices: [
      'aaloo',
      'dosa',
      'ishu',
      'samosa',
      'just Ishan',
    ],
  })
  return handleAnswer(answer.question_3=='ishu');
}

async function question4() {
  const answer = await inquirer.prompt({
    name: 'question_4',
    type: 'list',
    message: 'Number of besties I have currently',
    choices: [
      '2',
      '3',
      '4',
      '5',
    ],
  })
  return handleAnswer(answer.question_4=='2');
}

async function question5() {
  const answer = await inquirer.prompt({
    name: 'question_5',
    type: 'list',
    message: 'My favourite food',
    choices: [
      'pizza',
      'burger',
      'dosa',
      'momos',
    ],
  })
  return handleAnswer(answer.question_5=='dosa');
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep()
  if (isCorrect) {
    spinner.success({ text: `Badhiya ${playerName}. Sahi jawab.`})
  }
  else {
    spinner.error({
      text: `Arre bhaiya ${playerName}. Jao yrr tum dost ni ho.. galat kar die!😢` })
    process.exit(1)
  }
}


function winner() {
  console.clear()
  const msg = `Are waah sale 
  ${playerName}
  Tum hi ho yr
  BESTIE`
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
  })
}

await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await question5()
await winner()