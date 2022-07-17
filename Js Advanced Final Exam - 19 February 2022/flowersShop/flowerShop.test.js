let { expect } = require('chai');
let { flowerShop } = require('./flowerShop');

describe('flowerShop Checker', () => {

    describe('calcPriceOfFlowers Checker', () => {
        it('not a string', () => {
            expect(() => flowerShop.calcPriceOfFlowers(1, 1, 1)).to.throw('Invalid input!');
        })

        it('not a number', () => {
            expect(() => flowerShop.calcPriceOfFlowers('string', 'string', 1)).to.throw('Invalid input!');
        })

        it('not a number', () => {
            expect(() => flowerShop.calcPriceOfFlowers('string', 1, 'string')).to.throw('Invalid input!');
        })

        it('correct input', () => {
            expect(flowerShop.calcPriceOfFlowers('Rose', 1, 1)).to.equal('You need $1.00 to buy Rose!');
        })
    })

    describe('checkFlowersAvailable Checker', () => {
        it('is available', () => {
            expect(flowerShop.checkFlowersAvailable('Rose', ["Rose", "Lily", "Orchid"])).to.equal('The Rose are available!');
        })

        it('is not available', () => {
            expect(flowerShop.checkFlowersAvailable('Tulip', ["Rose", "Lily", "Orchid"])).to.equal('The Tulip are sold! You need to purchase more!');
        })
    })

    describe('sellFlowers Checker', () => {
        it('not an array', () => {
            expect(() => flowerShop.sellFlowers(1, 1)).to.throw('Invalid input!');
        })

        it('not a number', () => {
            expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], ["Rose", "Lily", "Orchid"])).to.throw('Invalid input!');
        })

        it('number less than 0', () => {
            expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], -1)).to.throw('Invalid input!');
        })

        it('number bigger than array', () => {
            expect(() => flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 3)).to.throw('Invalid input!');
        })

        it('correct input', () => {
            expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 1)).to.equal('Rose / Orchid');
        })
    })

})