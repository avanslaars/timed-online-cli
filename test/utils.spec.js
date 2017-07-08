'use strict'

const expect = require('chai').expect
const {getInput, createCommandString, getMiliTime, displayTime} = require('../utils')

describe('Utils', () => {
  describe('getInput', () => {
    it('should ignore the first two elements in the array', () => {
      const input = ['/the/first/path', '/the/second/path', 'theCommand', 'arg1', 'arg2']
      const result = getInput(input)
      const expected = ['theCommand', ['arg1', 'arg2']]
      expect(result).to.eql(expected)
    })

    it('should group the args', () => {
      const input = ['/the/first/path', '/the/second/path', 'theCommand', 'arg1', 'arg2', 'arg3']
      const result = getInput(input)
      expect(result.length).to.eql(2)
      expect(result[1]).to.be.a('array')
    })
  })

  describe('createCommandString', () => {
    it('should createa string from a command and args array', () => {
      const args = ['arg1', 'arg2', 'arg3']
      const command = 'dostuff'
      const result = createCommandString(command, args)
      expect(result).to.equal('dostuff arg1 arg2 arg3')
    })

    it('should create a command string without args', () => {
      const args = []
      const command = 'dostuff'
      const result = createCommandString(command, args)
      expect(result).to.equal('dostuff')
    })

    it('should create a command string even with null', () => {
      const command = 'dostuff'
      const result = createCommandString(command, null)
      expect(result).to.equal('dostuff')
    })
  })

  describe('getMiliTime', () => {
    it('should convert seconds only', () => {
      const result = getMiliTime(2)
      expect(result).to.equal(2000)
    })

    it('should return miliseconds as-is with no seconds or nanoseconds', () => {
      const result = getMiliTime(0, 500)
      expect(result).to.equal(500)
    })

    it('should convert nanoseconds', () => {
      const result = getMiliTime(0, 0, 2000000000)
      expect(result).to.equal(2000)
    })
  })

  describe('displayTime', () => {
    it('should break time out into seconds and miliseconds', () => {
      const input = 2000
      const expectedSeconds = '2'
      const expectedMiliseconds = '0.00'
      const expected = `${expectedSeconds}s ${expectedMiliseconds}ms`
      const result = displayTime(input)
      expect(result).to.equal(expected)
    })

    it('should break time out into seconds and miliseconds', () => {
      const input = 2423.222316
      const expectedSeconds = '2'
      const expectedMiliseconds = '423'
      const expected = `${expectedSeconds}s ${expectedMiliseconds}ms`
      const result = displayTime(input)
      expect(result).to.equal(expected)
    })

    it('should display 0 seconds if time is under a second', () => {
      const input = 423
      const expectedSeconds = '0'
      const expectedMiliseconds = '423'
      const expected = `${expectedSeconds}s ${expectedMiliseconds}ms`
      const result = displayTime(input)
      expect(result).to.equal(expected)
    })
  })
})
