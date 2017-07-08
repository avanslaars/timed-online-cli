#!/usr/bin/env node
const {drop, isEmpty, head, tail} = require('ramda')
const {spawn} = require('child_process')

const input = drop(2, process.argv)

// Exit if no work to be done
if(isEmpty(input)) {
  console.log('timed-online needs a command to run. Exiting.')
  process.exit(0)
}

const command = head(input)
const args = tail(input)

console.log(command, args);

const child = spawn(command, args, {stdio: 'inherit'})
