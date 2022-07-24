let { expect } = require('chai');
let { numberOperations } = require('./numberOperations');

describe('numberOperations checker', () => {

    describe('powNumber checker', () => {
        it('positive number', () => {
            expect(numberOperations.powNumber(2)).to.equal(4);
        })

        it('ngative number', () => {
            expect(numberOperations.powNumber(-2)).to.equal(4);
        })

        it('zero number', () => {
            expect(numberOperations.powNumber(0)).to.equal(0);
        })
    })

    describe('numberChecker checker', () => {
        it('invalid input', () => {
            expect(() => numberOperations.numberChecker('string')).to.throw('The input is not a number!');
        })

        it('correct input number', () => {
            expect(numberOperations.numberChecker('99')).to.equal('The number is lower than 100!');
        })

        it('correct input', () => {
            expect(numberOperations.numberChecker(100)).to.equal('The number is greater or equal to 100!');
        })
    })

    describe('sumArrays checker', () => {
        it('equal arrays', () => {
            expect(numberOperations.sumArrays([1, 2, 3], [1, 2, 3])).to.eql([2, 4, 6]);
        })

        it('non-equal arrays', () => {
            expect(numberOperations.sumArrays([1, 2, 3], [1, 2])).to.eql([2, 4, 3]);
        })

        it('correct input', () => {
            expect(numberOperations.sumArrays([1, 2], [1, 2, 3])).to.eql([2, 4, 3]);
        })
    })

})