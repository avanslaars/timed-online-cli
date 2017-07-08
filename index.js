#!/usr/bin/env node
const {spawn} = require('child_process')
const {getInput, createCommandString, getMiliTime, displayTime} = require('./utils')
const {saveCommand, loadCommand} = require('./services')

const [command, args] = getInput(process.argv)

// Exit if no work to be done
if (!command) {
  console.log('timed-online needs a command to run. Exiting.')
  process.exit(0)
}

const commandString = createCommandString(command, args)

loadCommand(commandString)
  .then(({avg, dev}) => {
    if (avg) {
      const avgSec = displayTime(avg)
      const devSec = displayTime(dev)
      console.log(`*** usually takes an average of ${avgSec} seconds +/- ${devSec} seconds ***`)
    }
    const start = process.hrtime()
    const child = spawn(command, args, {stdio: 'inherit'})

    child.on('close', (code) => {
      const [sec, nano] = process.hrtime(start)
      const mili = nano / 1000000
      const miliTime = getMiliTime(sec, mili)
      const timeDisplay = displayTime(miliTime)
      console.log(`*** took ${timeDisplay} - exited with code ${code} ***`)
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
  })
