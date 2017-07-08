'use strict'

const {drop, head, tail, compose, trim, join} = require('ramda')

const getInput = (argvData) => {
  const input = drop(2, argvData)
  return [head(input), tail(input)]
}

const createArgString = compose(trim, join(' '))

const displayTime = (mili) => {
  const sec = Math.floor(mili / 1000)
  const remaining = ((mili % 1) * 1000).toPrecision(3)
  return `${sec}s ${remaining}ms`
}

const createCommandString = (command, args) => {
  const argString = createArgString(args)
  return `${command} ${argString}`
}

const getMiliTime = (sec, mili, nano) => (sec * 1000) + mili + (nano / 1000000)

module.exports = {
  getInput,
  createCommandString,
  getMiliTime,
  displayTime
}
