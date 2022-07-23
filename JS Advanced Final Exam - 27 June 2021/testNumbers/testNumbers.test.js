let { expext, expect } = require('chai');
let { testNumbers } = require('./testNumbers');

describe('testNumbers checker', () => {

    describe('sumNumbers checker', () => {
        it('invalid input', () => {
            expect(testNumbers.sumNumbers('string', 1)).to.equal(undefined);
        })

        it('invalid input', () => {
            expect(testNumbers.sumNumbers(1, 'string')).to.equal(undefined);
        })

        it('correct input', () => {
            expect(testNumbers.sumNumbers(1, 1)).to.equal('2.00');
        })
    })

    describe('numberChecker checker', () => {
        it('even', () => {
            expect(testNumbers.numberChecker(2)).to.equal('The number is even!');
        })

        it('odd', () => {
            expect(testNumbers.numberChecker(1)).to.equal('The number is odd!');
        })

        it('invalid input', () => {
            expect(() => testNumbers.numberChecker('string')).to.throw('The input is not a number!');
        })
    })

    describe('averageSumArray checker', () => {
        it('all positive', () => {
            expect(testNumbers.averageSumArray([1, 2, 3, 4, 5])).to.equal(3);
        })

        it('all zero', () => {
            expect(testNumbers.averageSumArray([0, 0, 0])).to.equal(0);
        })

        it('includes negative', () => {
            expect(testNumbers.averageSumArray([-1, 1, 3])).to.equal(1);
        })
    })

})