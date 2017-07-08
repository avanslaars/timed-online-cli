#!/usr/bin/env node
const {spawn} = require('child_process')
const {getInput, createCommandString, getMiliTime, displayTime} = require('./utils')
const {saveCommand, loadCommand} = require('./services')
const SERVICE_TIMEOUT = 2500

const [command, args] = getInput(process.argv)

// Exit if no work to be done
if (!command) {
  console.log('timed-online needs a command to run. Exiting.')
  process.exit(0)
}

const commandString = createCommandString(command, args)

const commandLoader = loadCommand(commandString)
const bailOutOnLoad = new Promise((resolve, reject) => setTimeout(() => resolve({}), SERVICE_TIMEOUT))

Promise.race([commandLoader, bailOutOnLoad])
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
      const miliTime = getMiliTime(sec, nano)
      const timeDisplay = displayTime(miliTime)
      console.log(`*** took ${timeDisplay} - exited with code ${code} ***`)
      const commandSaver = saveCommand(commandString, miliTime)
      const bailOutOnSave = new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timed out')), SERVICE_TIMEOUT))
      Promise.race([commandSaver, bailOutOnSave])
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
