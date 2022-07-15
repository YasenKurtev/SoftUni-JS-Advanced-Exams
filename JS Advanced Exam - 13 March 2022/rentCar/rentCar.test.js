let { expect } = require('chai');
let { rentCar } = require('./rentCar');

describe('retnCar Checker', () => {

    describe('searchCar Checker', () => {
        it('invalid input', () => {
            expect(() => rentCar.searchCar(1, 'BMW')).to.throw('Invalid input!');
        })

        it('invalid input', () => {
            expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 1)).to.throw('Invalid input!');
        })

        it('found matched model', () => {
            expect(rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'BMW')).to.equal('There is 1 car of model BMW in the catalog!');
        })

        it('no mathed model', () => {
            expect(() => rentCar.searchCar(["Volkswagen", "BMW", "Audi"], 'Fiat')).to.throw('There are no such models in the catalog!');
        })
    })

    describe('calculatePriceOfCar Checker', () => {
        it('invalid input', () => {
            expect(() => rentCar.calculatePriceOfCar('string', 'string')).to.throw('Invalid input!');
        })

        it('invalid input', () => {
            expect(() => rentCar.calculatePriceOfCar(1, 1)).to.throw('Invalid input!');
        })

        it('found matched model', () => {
            expect(rentCar.calculatePriceOfCar('BMW', 1)).to.equal('You choose BMW and it will cost $45!');
        })

        it('found matched model, but 0 days', () => {
            expect(rentCar.calculatePriceOfCar('BMW', 0)).to.equal('You choose BMW and it will cost $0!');
        })

        it('no mathed model', () => {
            expect(() => rentCar.calculatePriceOfCar('Fiat', 1)).to.throw('No such model in the catalog!');
        })
    })

    describe('checkBudget Checker', () => {
        it('invalid input', () => {
            expect(() => rentCar.checkBudget('string', 1, 1)).to.throw('Invalid input!');
        })

        it('invalid input', () => {
            expect(() => rentCar.checkBudget(1, 'string', 1)).to.throw('Invalid input!');
        })

        it('invalid input', () => {
            expect(() => rentCar.checkBudget(1, 1, 'string')).to.throw('Invalid input!');
        })

        it('budget is enough', () => {
            expect(rentCar.checkBudget(45, 1, 45)).to.equal('You rent a car!');
        })

        it('budget is not enough', () => {
            expect(rentCar.checkBudget(45, 1, 44)).to.equal('You need a bigger budget!');
        })
    })

})