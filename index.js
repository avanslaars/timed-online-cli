#!/usr/bin/env node
const {spawn} = require('child_process')
const {getInput, createCommandString, getMiliTime} = require('./utils')
const {saveCommand} = require('./services')

const [command, args] = getInput(process.argv)

// Exit if no work to be done
if (!command) {
  console.log('timed-online needs a command to run. Exiting.')
  process.exit(0)
}

const start = process.hrtime()

const child = spawn(command, args, {stdio: 'inherit'})

const commandString = createCommandString(command, args)

child.on('close', (code) => {
  const [sec, nano] = process.hrtime(start)
  const mili = nano / 1000000
  console.log(`Ran in ${sec}s ${mili}ms - exited with code ${code}`)
  const miliTime = getMiliTime(sec, mili)
  saveCommand(commandString, miliTime)
    .then(() => {
      console.log('timing data has been saved')
      process.exit(0)
    })
    .catch(err => {
      console.error('timing data could not be saved', err)
      process.exit(1)
    })
})
