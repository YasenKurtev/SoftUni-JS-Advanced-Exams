let { expect } = require('chai');
let { carService } = require('./carService');

describe('carService checker', () => {

    describe('isItExpensive checker', () => {
        it('issue is Engine', () => {
            expect(carService.isItExpensive('Engine')).to.equal(`The issue with the car is more severe and it will cost more money`);
        })

        it('issue is Transmission', () => {
            expect(carService.isItExpensive('Transmission')).to.equal(`The issue with the car is more severe and it will cost more money`);
        })

        it('issue is something else', () => {
            expect(carService.isItExpensive('Gearbox')).to.equal(`The overall price will be a bit cheaper`);
        })
    })

    describe('discount checker', () => {
        it('numberOfParts not a number', () => {
            expect(() => carService.discount('string', 100)).to.throw("Invalid input");
        })

        it('totalPrice not a number', () => {
            expect(() => carService.discount(1, 'string')).to.throw("Invalid input");
        })

        it('numberOfParts smaller or equal to 2', () => {
            expect(carService.discount(0, 100)).to.equal("You cannot apply a discount");
        })

        it('numberOfParts smaller or equal to 2', () => {
            expect(carService.discount(1, 100)).to.equal("You cannot apply a discount");
        })

        it('numberOfParts smaller or equal to 2', () => {
            expect(carService.discount(2, 100)).to.equal("You cannot apply a discount");
        })

        it('numberOfParts is higher than 2 and smaller or equal to 7', () => {
            expect(carService.discount(3, 100)).to.equal(`Discount applied! You saved 15$`);
        })

        it('numberOfParts is higher than 2 and smaller or equal to 7', () => {
            expect(carService.discount(7, 100)).to.equal(`Discount applied! You saved 15$`);
        })

        it('numberOfParts is higher than 7', () => {
            expect(carService.discount(8, 100)).to.equal(`Discount applied! You saved 30$`);
        })
    })

    describe('partsToBuy checker', () => {
        it('partsCatalog not an array', () => {
            expect(() => expect(carService.partsToBuy('string', ["blowoff valve", "coil springs", "injectors"]))).to.throw("Invalid input");
        })

        it('neededParts not an array', () => {
            expect(() => expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }, { part: "injectors", price: 170 }], 'string'))).to.throw("Invalid input");
        })

        it('priceCatalog is empty', () => {
            expect(carService.partsToBuy([], ["blowoff valve", "coil springs", "injectors"])).to.equal(0);
        })

        it('return total price with one item', () => {
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }, { part: "injectors", price: 170 }], ["blowoff valve"])).to.equal(145);
        })

        it('return total price with one item', () => {
            expect(carService.partsToBuy([{ part: "blowoff valve", price: 145 }, { part: "coil springs", price: 230 }, { part: "injectors", price: 170 }], ["blowoff valve", "coil springs"])).to.equal(375);
        })
    })

})