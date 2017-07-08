#!/usr/bin/env node
const {drop, isEmpty, head, tail} = require('ramda')
const {spawn} = require('child_process')

const input = drop(2, process.argv)

// Exit if no work to be done
if (isEmpty(input)) {
  console.log('timed-online needs a command to run. Exiting.')
  process.exit(0)
}

const command = head(input)
const args = tail(input)

const start = process.hrtime()

const child = spawn(command, args, {stdio: 'inherit'})

child.on('close', (code) => {
  const [sec, nano] = process.hrtime(start)
  const mili = nano / 1000000
  console.log(`Ran in ${sec}s ${mili}ms - exited with code ${code}`)
})
